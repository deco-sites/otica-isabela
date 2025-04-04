import { useCart } from "$store/packs/hooks/useCart.ts";
import { useSignal } from "@preact/signals";
import { sendEvent } from "$store/sdk/analytics.tsx";
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
  chooseLensUrl?: string;
}

export const useAddToCart = ({
  idProduct,
  sku,
  price,
  name,
  navigateToCart = false,
  chooseLensUrl,
}: Options) => {
  const isAddingToCart = useSignal(false);

  const { addItems } = useCart();

  const onClick = useCallback(
    async (e: MouseEvent) => {
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
        if (chooseLensUrl && chooseLensUrl !== "") {
          window.location.href = chooseLensUrl;
        }

        if (navigateToCart) {
          window.location.href = "/carrinho";
        }
      }
    },
    [sku],
  );

  return { onClick, loading: isAddingToCart.value };
};
