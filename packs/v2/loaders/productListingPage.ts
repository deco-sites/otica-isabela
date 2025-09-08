import type { AppContext } from "$store/apps/site.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { fetchAPI } from "apps/utils/fetch.ts";
import { FacetValues, Product } from "$store/packs/v2/types.ts";
import { toProductListingPage } from "$store/packs/v2/transform.ts";
import paths from "$store/packs/utils/paths.ts";
import { SORT_OPTIONS } from "site/packs/constants.ts";

interface ProductFilter {
  /** Campo a ser filtrado */
  Key: string;

  /** Operador de comparação */
  Operator: "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "range" | "in";

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
  OrderBy: "none" | "mais-vendidos" | "ofertas" | "menor-preco" | "nome";

  /** @title Filtros Dinâmicos */
  Filters?: ProductFilter[];
}

export interface PLPResponseDTO {
  dateTime: string;
  pageSize: number;
  totalCount: number;
  data: Product[];
  facets: Record<string, FacetValues>;
  pageCount: number;
}

type Props = Omit<ProductListingPageProps, "page">;

/**
 * @title Otica Isabela Dias - (new) Página de Listagem de Produtos
 * @description Rotas do tipo /$categoria.
 */
const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext
): Promise<ProductListingPage | null> => {
  const config = { token: ctx.apiToken, publicUrl: ctx.apiBaseUrl };
  const path = paths(config!);
  const url = new URL(req.url);

  const { ...searchPageProps } = props;

  const hasSearchParam = url.pathname.includes("busca");

  const isCategoryPage = !hasSearchParam;

  const categoryTree = isCategoryPage
    ? url.pathname.split("/").join("/")
    : undefined;

  const headers: HeadersInit = new Headers();
  headers.set("Token", config.token ?? "");

  const response = await fetchAPI<PLPResponseDTO>(
    path.v2.navigation.withFilters({ ...props }, categoryTree!),
    {
      method: "GET",
      headers,
    }
  );

  if (!response.data.length) return null;

  const { orderBy, page } = getSearchParams(url, props.OrderBy);

  return toProductListingPage({
    dto: response,
    baseURL: url,
    pageType: isCategoryPage ? "category" : "search",
    pageParams: { orderBy, page },
  });
};

export default loader;

const getSearchParams = (
  url: URL,
  sortBy?: ProductListingPageProps["OrderBy"]
) => {
  const orderBy =
    SORT_OPTIONS.find(({ value }) => value == url.searchParams.get("sort"))
      ?.value ??
    sortBy ??
    "nome";
  const page = url.searchParams.get("page") ?? "1";

  return {
    orderBy,
    page: Number(page),
  };
};
