import Buttons from "$store/islands/HeaderButton.tsx";
import type { IconLinks } from "./Header.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import NavItem from "./NavItem.tsx";
import Searchbar from "$store/components/search/Searchbar.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import type { AvailableIcons } from "$store/components/ui/Icon.tsx";

import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { BasicImage } from "./Header.tsx";

function Navbar({ items, searchbar, storeLogo,iconLinks}: {
  items: INavItem[];
  searchbar?: SearchbarProps;
  storeLogo?: BasicImage;
  iconLinks?: IconLinks[];
}) {
 
  return (
    <>
      <div class=" flex flex-col justify-center items-center w-full p-6  ">
        <div class="flex flex-row justify-center items-center  w-full  gap-2 mb-4">
          <div class=" flex md:hidden">
            <Buttons variant="menu" />
          </div>

          {storeLogo && (
            <a
              href="/"
              aria-label="Store logo"
            >
              <Image
                src={storeLogo.src ?? ""}
                alt={storeLogo.src ?? ""}
                width={256}
              />
            </a>
          )}

          <div class=" hidden md:flex  w-full max-w-[33.33%] pr-6   ">
            <Searchbar {...searchbar} />
          </div>

          <div class="flex flex-row  gap-x-4  justify-center items-center ">
            <a
              href="/link dinamico"
              aria-label="Log in"
            >
              <div class="flex  gap-x-2 items-center pt-[7px] ">
                <Icon id="User" width={26} height={24} strokeWidth={0.4} />

                <div class="hidden lg:flex flex-col font-sans  items-start text-white text-xs  ">
                  <span class="hover:text-blue-200 font-normal ">
                    Ola, bem vindo!
                  </span>
                  <span class="hover:text-blue-200 font-semibold ">
                    Login ou cadastre-se
                  </span>
                </div>
              </div>
            </a>

            {!!iconLinks &&
              iconLinks?.map(({ href, icon, title, mobileVibility }) => {
                return (
                  <a
                    href={href}
                    aria-label={`${title}-${href}`}
                    class={` ${mobileVibility ? "" : " hidden md:flex"} `}
                  >
                    <div class="flex flex-col justify-center items-center ">
                      <Icon
                        id={icon}
                        fill="none"
                        width={26}
                        height={24}
                        strokeWidth={0.4}
                      />
                      <span class=" hidden lg:flex  text-white text-xs font-sans  hover:text-blue-200 font-normal">
                        {title}
                      </span>
                    </div>
                  </a>
                );
              })}

            <Buttons variant="cart" />
          </div>
        </div>

        <div class="flex md:hidden  w-full ">
          <Searchbar {...searchbar} />
        </div>

        <div class="hidden md:flex flex-row justify-center items-center">
          {items.map((item) => <NavItem item={item} />)}
        </div>
      </div>
    </>
  );
}

export default Navbar;
