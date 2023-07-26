import { useMemo } from "preact/compat";
import type { Image as imageType } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

import { navbarModalBaseWidth } from "./constants.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

export interface NavItemProps {
  label: string;
  href: string;
  mobileOnly?: boolean;
  mobileMenuImage?: {
    src?: imageType;
    alt?: string;
  };
  children?: Array<{
    mobileOnly?: boolean;
    label?: string;
    href?: string;
    desktopMenuImage?: {
      src?: imageType;
      alt?: string;
    };
  }>;
}

export const NavItem = ({ label, children, href }: NavItemProps) => {
  const filteredChildren = useMemo(() => {
    return children?.filter((item) => item.mobileOnly !== true);
  }, [children]);

  const modalAlignment = useMemo(() => {
    if (!IS_BROWSER) {
      return {};
    }

    const alignment: Record<string, string> = {};
    const childrenLength = filteredChildren?.length ?? 0;
    const modalWidth = childrenLength * navbarModalBaseWidth;
    const screenWidth = window?.innerWidth ?? 0;

    if (childrenLength >= 2) {
      alignment["left"] = `${(screenWidth - modalWidth) / 2}px`;
    } else {
      alignment["marginLeft"] = `-${navbarModalBaseWidth / 3}px`;
    }

    return {
      ...alignment,
      maxWidth: `${modalWidth}px`,
    };
  }, [children]);

  return (
    <div class="group flex">
      <a
        href={href}
        class="text-white hover:text-blue-200 text-base font-semibold uppercase pb-8"
      >
        {label}
      </a>
      <div
        style={{ ...modalAlignment }}
        class=" hidden hover:flex group-hover:flex w-full absolute flex-row z-50 items-center justify-center bg-base-100 rounded-xl gap-6 mt-8"
      >
        {filteredChildren?.map((
          { desktopMenuImage, href, label },
        ) =>
          desktopMenuImage?.src && (
            <a href={href} class="m-0 p-0">
              <div class="p-6 flex flex-col justify-center gap-y-4">
                <Image
                  class="rounded-xl p-0"
                  src={desktopMenuImage.src}
                  alt={desktopMenuImage?.alt ?? ""}
                  width={280}
                  height={280}
                  loading="lazy"
                />
                <div class="w-full text-center">
                  <span class="font-medium text-lg text-blue-200 uppercase">
                    {label}
                  </span>
                </div>
              </div>
            </a>
          )
        )}
      </div>
    </div>
  );
};
