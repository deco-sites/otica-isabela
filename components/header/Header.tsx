import Image from "deco-sites/std/components/Image.tsx";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import NavItem from "./NavItem.tsx";
import Searchbar from "$store/components/search/Searchbar.tsx";
import MainMenuItem from "$store/islands/MainMenuItem.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type { Image as ImageType } from "deco-sites/std/components/types.ts";
import { useUI } from "$store/sdk/useUI.ts";
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
    src?: ImageType;
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
      src?: ImageType;
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

  /**
   * @title Site logo
   * @description Logo used in header
   */

  siteLogo?: {
    src?: ImageType;
    alt?: string;
  };
}

function Header({
  searchbar,
  mainMenuItems = [],
  giftValueReachInfos,
  siteLogo,
}: Props) {
  const { displayCart } = useUI();
  const { afterText, baseValue, beforeText } = useMemo(() => {
    if (!giftValueReachInfos) {
      return {};
    }

    return { ...giftValueReachInfos };
  }, [giftValueReachInfos]);

  return (
    <>
      <header style={{ height: headerHeight }}>
        <div class="fixed w-full pt-8  bg-black z-50">
          <div class="container" style={{ maxWidth: "1280px" }}>
            <div class="w-full flex flex-row justify-center items-center mb-4 ">
              <div class=" w-64">
                <a
                  href="/"
                  aria-label="Store logo"
                  class="w-full"
                >
                  {siteLogo && (
                    <Image
                      src={siteLogo.src ?? ""}
                      alt={siteLogo.src ?? ""}
                      width={400}
                    />
                  )}
                </a>
              </div>

              <div class=" hidden lg:flex  w-1/3">
                <Searchbar {...searchbar} />
              </div>
              <div>
              </div>
            </div>

            <div class=" flex flex-col justify-center items-center  align-content-cente   w-full ">
              <div class=" hidden lg:flex flex-row mb-2">
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
