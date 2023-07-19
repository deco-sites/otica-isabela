import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import type { AvailableIcons } from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";

import Navbar from "./Navbar.tsx";

export interface IconLinks {
  title: string;
  href: string;
  icon: AvailableIcons;
  mobileVibility?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  image?: {
    src?: Image;
    alt?: string;
  };
  children?: Array<{
    label: string;
    href: string;
    image?: {
      src?: Image;
      alt?: string;
    };
  }>;
}

export interface BasicImage {
  src?: Image;
  alt?: string;
}

export interface Props {
  alerts: string[];
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: LoaderReturnType<Product[] | null>;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: LoaderReturnType<Suggestion | null>;

  /**
   * @title  Gift Value Reach Infos
   * @description Configure o valor base e o textos a ser exibido
   */

  giftValueReachInfos?: {
    baseValue?: number;
    beforeText?: string;
    afterText?: string;
    sucessText?: string;
    activate?: boolean;
  };

  /**
   * @title Site logo
   * @description Logo used in header
   */

  storeLogo?: BasicImage;

  /**
   * @title icon Links
   * @description icon Links used in header
   */

  iconLinks?: IconLinks[];

  /**
   * @title Link to Login
   * @description (Optional) dafault value "/login"
   */

  loginLink?: string;
}

function Header({
  storeLogo,
  searchbar,
  navItems = [],
  iconLinks,
  giftValueReachInfos,
  loginLink,
}: Props) {
  const { afterText, baseValue, beforeText, activate } = giftValueReachInfos ??
    {};

  const CART_VALUE_MOCK = 40;

  const porcentWidthValue = baseValue ?? 0 / CART_VALUE_MOCK;

  return (
    <>
      <header>
        <Navbar
          iconLinks={iconLinks}
          storeLogo={storeLogo}
          items={navItems}
          searchbar={searchbar}
          loginLink={loginLink}
        />

        {!activate && (
          <div class="flex flex-col bg-black  justify-center items-center w-full">
            <p class="  pb-2 text-white  font-semibold font-sans">
              {`${beforeText ?? ""} ${
                baseValue &&
                formatPrice(baseValue - CART_VALUE_MOCK)
              } ${afterText ?? ""}`}
            </p>
            <div class="w-full h-2 bg-secondary ">
              <div
                class="w-full bg-success h-full "
                style={{ maxWidth: `${porcentWidthValue}%` }}
              >
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
