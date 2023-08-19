import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Navbar from "./Navbar.tsx";
import type { NavItemProps } from "./NavItem.tsx";
import type { IconLoginLinkProps } from "./IconLoginLink.tsx";
import PromotionalBar from "$store/islands/PromotionalBar.tsx";
import type { GiftValueReachInfosProps } from "./PromotionalBar.tsx";
import type { IconNavigation as IconNavigationType } from "./IconNavigation.tsx";
import type { BasicImageAndLinkProps } from "$store/components/ui/BasicImageAndLink.tsx";
import { BasicImageAndLink } from "$store/components/ui/BasicImageAndLink.tsx";

export interface Props {
  /**
   * @title Store logo
   * @description Logo used on header
   */

  storeLogo?: BasicImageAndLinkProps;
  /** @title Search Bar */

  searchbar?: SearchbarProps;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItemProps[];

  /**
   * @title Link to Login
   */

  loginLink?: IconLoginLinkProps;

  /**
   * @title  Icon Navigation
   * @description Navigation with icons
   */

  IconNavigation?: IconNavigationType[];

  /**
   * @title  Gift Value Reach Infos
   * @description Configure the base value for comparison and the texts to be displayed
   */

  giftValueReachInfos?: GiftValueReachInfosProps;

  /**
   * @title  Promotional Top Banner
   */

  promotionalTopBanner?: {
    activate?: boolean;
    image?: BasicImageAndLinkProps;
  };
}

function Header({
  storeLogo,
  searchbar,
  navItems,
  IconNavigation,
  giftValueReachInfos,
  loginLink,
  promotionalTopBanner,
}: Props) {
  const { activate, image } = promotionalTopBanner ?? {};

  return (
    <>
      <header class="bg-black">
        <div
          id="overlayHeader"
          class="hidden fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 transition duration-500 z-30"
        >
        </div>
        {activate && (
          <div class="flex items-center justify-center">
            <BasicImageAndLink {...image} />
          </div>
        )}
        <Navbar
          IconNavigationItems={IconNavigation}
          storeLogo={storeLogo}
          items={navItems}
          searchbar={searchbar}
          loginLink={loginLink}
        />

        <PromotionalBar giftValueReachInfos={giftValueReachInfos} />
      </header>
    </>
  );
}

export default Header;
