import type { AppContext } from "site/apps/site.ts";
import paths from "$store/packs/utils/paths.ts";
import { toProduct } from "$store/packs/v2/transform.ts";
import type { Product } from "apps/commerce/types.ts";
import { fetchAPI } from "apps/utils/fetch.ts";
import { Product as IsabelaProduct } from "site/packs/v2/types.ts";

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

  const products = await fetchAPI<IsabelaProduct[]>(
    paths(config!).v2.product.highlight(collectionId),
    {
      method: "GET",
      headers,
    }
  );

  if (!products) return null;

  const formattedProducts = products.map((product) => toProduct(product));
  return formattedProducts;
};

export default loader;
