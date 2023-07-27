import Buttons from "$store/islands/HeaderButton.tsx";
import NavItem from "../../islands/NavItem.tsx";
import Searchbar from "$store/components/search/Searchbar.tsx";
import { IconNavigation as IconNavigationComponent } from "./IconNavigation.tsx";
import type { IconNavigation as IconNavigationType } from "./IconNavigation.tsx";
import type { NavItemProps } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import { BasicImageAndLink } from "$store/components/ui/BasicImageAndLink.tsx";
import type { BasicImageAndLinkProps } from "$store/components/ui/BasicImageAndLink.tsx";
import type { IconLoginLinkProps } from "./IconLoginLink.tsx";
import { IconLoginLink } from "./IconLoginLink.tsx";
import Modals from "$store/components/header/Modals.tsx";

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
      <div class="container flex flex-col justify-center items-center w-full p-6 pb-0   ">
        <div class="flex flex-row justify-between items-center  w-full  gap-2 mb-4">
          <div class=" flex lg:hidden">
            <Buttons variant="menu" />
            <Modals
              menuItems={items}
            />
          </div>

          {!!storeLogo && (
            <BasicImageAndLink
              {...storeLogo}
              width={{ desktop: 240, mobile: 200 }}
            />
          )}

          <div class=" hidden lg:flex  w-full max-w-[33.33%] pr-6   ">
            <Searchbar {...searchbar} />
          </div>

          <div class="flex flex-row  gap-x-4  justify-center items-baseline  lg:items-center ">
            <IconLoginLink {...loginLink} />

            <IconNavigationComponent items={IconNavigationItems} />

            <Buttons variant="cart" />
          </div>
        </div>

        <div class="flex lg:hidden  w-full mb-8 ">
          <Searchbar {...searchbar} />
        </div>

        <div class="hidden lg:flex flex-row justify-center items-center gap-x-4  ">
          {items?.filter(({ mobileOnly }) => mobileOnly !== true)?.map((
            { href, label, children },
          ) => (
            <NavItem
              label={label}
              href={href}
              children={children}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
