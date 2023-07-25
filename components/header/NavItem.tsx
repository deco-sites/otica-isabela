import Image from "deco-sites/std/components/Image.tsx";
import type { Image as ImageType } from "deco-sites/std/components/types.ts";
import { Suspense, useMemo, useState } from "preact/compat";
import { IS_BROWSER } from "$fresh/runtime.ts";

export interface NavItemProps {
  label: string;
  href: string;
  mobileMenuImage?: { src?: ImageType; alt?: string };
  children?: {
    label: string;
    href: string;
    desktopMenuImage?: { src?: ImageType; alt?: string };
  }[];
}

interface Props {
  items?: NavItemProps[];
}

export const NavItem = ({ items }: Props) => {
  const [showOptions, setShowOptions] = useState(false);

  const closeModal = () => {
    setShowOptions(false);
  };

  const openModal = () => {
    setShowOptions(true);
  };

  const modalAlignment = useMemo(() => {
    if (!IS_BROWSER) {
      return {};
    }

    const screenWidth = window?.innerWidth ?? 0;
    const MODAL_BASE_SIZE = screenWidth / 4;
    const alignment: { [key: string]: string } = {};
    const childrenLenght = 1;
    const modalWidth = childrenLenght * MODAL_BASE_SIZE;

    if (childrenLenght >= 2) {
      alignment["left"] = `${(screenWidth - modalWidth) / 2}px`;
    }

    return {
      ...alignment,
      "width": `${modalWidth}px`,
    };
  }, []);

  if (!items?.length) {
    return null;
  }

  console.log("items", items);

  return (
    <div class="hidden lg:flex flex-row justify-center items-center gap-x-5">
      {items?.map(({ href, label, children }) => {
        return (
          <div>
            <a href={href} onMouseEnter={openModal} onMouseLeave={closeModal}>
              <span class="text-white hover:text-blue-200  text-base font-medium ">
                {label}
              </span>
            </a>

            {children && children.length > 0 && showOptions &&
              (
                <Suspense fallback={null}>
                  <div
                    style={{ ...modalAlignment, maxWidth: "1260px" }}
                    onMouseEnter={openModal}
                    onMouseLeave={closeModal}
                    class=" rounded-xl absolute flex flex-row bg-base-100 z-50 items-start justify-center gap-6 "
                  >
                    {children.map(({ href, label, desktopMenuImage }) =>
                      desktopMenuImage?.src && (
                        <a href={href} class="m-0 p-0">
                          <div class="p-6  flex flex-col justify-center gap-y-4   ">
                            <Image
                              class="rounded-xl p-0"
                              src={desktopMenuImage.src}
                              alt={desktopMenuImage.alt}
                              width={280}
                              height={250}
                              loading="lazy"
                            />
                            <div class="w-full text-center">
                              <span class="font-medium text-lg  text-blue-200 font-sans  ">
                                {label}
                              </span>
                            </div>
                          </div>
                        </a>
                      )
                    )}
                  </div>
                </Suspense>
              )}
          </div>
        );
      })}
    </div>
  );
};

export default NavItem;
