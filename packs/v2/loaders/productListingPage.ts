import type { AppContext } from "$store/apps/site.ts";
import { fetchAPI } from "apps/utils/fetch.ts";
import {
  Facets,
  IsabelaProductListingPage,
  Product,
} from "$store/packs/v2/types.ts";
import { toProductListingPage } from "$store/packs/v2/transform.ts";
import paths from "$store/packs/utils/paths.ts";
import { SORT_OPTIONS } from "$store/packs/v2/constants.ts";

const FILTER_KEY_MAP: Record<string, string> = {
  Formato: "facet_attribute_formato/attributeValue",
  Estilo: "facet_attribute_estilo/attributeValue",
  Preco: "productPrice",
  Cor: "facet_attribute_cor/attributeValue",
  Material: "facet_attribute_material/attributeValue",
  Tipo: "facet_attribute_tipo/attributeValue",
  Tamanho: "facet_attribute_tamanho/attributeValue",
  Idade: "facet_attribute_idade/attributeValue",
  Lentes: "facet_attribute_lentes/attributeValue",
  "Tipo de Descarte": "facet_attribute_descarte/attributeValue",
  "Marca Lente": "facet_attribute_marca_da_lente/attributeValue",
  "Indicação de Uso": "facet_attribute_indicacao_de_uso/attributeValue",
};

interface ProductFilter {
  /** Campo a ser filtrado */
  Key: string;

  /** Operador de comparação */
  Operator: "eq" | "between" | "in" | "contains" | "range";

  /** Valores aplicados ao filtro */
  Values: (string | number | boolean)[];
}

export interface ProductListingPageProps {
  /**
   * @title Pagina
   * @description Paginação dos produtos */
  Page?: number;

  /** @title Quantidade de Produtos por Página */
  PageSize?: number;

  /** @title Ordenação dos Produtos */
  /** @hide */
  OrderBy?: "name" | "-name" | "price" | "-price" | string;

  /**
   *  @description sobrepõe a URL atual para forçar uma página de categoria
   */
  PageHref?: string;

  /** @title Filtros Dinâmicos */
  Filters?: ProductFilter[];
}

export interface PLPResponseDTO {
  dateTime: string;
  pageSize: number;
  totalCount: number;
  data: Product[];
  facets: Facets;
  pageCount: number;
}

type Props = Omit<ProductListingPageProps, "Page" | "Filters">;

/**
 * @title Otica Isabela Dias - (new) Página de Listagem de Produtos
 * @description Rotas do tipo /$categoria.
 */
const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext
): Promise<IsabelaProductListingPage | null> => {
  const config = { token: ctx.apiToken?.get?.() ?? "", publicUrl: ctx.apiBaseUrl?.get?.() ?? "" };
  const path = paths(config!);
  const url = props.PageHref
    ? new URL(new URL(req.url).origin + `/${props.PageHref}`)
    : new URL(req.url);

  const hasSearchParam =
    url.pathname.includes("busca") && url.searchParams.has("termo");

  const isCategoryPage = !hasSearchParam;

  const categoryTree = isCategoryPage
    ? url.pathname.split("/").join("/")
    : undefined;

  const { OrderBy, Page } = getSearchParams(url, props.OrderBy);

  const Filters = buildFiltersFromUrl(url);
  let filtersQuery = "";

  if (Filters.length) {
    filtersQuery = serializeFilters(Filters);
  }

  const headers: HeadersInit = new Headers();
  headers.set("Token", config.token);

  try {
    let response: PLPResponseDTO | null = null;

    if (isCategoryPage) {
      response = await fetchAPI<PLPResponseDTO>(
        path.v2.navigation.withFilters(
          { ...props, OrderBy, Page: Number(Page) || 1 },
          categoryTree!,
          filtersQuery
        ),
        {
          method: "GET",
          headers,
        }
      );
    } else {
      const term = url.searchParams.get("termo") ?? "";

      response = await fetchAPI<PLPResponseDTO>(
        path.v2.product.search(
          term,
          OrderBy,
          Number(Page) || 1,
          props.PageSize ?? 12
        ),
        {
          method: "GET",
          headers,
        }
      );
    }

    if (!response.data.length) return null;

    return toProductListingPage({
      dto: response,
      baseURL: url,
      pageType: isCategoryPage ? "category" : "search",
      pageParams: { OrderBy, Page },
    });
  } catch {
    return null;
  }
};

export default loader;

const getSearchParams = (
  url: URL,
  sortBy?: ProductListingPageProps["OrderBy"]
) => {
  const OrderBy =
    SORT_OPTIONS.find(({ value }) => value == url.searchParams.get("sort"))
      ?.value ??
    sortBy ??
    "name";

  const page = url.searchParams.get("page") ?? "1";

  return {
    OrderBy,
    Page: Number(page),
  };
};

const buildFiltersFromUrl = (url: URL): ProductFilter[] => {
  const filters: ProductFilter[] = [];

  // Agrupa filtros por chave (ex: Formato → [Retangular, Redondo])
  const grouped: Record<string, string[]> = {};

  for (const [key, value] of url.searchParams.entries()) {
    if (!key.startsWith("filter.")) continue;

    const filterName = key.replace("filter.", ""); // ex: "Formato"
    if (!grouped[filterName]) grouped[filterName] = [];
    grouped[filterName].push(value);
  }

  // Constrói os filtros
  Object.entries(grouped).forEach(([filterName, values]) => {
    const apiKey = FILTER_KEY_MAP[filterName] ?? filterName;

    if (apiKey === "productPrice") {
      // caso especial: preço como range (espera "min,max")
      const [min, max] = values[0].split(",");
      filters.push({
        Key: apiKey,
        Operator: "range",
        Values: [min, max],
      });
    } else {
      filters.push({
        Key: apiKey,
        Operator: "in",
        Values: values,
      });
    }
  });

  return filters;
};

const serializeFilters = (filters: ProductFilter[]) => {
  const params = new URLSearchParams();

  filters.forEach((filter, index) => {
    params.set(`Filters[${index}].Key`, filter.Key);
    params.set(`Filters[${index}].Operator`, filter.Operator);
    params.set(`Filters[${index}].Values`, filter.Values.join(","));
  });

  return params.toString();
};
