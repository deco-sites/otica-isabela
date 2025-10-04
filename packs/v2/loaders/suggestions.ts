import type { AppContext } from "site/apps/site.ts";
import paths from "$store/packs/utils/paths.ts";
import { fetchAPI } from "apps/utils/fetch.ts";
import { Facets, Product } from "$store/packs/v2/types.ts";

export interface Props {
  /**
   * @title Termo
   * @description Termo para ser usado na busca */
  Term: string;
  Page?: number;
  /**
   * @title Contagem
   * @description Limite de itens a serem retornados
   * @default 10
   */
  PageSize?: number;
  OrderBy?: string;
}

export interface ProductSearchResponseDTO {
  dateTime: string;
  pageSize: number;
  totalCount: number;
  data: Product[];
  facets: Facets;
  pageCount: number;
}

export interface SuggestionLoaderResponse {
  products: Product[];
}

/**
 * @title (new) Otica Isabela Dias - Busca de Produtos
 */
const loader = async (
  props: Props,
  _req: Request,
  ctx: AppContext
): Promise<SuggestionLoaderResponse | null> => {
  const config = { token: ctx.apiToken, publicUrl: ctx.apiBaseUrl };
  const path = paths(config!);

  const { Term, Page, PageSize, OrderBy } = props;

  const headers: HeadersInit = new Headers();
  headers.set("Token", config.token ?? "");

  const response = await fetchAPI<ProductSearchResponseDTO>(
    `${path.v2.product.search(
      Term,
      OrderBy ?? "name",
      Page ?? 1,
      PageSize ?? 10
    )}`,
    {
      method: "GET",
      headers,
    }
  );

  if (!response || !response.data.length) return null;

  return {
    products: response.data,
  };
};

export default loader;
