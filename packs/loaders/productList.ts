import { Context } from "$store/packs/accounts/configStore.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";
import { paths } from "$store/packs/utils/path.ts";
import { Products } from "$store/packs/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { toProduct } from "$store/packs/utils/transform.ts";

/**
 * @title Oticaisabeladias Products
 * @description Use it in Shelves
 */

export interface Props {
  /** @description query to use on search */
  term?: string;

  collection?: number;

  /** @description search sort parameter */
  sort?: string;

  isStopwatch?: boolean;

  /** @description total number of items to display */
  count: number;
}

const loader = async (
  props: Props,
  _req: Request,
  ctx: Context,
): Promise<Product[]> => {
  const { configStore: config } = ctx;
  const path = paths(config!);
  const { term, collection, count } = props;

  const searchByTerm = term ? `&nome=${term}` : "";
  const searchByCollection = collection
    ? `&idColecaoProdutos=${collection}`
    : "";
  const itemsShelf = count ? `&offset=${count}` : "&offset=9";

  const productsData = await fetchAPI<Products>(
    `${path.product.getProduct()}${searchByTerm}${searchByCollection}${itemsShelf}`,
    {
      method: "POST",
    },
  );

  const products = productsData.map((product) => toProduct(product));

  return products;
};

export default loader;
