import type { AppContext } from "site/apps/site.ts";
import paths from "$store/packs/utils/paths.ts";
import { fetchAPI } from "apps/utils/fetch.ts";
import { Product } from "site/packs/v2/types.ts";

export interface Props {
  collectionId: string;
}

/**
 * @title Otica Isabela Dias - (new) Produtos em Destaque - Highlight
 * @description Retorna array de produtos para seções em destaque da home page. Cada produto inclui informações completas incluindo mídia, atributos, produtos relacionados e descrições.
 */
const loader = async (
  props: Props,
  _req: Request,
  ctx: AppContext
): Promise<Product[] | null> => {
  const config = { token: ctx.apiToken, publicUrl: ctx.apiBaseUrl };

  const { collectionId } = props;

  const headers: HeadersInit = new Headers();
  headers.set("Token", config.token ?? "");

  const products = await fetchAPI<Product[]>(
    paths(config!).v2.product.highlight(collectionId),
    {
      method: "GET",
      headers,
    }
  );

  if (!products) return null;

  return products;
};

export default loader;
