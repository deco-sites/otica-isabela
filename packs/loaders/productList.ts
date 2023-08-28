import { Context } from "$store/packs/accounts/configStore.ts";
import { Product as IsabelaProduct, ProductData } from "$store/packs/types.ts";
import { dinamicFilter, paths } from "$store/packs/utils/path.ts";
import { toProduct } from "$store/packs/utils/transform.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";

export interface Props {
  /** @description query to use on search */
  term?: string;

  /** @description Search by collection */
  collection?: number;

  /** @description Search by category */
  category?: number;

  /** @description Search by subcategory */
  subcategory?: number;

  /** @description total number of items to display*/

  count: number;

  /** @description Dinamic filters Example: Aro Fechado,Retangular*/

  dinamicFilters: dinamicFilter[];

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
  const {
    term,
    collection,
    count,
    isStopwatch,
    sort,
    category,
    subcategory,
    dinamicFilters,
  } = props;

  const productsData = await fetchAPI<ProductData>(
    `${
      path.product.getProduct({
        term: term ?? "",
        collection: collection ?? 0,
        count,
        isStopwatch: isStopwatch ?? false,
        sort,
        category,
        subcategory,
        dinamicFilters,
      })
    }`,
    {
      method: "POST",
    },
  );

  const products = productsData.produtos.map((product: IsabelaProduct) =>
    toProduct(product)
  );

  return products;
};

export default loader;
