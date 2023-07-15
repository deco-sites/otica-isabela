import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import NavItem from "./NavItem.tsx";
import MainMenu from "$store/islands/MainMenu.tsx";
import { formatPrice } from "$store/sdk/format.ts";
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
                <p>
                  {`${beforeText ?? ""} ${formatPrice(baseValue)} ${
                    afterText ?? ""
                  }`}
                </p>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
