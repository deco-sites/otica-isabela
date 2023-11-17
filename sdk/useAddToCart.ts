import { useCart } from "$store/packs/hooks/useCart.ts";
import { useSignal } from "@preact/signals";
import { sendEvent } from "deco-sites/otica-isabela/sdk/analytics.tsx";
import { useCallback } from "preact/hooks";

export interface Options {
  idProduct: number;
  sku: number;
  price: number;
  /**
   * sku name
   */
  name: string;
  navigateToCart?: boolean;
}

export const useAddToCart = ({
  idProduct,
  sku,
  price,
  name,
  navigateToCart = false,
}: Options) => {
  const isAddingToCart = useSignal(false);

  const { addItems } = useCart();

  const onClick = useCallback(
    async (e: MouseEvent) => {
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
            items: [
              {
                item_id: idProduct,
                quantity: 1,
                price,
                item_name: name,
                item_variant: String(sku),
              },
            ],
          },
        });
      } finally {
        isAddingToCart.value = false;
        if (navigateToCart) {
          window.location.href = "/carrinho";
        }
      }
    },
    [sku],
  );

  return { onClick, loading: isAddingToCart.value };
};
