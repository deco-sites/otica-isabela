import { Context } from "$store/packs/accounts/configStore.ts";
import { ProductData } from "$store/packs/types.ts";
import paths from "$store/packs/utils/paths.ts";
import { toProductPage } from "$store/packs/utils/transform.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";
import type { RequestURLParam } from "deco-sites/std/functions/requestToParam.ts";

export interface Props {
  slug: RequestURLParam;
}

/**
 * @title Otica Isabela Product Details Page
 * @description works on routes /produto/:slug
 */
const loader = async (
  props: Props,
  req: Request,
  ctx: Context,
): Promise<ProductDetailsPage | null> => {
  const url = new URL(req.url);
  const { slug } = props;
  const { configStore: config } = ctx;

  if (!slug) return null;

  const product = await fetchAPI<ProductData>(
    paths(config!).product.getProduct({
      url: slug,
      offset: 1,
      ordenacao: "none",
    }),
    {
      method: "POST",
    },
  );
  if (product.Total === 0 && product.produtos.length === 0) {
    return null;
  }
  return toProductPage(product.produtos[0], url.origin);
};

export default loader;
