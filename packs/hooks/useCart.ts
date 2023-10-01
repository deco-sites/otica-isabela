import { OrderForm } from "$store/packs/types.ts";
import { state as storeState } from "$store/packs/hooks/context.ts";
import { AnalyticsItem } from "deco-sites/std/commerce/types.ts";
//import { withManifest } from "$live/clients/withManifest.ts";
//import type { Manifest } from "../../live.gen.ts";

const { cart, loading } = storeState;
/* const Runtime = withManifest<Manifest>(); */

export const mapOrderFormItemsToAnalyticsItems = (
  orderForm: Pick<OrderForm, "products">,
): AnalyticsItem[] => {
  const { products } = orderForm;

  if (!products) {
    return [];
  }

  return products.map((item, index) => ({
    item_id: item.IdProduct,
    item_name: item.Nome,
    coupon: "",
    discount: Number(item.ValorOriginal - item.ValorDesconto),
    index,
    item_variant: item.Nome,
    price: item.ValorOriginal,
    quantity: products.filter((p) => p.IdProduct === item.IdProduct).length,
    affiliation: "Ótica Isabela",
  }));
};

/* const wrap =
  <T>(action: (p: T, init?: RequestInit | undefined) => Promise<OrderForm>) =>
  (p: T) =>
    storeState.enqueue(async (signal) => ({
      cart: await action(p, { signal }),
    }));
 */
const state = {
  cart,
  loading,

  /* addItems: wrap(
    Runtime.create("salesforce-integration/actions/cart/addItems.ts"),
  ),
  TODO: ADD ITEMS
  */
  mapItemsToAnalyticsItems: mapOrderFormItemsToAnalyticsItems,
};

export const useCart = () => state;
