import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import NavItem from "./NavItem.tsx";
import MainMenuItem from "$store/islands/MainMenuItem.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import Navbar from "./Navbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";

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

export interface mainMenuItem {
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
  /**
   * @title  Gift Value Reach Infos
   * @description Configure o valor base e o textos a ser exibido
   */

  giftValueReachInfos?: {
    baseValue?: number;
    beforeText?: string;
    afterText?: string;
  };

  /**
   * @title  Search Settings
   * @description Configuração da search
   */

  searchbar?: SearchbarProps;

  /**
   * @title Main Menu Items
   * @description Main Menu Items items used both on mobile and desktop menus
   */

  mainMenuItems?: Array<mainMenuItem>;
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
        <div class="fixed w-full  bg-black z-20">
          <div class="container" style={{ maxWidth: "1140px" }}>
            {/* <Navbar items={[]} searchbar={searchbar ?? {}} /> */}

            <div class="w-full flex flex-row justify-center items-center "  >
              <div class="flex-none w-44">
                <a
                  href="/"
                  aria-label="Store logo"
                  class="block px-4 py-3 w-[160px]"
                >
                  <Icon id="Logo" width={126} height={16} />
                </a>
              </div>

              <div  class="w-1/3" >
                <input  class='w-full'></input>
              </div>

              <div>
                
              </div>
            </div>

            <div class=" flex flex-col justify-center items-center  align-content-cente   w-full ">
              <div class="flex flex-row mb-2">
                {mainMenuItems.reverse().map((item, index) => (
                  <MainMenuItem
                    text={item.label}
                    children={item.children}
                    index={index}
                  />
                ))}
              </div>

              {(!!beforeText || !!afterText) && !!baseValue && (
                <div class="text-white  font-semibold ">
                  <p>
                    {`${beforeText ?? ""} ${formatPrice(baseValue)} ${
                      afterText ?? ""
                    }`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
