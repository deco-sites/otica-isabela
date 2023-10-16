import { useCart } from "$store/packs/hooks/useCart.ts";
import { formatPrice } from "$store/sdk/format.ts";
import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import CartItem from "./CartItem.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";

function Cart() {
  const { displayCart } = useUI();
  const { cart, loading, mapItemsToAnalyticsItems } = useCart();
  const isCartEmpty = cart.value?.products.length === 0;
  const locale = "pt-BR";
  const currencyCode = "BRL";
  const total =
    cart.value?.products.reduce((total, p) => total + p.ValorDesconto, 0) ?? 0;
  const discounts = cart.value?.products.reduce(
    (total, p) => total + p.ValorOriginal - p.ValorDesconto,
    0,
  ) ?? 0;

  if (cart.value === null) {
    return null;
  }

  // Empty State
  if (isCartEmpty) {
    return (
      <div class="flex flex-col justify-center items-center h-full gap-6">
        <span class="font-medium text-2xl">Sua sacola da está vazia!</span>
        <Button
          class="btn-outline"
          onClick={() => {
            displayCart.value = false;
          }}
        >
          Escolher produtos
        </Button>
      </div>
    );
  }

  return (
    <>
      <div class="px-2 py-4">
        <FreeShippingProgressBar
          total={total}
          target={1000}
          locale={locale!}
          currency={currencyCode!}
        />
      </div>
      {/* Cart Items */}
      <ul
        role="list"
        class="mt-6 px-2 flex-grow overflow-y-auto flex flex-col gap-6"
      >
        {cart.value.products?.map((_, index) => (
          <li key={index}>
            <CartItem index={index} currency={currencyCode!} locale={locale!} />
          </li>
        ))}
      </ul>

      {/* Cart Footer */}
      <footer>
        {/* Subtotal */}
        <div class="border-t border-base-200 py-2 flex flex-col">
          {discounts > 0 && (
            <div class="flex justify-between items-center px-4">
              <span class="text-sm">Descontos</span>
              <span class="text-sm">
                {formatPrice(discounts, currencyCode!, locale)}
              </span>
            </div>
          )}
          <div class="w-full flex justify-between px-4 text-sm">
            <span>Subtotal</span>
            <span class="px-4">
              {total ? formatPrice(total, currencyCode!, locale) : ""}
            </span>
          </div>
        </div>
        {/* Total */}

        <div class="border-t border-base-200 pt-4 flex flex-col justify-end items-end gap-2 mx-4">
          <div class="flex justify-between items-center w-full">
            <span>Total</span>
            <span class="font-medium text-xl">
              {formatPrice(total, currencyCode!, locale)}
            </span>
          </div>
          <span class="text-sm text-base-300">
            Taxas e fretes serão calculados no checkout
          </span>
        </div>

        <div class="p-4">
          <a class="inline-block w-full" href="/checkout">
            <Button
              data-deco="buy-button"
              class="btn-primary btn-block"
              disabled={loading.value || cart.value?.products?.length === 0}
              onClick={() => {
                sendEvent({
                  name: "begin_checkout",
                  params: {
                    currency: cart.value ? currencyCode! : "",
                    value: total - discounts,
                    coupon: "",
                    items: cart.value
                      ? mapItemsToAnalyticsItems(cart.value)
                      : [],
                  },
                });
              }}
            >
              Fechar pedido
            </Button>
          </a>
        </div>
      </footer>
    </>
  );
}
export default Cart;
