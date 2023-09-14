import { Context } from "$store/packs/accounts/configStore.ts";
import type { Suggestion } from "deco-sites/std/commerce/types.ts";
/* import { ProductData } from "$store/packs/types.ts";
import paths from "$store/packs/utils/paths.ts";
import { toProduct } from "$store/packs/utils/transform.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts"; */

export interface Props {
  /**
   * @title Term
   * @description Term to use on search */
  q?: string;
  /**
   * @title Count
   * @description Limit quantity of items to display
   * @default 8
   */
  offset: number;
}

/**
 * @title Otica Isabela Product Search
 */

const loader = async (
  _props: Props,
  _req: Request,
  _ctx: Context,
): Promise<Suggestion | null> => {
  /* const { configStore: config } = ctx;
  const path = paths(config!);
  const {
    q,
    offset,
  } = props;

  const suggestions = () =>
    fetchAPI<ProductData>(
      `${
        path.product.getProduct({
          q,
          offset,
          ordenacao: "none",
        })
      }`,
      {
        method: "POST",
      },
    );

  const topSellers = () =>
    fetchAPI<ProductData>(
      `${
        path.product.getProduct({
          offset,
          ordenacao: "mais-vendidos",
        })
      }`,
      {
        method: "POST",
      },
    ); */

  await 0;
  return null;
};

export default loader;
