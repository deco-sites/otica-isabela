import Image from "deco-sites/std/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { useCart } from "$store/packs/hooks/useCart.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";

interface Props {
  index: number;
  locale: string;
  currency: string;
}

function CartItem({ index, locale, currency }: Props) {
  const { cart, mapItemsToAnalyticsItems } = useCart();
  const loading = useSignal(false);
  const item = cart.value!.products[index];
  const { Imagem, Nome, ValorDesconto } = item;

  const isGift = ValorDesconto < 0.01;

 /*  const withLoading = useCallback(
    <A,>(cb: (args: A) => void) =>
      async (e: A) => {
        try {
          loading.value = true;
          await cb(e);
        } finally {
          loading.value = false;
        }
      },
    [loading]
  ); */

  return (
    <div class="flex flex-row justify-between items-start gap-4">
      <Image
        src={Imagem}
        alt={Nome}
        width={108}
        height={150}
        class="object-cover object-center"
      />
      <div class="flex flex-grow flex-col gap-2">
        <span>{Nome}</span>
        <div class="flex items-center gap-2">
          <span class="line-through text-base-300 text-sm">
            {formatPrice(ValorDesconto / 100, currency, locale)}
          </span>
          <span class="text-sm text-secondary">
            {isGift
              ? "Grátis"
              : formatPrice(ValorDesconto / 100, currency, locale)}
          </span>
        </div>
        <div class="mt-6 max-w-min"></div>
      </div>
      <Button
        /* onClick={withLoading(async () => {
          await updateItems({ orderItems: [{ index, quantity: 0 }] });
          if (!cart.value) return;
          sendEvent({
            name: "remove_from_cart",
            params: {
              items: mapItemsToAnalyticsItems({
                items: [item],
                marketingData: cart.value.marketingData,
              }),
            },
          });
        })} */
        disabled={loading.value || isGift}
        loading={loading.value}
        class="btn btn-ghost"
      >
        <Icon id="Trash" width={20} height={20} />
      </Button>
    </div>
  );
}

export default CartItem;
