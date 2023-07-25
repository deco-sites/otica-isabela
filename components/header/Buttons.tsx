import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import { lazy, Suspense } from "preact/compat";
import type { NavItemProps } from "./NavItem.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

export const handleOverlayHeader = (
  activate?: boolean,
  trigger?: () => void,
) => {
  if (!IS_BROWSER) {
    return;
  }

  trigger?.();

  if (activate) {
    document?.getElementById("overlayHeader")?.classList.add(
      "hidden",
    );
    return;
  }
  document?.getElementById("overlayHeader")?.classList.remove(
    "hidden",
  );
};

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

function MenuButton({ items }: { items?: NavItemProps[] }) {
  const { displayMobileMenu } = useUI();
  const Menu = lazy(() => import("$store/components/header/Menu.tsx"));

  return (
    <div>
      <div
        id="overlayHeaderMenu"
        class="hidden fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 transition duration-500 z-30"
      >
      </div>
      <Button
        class="btn-sm btn-ghost px-0 z-50"
        aria-label="open menu"
        onClick={() =>
          handleOverlayHeader(
            displayMobileMenu.value,
            () => displayMobileMenu.value = !displayMobileMenu.value,
          )}
      >
        {
          <Icon
            id={!displayMobileMenu.value ? "Bars3" : "XMark"}
            width={35}
            height={42}
            fill={displayMobileMenu.value ? "white" : ""}
            strokeWidth={0.01}
          />
        }
      </Button>
      {displayMobileMenu.value && items?.length && (
        <Suspense fallback={null}>
          <Menu
            items={items}
            menuClosed={() =>
              handleOverlayHeader(true, () => displayMobileMenu.value = false)}
          />
        </Suspense>
      )}
    </div>
  );
}

function CartButton() {
  const { displayCart } = useUI();
  const { loading, cart, mapItemsToAnalyticsItems } = useCart();
  const totalItems = cart.value?.items.length || null;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );

  const onClick = () => {
    displayCart.value = true;
    sendEvent({
      name: "view_cart",
      params: {
        currency: cart.value ? currencyCode! : "",
        value: total?.value
          ? (total?.value - (discounts?.value ?? 0)) / 100
          : 0,

        items: cart.value ? mapItemsToAnalyticsItems(cart.value) : [],
      },
    });
  };

  return (
    <Button
      class="btn btn-circle btn-sm btn-ghost relative"
      aria-label="open cart"
      data-deco={displayCart.value && "open-cart"}
      loading={loading.value}
      onClick={onClick}
    >
      <div class="indicator">
        {totalItems && (
          <span class="-top-3.5 absolute indicator-item badge badge-secondary badge-lg h-6 w-6 pa  bg-white text-black border-none font-extralight">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
        {!loading.value && (
          <Icon id="ShoppingCart" width={26} height={25} strokeWidth={2} />
        )}
      </div>
    </Button>
  );
}

function Buttons(
  { variant, menuModalData }: {
    variant: "cart" | "search" | "menu";
    menuModalData?: NavItemProps[];
  },
) {
  if (variant === "cart") {
    return <CartButton />;
  }

  if (variant === "search") {
    return <SearchButton />;
  }

  if (variant === "menu") {
    return <MenuButton items={menuModalData} />;
  }

  return null;
}

export default Buttons;
