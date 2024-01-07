import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useCart } from "$store/packs/hooks/useCart.ts";
import { useUI } from "$store/sdk/useUI.ts";

function SearchButton() {
  const { displaySearchbar } = useUI();

  return (
    <Button
      class="btn btn-circle btn-sm btn-ghost"
      aria-label="search icon button"
      onClick={() => {
        displaySearchbar.value = !displaySearchbar.peek();
      }}
    >
      <Icon id="MagnifyingGlass" width={20} height={20} strokeWidth={0.1} />
    </Button>
  );
}

function MenuButton() {
  const { displayMobileMenu } = useUI();

  return (
    <Button
      class="btn-sm btn-ghost px-0 z-50 h-full"
      aria-label="open menu"
      onClick={() => (displayMobileMenu.value = !displayMobileMenu.value)}
    >
      <Icon
        id={!displayMobileMenu.value ? "Bars3" : "XMark"}
        width={45}
        height={48}
        class="text-white"
        strokeWidth={0.01}
      />
    </Button>
  );
}

function CartButton() {
  const { displayCart } = useUI();
  const { cart } = useCart();
  const totalItems = cart.value?.products.length ?? 0;

  return (
    <a
      class="btn btn-circle btn-sm btn-ghost relative"
      aria-label="open cart"
      data-deco={displayCart.value && "open-cart"}
      href="/carrinho"
    >
      <div class="indicator">
        {totalItems > 0 && (
          <span class="-top-3.5 absolute indicator-item badge badge-secondary badge-lg h-6 w-6 pa  bg-white text-black border-none font-extralight">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
        <Icon
          class="text-black"
          id="ShoppingCart"
          width={26}
          height={25}
          strokeWidth={2}
        />
      </div>
    </a>
  );
}

function Buttons({ variant }: { variant: "cart" | "search" | "menu" }) {
  if (variant === "cart") {
    return <CartButton />;
  }

  if (variant === "search") {
    return <SearchButton />;
  }

  if (variant === "menu") {
    return <MenuButton />;
  }

  return null;
}

export default Buttons;
