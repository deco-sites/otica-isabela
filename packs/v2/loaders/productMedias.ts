import type { AppContext } from "site/apps/site.ts";
import paths from "$store/packs/utils/paths.ts";
import { fetchAPI } from "apps/utils/fetch.ts";

export interface Props {
  slug: string;
}

export interface MediasResponseObject {
  productId: number;
  productSlug: string;
  productImage: string;
}

/**
 * @title Otica Isabela Dias - (new) Medias dos Produtos
 * @description Retorna array de mídias dos produtos.
 */
const loader = async (
  props: Props,
  _req: Request,
  ctx: AppContext
): Promise<MediasResponseObject[] | null> => {
  const config = { token: ctx.apiToken, publicUrl: ctx.apiBaseUrl };

  const { slug } = props;

  const headers: HeadersInit = new Headers();
  headers.set("Token", config.token ?? "");

  const medias = await fetchAPI<MediasResponseObject[]>(
    paths(config!).v2.product.medias(slug),
    {
      method: "GET",
      headers,
    }
  );

  if (!medias) return null;

  return medias;
};

export default loader;
