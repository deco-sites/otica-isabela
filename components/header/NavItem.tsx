import { IS_BROWSER } from "$fresh/runtime.ts";
import Image from "deco-sites/std/components/Image.tsx";
import type { Image as ImageType } from "deco-sites/std/components/types.ts";
import { useMemo } from "preact/compat";
import { navbarModalBaseWidth } from "./constants.ts";

interface NavbarItem {
  mobileOnly?: boolean;
  label?: string;
  href?: string;
  desktopMenuImage?: {
    src?: ImageType;
    alt?: string;
  };
}

export interface NavItemProps {
  label: string;
  href: string;
  mobileOnly?: boolean;
  mobileMenuImage?: {
    src?: ImageType;
    alt?: string;
  };
  navbarItems?: NavbarItem[];
}

const calculateModalAlignment = (
  filteredChildren: NavbarItem[] | undefined,
) => {
  if (!IS_BROWSER || !filteredChildren) return {};

  const childrenLength = filteredChildren.length;
  const modalWidth = childrenLength * navbarModalBaseWidth;
  const width = `${modalWidth}px`;

  return {
    width,
  };
};

export const NavItem = ({ label, navbarItems, href }: NavItemProps) => {
  const filteredChildren = useMemo(
    () =>
      navbarItems?.filter((item) =>
        !item.mobileOnly && item.desktopMenuImage?.src
      ) || [],
    [navbarItems],
  );

  const modalAlignment = useMemo(
    () => calculateModalAlignment(filteredChildren),
    [filteredChildren],
  );

  return (
    <div class="group flex h-full items-center">
      <a
        class="text-grayscale-700 group-hover:text-slot-primary-600 text-sm 2xl:text-base font-normal pb-8 lg:pb-0"
        href={href}
      >
        {label}
      </a>
      <div class="hidden w-full group-hover:flex w-fits absolute flex-row z-50 items-center justify-center bg-base-100 rounded-xl gap-6 mt-9 px-[60px] py-[30px] group-hover:animate-fadeI left-0 top-12">
        {filteredChildren.map(({ desktopMenuImage, href, label }) =>
          desktopMenuImage?.src
            ? (
              <a class="m-0 p-0" href={href} key={label}>
                <div class="mx-2 flex flex-col justify-center items-center gap-y-4">
                  <Image
                    class="rounded-[20px] object-cover	p-0 max-2xl:w-[200px] h-[280px]"
                    src={desktopMenuImage.src}
                    alt={desktopMenuImage?.alt ?? "Dropdown menu image"}
                    width={280}
                    height={280}
                  />
                  <div class="w-full text-center">
                    <span class="font-medium text-lg text-blue-200 uppercase">
                      {label}
                    </span>
                  </div>
                </div>
              </a>
            )
            : null
        )}
      </div>
    </div>
  );
};
