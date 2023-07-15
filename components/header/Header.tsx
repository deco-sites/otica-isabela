import Modals from "$store/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";

import NavItem from "./NavItem.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import MainMenu from "$store/islands/MainMenu.tsx";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src?: Image;
    alt?: string;
  };
}

export interface NewNavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    image?: {
      src?: Image;
      alt?: string;
    };
  }>;
}

export interface Props {
  alerts: string[];
  text: string;
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

  newNavItems?: Array<NewNavItem>;
}

function Header({
  alerts,
  searchbar: _searchbar,
  products,
  newNavItems = [],
  navItems = [],
  suggestions,
  text = "Subtitulo",
}: Props) {
  const searchbar = { ..._searchbar, products, suggestions };

  return (
    <>
      <header  style={{ height: headerHeight }}>
        <div class="bg-base-100 fixed w-full z-20">
          <Navbar items={navItems} searchbar={searchbar} />

          <div class=" flex flex-col justify-center items-center  align-content-cente  bg-black w-full ">
            <div class="flex flex-row">
              {newNavItems.map((item,index) => (
                <MainMenu
                  text={item.label}
                  children={item.children}
                  index={index}
                />
              ))}
            </div>

            <div class="text-white  font-semibold ">
              {text}
            </div>
          </div>
        </div>

    
      </header>
    </>
  );
}

export default Header;
