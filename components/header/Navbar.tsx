import Modals from "$store/components/header/Modals.tsx";
import type { Props as SearchbarProps } from "$store/islands/Search.tsx";
import type { BasicImageAndLinkProps } from "$store/components/ui/BasicImageAndLink.tsx";
// import { BasicImageAndLink } from "$store/components/ui/BasicImageAndLink.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import NavItem from "../../islands/NavItem.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { IconLoginLinkProps } from "./IconLoginLink.tsx";
import { IconLoginLink } from "./IconLoginLink.tsx";
import type { IconNavigation as IconNavigationType } from "./IconNavigation.tsx";
// import { IconNavigation } from "./IconNavigation.tsx";
import type { NavItemProps } from "./NavItem.tsx";
import Search from "$store/islands/Search.tsx";
import Help from "$store/components/header/Ajuda.tsx";
import type { Props as AjudaProps } from "./Ajuda.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

function Navbar({
  logotipo,
  items,
  searchbar,
  // storeLogo,
  // IconNavigationItems,
  loginLink,
  navBarSpace,
  backgroundHex,
  ajuda,
}: {
  logotipo?: {
    width?: number;
    height?: number;
    src?: ImageWidget;
  };
  items?: NavItemProps[];
  searchbar?: SearchbarProps;
  ajuda?: AjudaProps;
  storeLogo?: BasicImageAndLinkProps;
  IconNavigationItems?: IconNavigationType[];
  loginLink?: IconLoginLinkProps;
  navBarSpace?: boolean;
  backgroundHex?: string;
}) {
  return (
    <div
      style={{ background: `${backgroundHex}` }}
      class="bg-black w-full z-50 flex flex-row justify-center items-center shadow-[0_4px_4px_rgba(0,0,0,0.1)] h-16 lg:h-24"
    >
      <div class="max-w-[1320px] lg:gap-2.5 w-[95%] h-full flex justify-between items-center lg:relative">
        <div
          class={`flex flex-row justify-between pl-2.5 sm:pl-0 items-center w-full lg:w-[unset] lg:relative ${
            navBarSpace ? "gap-1 lg:gap-3" : "gap-3 mb-4"
          }`}
        >
          <div class="flex items-center gap-4 lg:hidden">
            <Buttons variant="menu" />
            <div class="lg:hidden">
              <Search isMobile />
            </div>
            <Modals ajuda={ajuda?.ajuda} menuItems={items} />
          </div>

          <div
            class={`flex justify-center p-0 max-w-[165px] lg:max-w-[200px] w-full`}
          >
            <a href="/" class="block">
              {logotipo
                ? (
                  <Image
                    src={logotipo.src ?? ""}
                    alt={"Logotipo Otica Isabela Dias"}
                    width={logotipo.width ?? 165}
                    height={logotipo.height ?? 47}
                    class="text-slot-primary-500 w-full h-full object-contain"
                  />
                )
                : <Icon id="logo" width={165} height={48} />}
            </a>
          </div>

          {
            /* <a
            href="/meus-favoritos"
            class="group flex lg:hidden items-center justify-center"
          >
            <Icon
              id="header-heart"
              width={24}
              height={24}
              class="text-slot-primary-600"
            />
          </a> */
          }

          <div class="lg:hidden">
            <Buttons variant="cart" />
          </div>

          {
            /* <div
            class={`hidden lg:flex flex-col w-full ${
              navBarSpace ? "max-w-1/2" : "max-w-1/4"
            }`}
          >
            <Searchbar {...searchbar} device="desktop" />
          </div> */
          }
        </div>

        <div
          class={`hidden lg:flex flex-row justify-center items-center gap-x-6 2xl:gap-x-4 h-full lg:relative`}
        >
          {items
            ?.filter(({ mobileOnly }) => mobileOnly !== true)
            ?.map(({ href, label, navbarItems }) => (
              <NavItem label={label} href={href} navbarItems={navbarItems} />
            ))}
        </div>
        <div
          class={`hidden lg:flex flex-row  ${
            navBarSpace ? "gap-x-2 lg:gap-x-4" : ""
          }  justify-center items-baseline lg:items-center`}
        >
          <div class="hidden lg:block">
            <Search />
          </div>
          {ajuda && (
            <div class="hidden lg:block">
              <Help ajuda={ajuda.ajuda} />
            </div>
          )}
          {
            /* <a
            href="/meus-favoritos"
            class="group flex items-center justify-center"
          >
            <Icon
              id="header-heart"
              width={24}
              height={24}
              class="text-slot-primary-600 group-hover:opacity-0 transition-opacity"
            />
            <Icon
              id="header-heart-fill"
              width={24}
              height={24}
              class="text-slot-primary-600 opacity-0 group-hover:opacity-100 transition-opacity absolute"
            />
          </a> */
          }
          <IconLoginLink {...loginLink} />

          {/* <IconNavigation items={IconNavigationItems} /> */}
          <Buttons variant="cart" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
