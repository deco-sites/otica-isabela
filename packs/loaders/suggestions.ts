import { Context } from "$store/packs/accounts/configStore.ts";
import { ProductData } from "$store/packs/types.ts";
import type { Suggestion } from "deco-sites/std/commerce/types.ts";
import paths from "$store/packs/utils/paths.ts";
import { toProduct } from "$store/packs/utils/transform.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";

export interface Props {
  /**
   * @title Term
   * @description Term to use on search */
  nome?: string;
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
  props: Props,
  _req: Request,
  ctx: Context,
): Promise<Suggestion | null> => {
  const { configStore: config } = ctx;
  const path = paths(config!);
  const {
    nome,
    offset,
  } = props;

  const productSearch = () =>
    fetchAPI<ProductData>(
      `${
        path.product.getProduct({
          nome,
          offset,
          ordenacao: "none",
        })
      }`,
      {
        method: "POST",
      },
    );

  const { produtos, Total } = await Promise.resolve(
    productSearch(),
  );

  if (Total == 0) return null;

  return {
    searches: [],
    products: produtos.map((p) => toProduct(p)),
  };
};

export default loader;