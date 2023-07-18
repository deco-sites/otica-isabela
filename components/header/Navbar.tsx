import Buttons from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import NavItem from "./NavItem.tsx";
import Searchbar from "$store/components/search/Searchbar.tsx";
import Image from "deco-sites/std/components/Image.tsx";

import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { BasicImage } from "./Header.tsx";

function Navbar({ items, searchbar, siteLogo }: {
  items: INavItem[];
  searchbar?: SearchbarProps;
  siteLogo?: BasicImage;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div class="md:hidden flex flex-col justify-center items-center w-full p-6  ">
        <div class="flex flex-row justify-between items-center  w-full  gap-2 mb-4">
          <Buttons variant="menu" />

          <a
            href="/"
            aria-label="Store logo"
            class="w-full"
          >
            {siteLogo && (
              <Image
                src={siteLogo.src ?? ""}
                alt={siteLogo.src ?? ""}
                width={192}
              />
            )}
          </a>

          <div class="flex gap-1">
            <a
              class="btn btn-circle btn-sm btn-ghost"
              href="/link dinamico"
              aria-label="Log in"
            >
              <Icon id="User" width={20} height={20} strokeWidth={0.4} />
            </a>
            <a
              class="btn btn-circle btn-sm btn-ghost"
              href="/link dinamico"
              aria-label="Log in"
            >
              <Icon id="Heart" width={20} height={20} strokeWidth={0.4} />
            </a>

            <Buttons variant="cart" />
          </div>
        </div>
        <div class="w-full">
          <Searchbar {...searchbar} />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-row justify-between items-center w-full p-6">
        <div class="flex-none w-44">
          <a href="/" aria-label="Store logo" class="block px-4 py-3 w-[160px]">
            <Icon id="Logo" width={126} height={16} />
          </a>
        </div>
        <div class="flex-auto flex justify-center">
          {items.map((item) => <NavItem item={item} />)}
        </div>
        <div class="flex-none w-44 flex items-center justify-end gap-2">
          <a
            class="btn btn-circle btn-sm btn-ghost"
            href="/login"
            aria-label="Log in"
          >
            <Icon id="User" width={20} height={20} strokeWidth={0.4} />
          </a>
          <a
            class="btn btn-circle btn-sm btn-ghost"
            href="/wishlist"
            aria-label="Wishlist"
          >
            <Icon
              id="Heart"
              size={20}
              strokeWidth={2}
              fill="none"
            />
          </a>
          <Buttons variant="cart" />
        </div>
      </div>
    </>
  );
}

export default Navbar;
