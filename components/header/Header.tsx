import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import NavItem from "./NavItem.tsx";
import MainMenu from "$store/islands/MainMenu.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import { useMemo } from "preact/compat";

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
  giftValueReachInfos?: {
    baseValue?: number;
    beforeText?: string;
    afterText?: string;
  };
  /**
   * @title Highlight Ttext
   * @description Texto de destaque no Header
   */
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

  mainMenuItems?: Array<NewNavItem>;

  /**
   * @title Menu Principal
   * @description Itens de navegação usados ​​em menus móveis e de desktop
   */
}

function Header({
  searchbar,
  mainMenuItems = [],
  giftValueReachInfos,
}: Props) {
  const { afterText, baseValue, beforeText } = useMemo(() => {
    if (!giftValueReachInfos) {
      return {};
    }

    return { ...giftValueReachInfos };
  }, [giftValueReachInfos]);

  return (
    <>
      <header style={{ height: headerHeight }}>
        <div class="bg-base-100 fixed w-full z-20">
          <Navbar items={[]} searchbar={searchbar ?? {}} />

          <div class=" flex flex-col justify-center items-center  align-content-cente  bg-black w-full ">
            <div class="flex flex-row">
              {mainMenuItems.map((item, index) => (
                <MainMenu
                  text={item.label}
                  children={item.children}
                  index={index}
                />
              ))}
            </div>

            {(!!beforeText || !!afterText) && !!baseValue && (
              <div class="text-white  font-semibold ">
                <p>{`${beforeText} ${baseValue} ${afterText}`}</p>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
