import type { AppContext } from "site/apps/site.ts";
import paths from "$store/packs/utils/paths.ts";
import { toProductPage } from "$store/packs/v2/transform.ts";
import { fetchAPI } from "apps/utils/fetch.ts";
import type { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { Product, IsabelaProductDetailsPage } from "site/packs/v2/types.ts";

export interface Props {
  slug: RequestURLParam;
}

/**
 * @title Otica Isabela Dias - (new) Detalhes do Produto
 * @description funciona em rotas do tipo /produto/:slug
 */
const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext
): Promise<IsabelaProductDetailsPage | null> => {
  const url = new URL(req.url);
  const { slug } = props;
  const config = { token: ctx.apiToken.get?.() ?? "", publicUrl: ctx.apiBaseUrl.get?.() ?? "" };

  if (!slug) return null;

  const headers: HeadersInit = new Headers();
  headers.set("Token", config.token ?? "");

  const product = await fetchAPI<Product>(
    paths(config!).v2.product.details(slug),
    {
      method: "GET",
      headers,
    }
  );

  if (!product) return null;

  return toProductPage(product, url.origin, slug);
};

export default loader;
