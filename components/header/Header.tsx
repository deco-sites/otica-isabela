import Modals from "$store/islands/HeaderModals.tsx";

import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";

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
  };

  /**
   * @title Site logo
   * @description Logo used in header
   */

  siteLogo?: BasicImage;
}

function Header({
  alerts,
  siteLogo,
  searchbar,
  products,
  navItems = [],
  suggestions,
}: Props) {
  return (
    <>
      <header>
        <div class="bg-black fixed w-full z-50  ">
          <div class="container ">
            <Navbar
              siteLogo={siteLogo}
              items={navItems}
              searchbar={searchbar}
            />
          </div>
        </div>

        <Modals
          menu={{ items: navItems }}
          searchbar={searchbar}
        />
      </header>
    </>
  );
}

export default Header;
