import { useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import { useCart } from "$store/packs/hooks/useCart.ts";
import { sendEvent } from "deco-sites/otica-isabela/sdk/analytics.tsx";

export interface Options {
  idProduct: number;
  sku: number;
  price: number;
  /**
   * sku name
   */
  name: string;
}

export const useAddToCart = (
  { idProduct, sku, price, name }: Options,
) => {
  const isAddingToCart = useSignal(false);
  const { addItems } = useCart();

  const onClick = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      isAddingToCart.value = true;
      await addItems({
        idProduct,
        sku,
      });

      sendEvent({
        name: "add_to_cart",
        params: {
          items: [{
            item_id: idProduct,
            quantity: 1,
            price,
            item_name: name,
            item_variant: String(sku),
          }],
        },
      });
    } finally {
      isAddingToCart.value = false;
    }
  }, [sku]);

  return { onClick, loading: false };
};
