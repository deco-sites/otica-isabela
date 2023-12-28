import Modal from "$store/components/ui/Modal.tsx";
import { lazy, Suspense } from "preact/compat";
import { useUI } from "$store/sdk/useUI.ts";

import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const Cart = lazy(() => import("$store/components/minicart/Cart.tsx"));
const Searchbar = lazy(() => import("$store/components/search/Searchbar.tsx"));

interface Props {
  menuItems?: MenuProps["items"];
}

function Modals({ menuItems }: Props) {
  const { displayMobileMenu } = useUI();

  const fallback = (
    <div class="flex justify-center items-center w-full h-full">
      <span class="loading loading-ring" />
    </div>
  );

  return (
    <>
      {displayMobileMenu.value && !!menuItems?.length && (
        <Suspense fallback={fallback}>
          <Menu
            closeMenu={() =>
              displayMobileMenu.value = false}
            items={menuItems}
          />
        </Suspense>
      )}
    </>
  );
}

export default Modals;
