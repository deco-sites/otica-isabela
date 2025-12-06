import type { AppContext } from "site/apps/site.ts";
import paths from "$store/packs/utils/paths.ts";
import { fetchAPI } from "apps/utils/fetch.ts";
import { Product, Facets } from "site/packs/v2/types.ts";

export interface Props {
  term?: string;
  /** @title Quantidade de Produtos por Página */
  PageSize?: number;
}

export interface DailyOffersResponseDTO {
  dateTime: string;
  pageSize: number;
  totalCount: number;
  data: Product[];
  facets: Facets;
  pageCount: number;
}

/**
 * @title Otica Isabela Dias - (new) Ofertas do Dia
 * @description Retorna array de produtos para seção de Ofertas do Dia da Home.
 */
const loader = async (
  props: Props,
  _req: Request,
  ctx: AppContext
): Promise<DailyOffersResponseDTO | null> => {
  const config = { token: ctx.apiToken?.get?.() ?? "", publicUrl: ctx.apiBaseUrl?.get?.() ?? ""};

  const headers: HeadersInit = new Headers();
  headers.set("Token", config.token);

  const filtersQuery =
    "Filters[0].Key=isDayOffer&Filters[0].Operator=equals&Filters[0].Values=True&function=ofertasDoDia";

  const response = await fetchAPI<DailyOffersResponseDTO>(
    paths(config!).v2.product.search(
      props.term ?? "*",
      "name",
      1,
      props.PageSize ?? 21,
      filtersQuery
    ),
    {
      method: "GET",
      headers,
    }
  );

  if (!response) return null;

  return response;
};

export default loader;
