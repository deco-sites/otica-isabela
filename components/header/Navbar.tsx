import Modals from "$store/components/header/Modals.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { BasicImageAndLinkProps } from "$store/components/ui/BasicImageAndLink.tsx";
import { BasicImageAndLink } from "$store/components/ui/BasicImageAndLink.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import NavItem from "../../islands/NavItem.tsx";
import type { IconLoginLinkProps } from "./IconLoginLink.tsx";
import { IconLoginLink } from "./IconLoginLink.tsx";
import type { IconNavigation as IconNavigationType } from "./IconNavigation.tsx";
import { IconNavigation } from "./IconNavigation.tsx";
import type { NavItemProps } from "./NavItem.tsx";

function Navbar({
  items,
  searchbar,
  storeLogo,
  IconNavigationItems,
  loginLink,
  navBarSpace,
}: {
  items?: NavItemProps[];
  searchbar?: SearchbarProps;
  storeLogo?: BasicImageAndLinkProps;
  IconNavigationItems?: IconNavigationType[];
  loginLink?: IconLoginLinkProps;
  navBarSpace?: boolean;
}) {
  return (
    <div class="bg-black w-full z-50 flex flex-row justify-center items-center  ">
      <div class="container flex flex-col justify-center items-center w-full p-6 pb-0   ">
        <div
          class={`flex flex-row justify-between items-center w-full relative ${
            navBarSpace ? "gap-1 mb-2 lg:gap-3 lg:mb-4" : "gap-3 mb-4"
          }`}
        >
          <div class=" flex lg:hidden">
            <Buttons variant="menu" />
            <Modals menuItems={items} />
          </div>

          <div
            class={`${
              navBarSpace ? "w-1/2" : "w-full"
            } flex justify-center p-0`}
          >
            {!!storeLogo && (
              <BasicImageAndLink
                {...storeLogo}
                width={{ desktop: 345, mobile: 345 }}
                height={{ desktop: 70, mobile: 60 }}
              />
            )}
          </div>

          <div
            class={`hidden lg:flex flex-col w-full ${
              navBarSpace ? "max-w-1/2" : "max-w-1/4"
            }`}
          >
            <Searchbar {...searchbar} device="desktop" />
          </div>

          <div
            class={`flex flex-row  ${
              navBarSpace ? "gap-x-2 lg:gap-x-4" : "gap-x-4"
            }  justify-center items-baseline lg:items-center`}
          >
            <IconLoginLink {...loginLink} />

            <IconNavigation items={IconNavigationItems} />

            <Buttons variant="cart" />
          </div>
        </div>

        <div
          class={`flex flex-col lg:hidden w-full ${
            navBarSpace ? "mb-4" : "mb-8"
          }`}
        >
          <Searchbar {...searchbar} device="mobile" />
        </div>

        <div
          class={`hidden lg:flex flex-row justify-center items-center gap-x-4`}
        >
          {items
            ?.filter(({ mobileOnly }) => mobileOnly !== true)
            ?.map(({ href, label, navbarItems }) => (
              <NavItem label={label} href={href} navbarItems={navbarItems} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
