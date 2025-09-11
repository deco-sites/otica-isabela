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
  OrderBy: "name" | "-name" | "price" | "-price" | string;

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

type Props = Omit<ProductListingPageProps, "page">;

/**
 * @title Otica Isabela Dias - (new) Página de Listagem de Produtos
 * @description Rotas do tipo /$categoria.
 */
const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext
): Promise<IsabelaProductListingPage | null> => {
  const config = { token: ctx.apiToken, publicUrl: ctx.apiBaseUrl };
  const path = paths(config!);
  const url = new URL(req.url);

  const hasSearchParam = url.pathname.includes("busca");
  const isCategoryPage = !hasSearchParam;

  const categoryTree = isCategoryPage
    ? url.pathname.split("/").join("/")
    : undefined;

  const { OrderBy, Page } = getSearchParams(url, props.OrderBy);

  const headers: HeadersInit = new Headers();
  headers.set("Token", config.token ?? "");

  const response = await fetchAPI<PLPResponseDTO>(
    path.v2.navigation.withFilters(
      { ...props, OrderBy, Page: Number(Page) || 1 },
      categoryTree!
    ),
    {
      method: "GET",
      headers,
    }
  );

  if (!response.data.length) return null;

  return toProductListingPage({
    dto: response,
    baseURL: url,
    pageType: isCategoryPage ? "category" : "search",
    pageParams: { OrderBy, Page },
  });
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
