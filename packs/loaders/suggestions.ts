import { Context } from "$store/packs/accounts/configStore.ts";
import type { Suggestion } from "deco-sites/std/commerce/types.ts";
import { ProductData } from "$store/packs/types.ts";
import paths from "$store/packs/utils/paths.ts";
import { toProduct } from "$store/packs/utils/transform.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";

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
  props: Props,
  _req: Request,
  ctx: Context,
): Promise<Suggestion | null> => {
  const { configStore: config } = ctx;
  const path = paths(config!);
  const {
    q,
    offset,
  } = props;

  /*TODO: Refactor this function. His delay is too high. Maybe do something with another 
  endpoint or with the productSearch */
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
    );

  const productSearch = () =>
    fetchAPI<ProductData>(
      `${
        path.product.getProduct({
          nome: q,
          offset,
          ordenacao: "none",
        })
      }`,
      {
        method: "POST",
      },
    );

  const [topSellersProducts, { produtos, Total }] = await Promise.all([
    topSellers(),
    productSearch(),
  ]);

  if (topSellersProducts.Total == 0 || Total == 0) return null;

  return {
    searches: topSellersProducts.produtos.map(({ Nome }) => ({
      term: Nome,
    })),
    products: produtos.map((p) => toProduct(p)),
  };
};

export default loader;
