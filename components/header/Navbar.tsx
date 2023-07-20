import Buttons from "$store/islands/HeaderButton.tsx";

import NavItem from "./NavItem.tsx";
import Searchbar from "$store/components/search/Searchbar.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import { IconNavigation as IconNavigationComponent } from "./IconNavigation.tsx";
import type { IconNavigation as IconNavigationType } from "./IconNavigation.tsx";
import type { NavItemProps } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import { maxWidthContainer } from "$store/components/header/constants.ts";
import { BasicImageAndLink } from "$store/components/ui/BasicImageAndLink.tsx";
import type { BasicImageAndLinkProps } from "$store/components/ui/BasicImageAndLink.tsx";
import type { IconLoginLinkProps } from "./IconLoginLink.tsx";
import { IconLoginLink } from "./IconLoginLink.tsx";

function Navbar(
  { items, searchbar, storeLogo, IconNavigationItems, loginLink }: {
    items?: NavItemProps[];
    searchbar?: SearchbarProps;
    storeLogo?: BasicImageAndLinkProps;
    IconNavigationItems?: IconNavigationType[];
    loginLink?: IconLoginLinkProps;
  },
) {
  return (
    <div class="bg-black w-full z-50 flex flex-row justify-center items-center  ">
      <div
        style={{ maxWidth: maxWidthContainer }}
        class=" flex flex-col justify-center items-center w-full p-6   "
      >
        <div class="flex flex-row justify-center items-center  w-full  gap-2 mb-4">
          <div class=" flex pb-4 lg:hidden">
            <Buttons variant="menu" />
          </div>

          {!!storeLogo && <BasicImageAndLink {...storeLogo} />}

          <div class=" hidden md:flex  w-full max-w-[33.33%] pr-6   ">
            <Searchbar {...searchbar} />
          </div>

          <div class="flex flex-row  gap-x-4  justify-center items-baseline  lg:items-center ">
            <IconLoginLink {...loginLink} />

            <IconNavigationComponent items={IconNavigationItems} />

            <Buttons variant="cart" />
          </div>
        </div>

        <div class="flex md:hidden  w-full ">
          <Searchbar {...searchbar} />
        </div>

        <div class="hidden lg:flex flex-row justify-center items-center">
          <NavItem items={items} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
