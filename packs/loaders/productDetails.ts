import type { AppContext } from "deco-sites/otica-isabela/apps/site.ts";
import { ProductData } from "$store/packs/types.ts";
import paths from "$store/packs/utils/paths.ts";
import { toProductPage } from "$store/packs/utils/transform.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { fetchAPI } from "apps/utils/fetch.ts";
import type { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { DECO_CACHE_OPTION } from "$store/packs/constants.ts"

export interface Props {
  slug: RequestURLParam;
}

/**
 * @title Otica Isabela Dias - Detalhes do Produto
 * @description funciona em rotas do tipo /produto/:slug
 */
const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<ProductDetailsPage | null> => {
  const url = new URL(req.url);
  const { slug } = props;
  const config = { token: ctx.token, publicUrl: ctx.publicUrl };

  if (!slug) return null;

  const product = await fetchAPI<ProductData>(
    paths(config!).product.getProduct({
      url: slug,
      offset: 1,
      ordenacao: "none",
    }),
    {
      method: "POST",
      deco: { cache: DECO_CACHE_OPTION },
    },
  );
  if (product.Total === 0 && product.produtos.length === 0) {
    return null;
  }
  return toProductPage(product.produtos[0], url.origin);
};

export default loader;
