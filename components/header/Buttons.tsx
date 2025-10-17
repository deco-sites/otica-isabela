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
      class="btn-sm btn-ghost px-0 z-50 h-full cursor-pointer flex flex-col items-baseline gap-1 translate-y-1.5"
      aria-label="open menu"
      onClick={() => (displayMobileMenu.value = !displayMobileMenu.value)}
    >
      <Icon
        id={!displayMobileMenu.value ? "menu" : "menu"}
        width={24}
        height={24}
        class="text-slot-primary-500"
      />
      <span class="text-grayscale-600 text-xs font-light">Menu</span>
    </Button>
  );
}

function CartButton() {
  const { displayCart } = useUI();
  const { cart } = useCart();
  const totalItems = cart.value?.products.length ?? 0;

  return (
    <a
      class="relative"
      aria-label="open cart"
      data-deco={displayCart.value && "open-cart"}
      href="/carrinho"
    >
      <div class="indicator">
        {totalItems > 0 && (
          <span class="top-0 absolute indicator-item badge badge-secondary badge-lg h-6 w-6 pa  bg-white text-black border-none font-extralight">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
        <label
          for="minicart"
          class="group cursor-pointer flex items-center justify-center gap-2"
        >
          <div class="relative flex items-center justify-center isolate">
            <Icon
              id="cart"
              width={32}
              height={32}
              class="text-slot-primary-600 group-hover:opacity-0 transition-opacity"
            />
            <Icon
              id="cart-fill"
              width={32}
              height={32}
              class="text-slot-primary-600 opacity-0 group-hover:opacity-100 transition-opacity absolute"
            />
          </div>
        </label>
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
