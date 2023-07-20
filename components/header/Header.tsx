import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Navbar from "./Navbar.tsx";
import type { NavItemProps } from "./NavItem.tsx";
import type { IconLoginLinkProps } from "./IconLoginLink.tsx";
import PromotionalBar from "$store/islands/PromotionalBar.tsx";
import type { GiftValueReachInfosProps } from "./PromotionalBar.tsx";
import type { IconNavigation as IconNavigationType } from "./IconNavigation.tsx";
import type { BasicImageAndLinkProps } from "$store/components/ui/BasicImageAndLink.tsx";

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
   * @description (Optional) dafault value "/login"
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
}

function Header({
  storeLogo,
  searchbar,
  navItems,
  IconNavigation,
  giftValueReachInfos,
  loginLink,
}: Props) {
  return (
    <>
      <header class="bg-black">
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
