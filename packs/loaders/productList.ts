import { Context } from "$store/packs/accounts/configStore.ts";
import { Products } from "$store/packs/types.ts";
import { paths } from "$store/packs/utils/path.ts";
import { toProduct } from "$store/packs/utils/transform.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";

export interface Props {
  /** @description query to use on search */
  term?: string;

  /** @description Search by collection */
  collection?: number;

  /** @description total number of items to display*/

  count: number;

  /** @description Sort for product whit promotion */
  isStopwatch?: boolean;

  /** @description search sort parameter */
  sort: "none" | "nome";
}

const loader = async (
  props: Props,
  _req: Request,
  ctx: Context,
): Promise<Product[]> => {
  const { configStore: config } = ctx;
  const path = paths(config!);
  const { term, collection, count, isStopwatch, sort } = props;

  const productsData = await fetchAPI<Products>(
    `${
      path.product.getProduct({
        term: term ?? "",
        collection: collection ?? 0,
        count,
        isStopwatch: isStopwatch ?? false,
        sort,
      })
    }`,
    {
      method: "POST",
    },
  );

  const products = productsData.map((product) => toProduct(product));

  return products;
};

export default loader;
