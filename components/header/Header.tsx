import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import type { AvailableIcons } from "$store/components/ui/Icon.tsx";
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
}

function Header({
  storeLogo,
  searchbar,
  navItems = [],
  iconLinks,
}: Props) {
  return (
    <>
      <header>
        <div class="bg-black fixed w-full z-50 flex flex-row justify-center items-center  ">
          <div
            style={{ maxWidth: "1140px" }}
            class=" flex flex-row justify-center items-center w-full "
          >
            <Navbar
              iconLinks={iconLinks}
              storeLogo={storeLogo}
              items={navItems}
              searchbar={searchbar}
            />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
