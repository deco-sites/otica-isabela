import Button from "$store/components/ui/Button.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import Image from "deco-sites/std/components/Image.tsx";
import { Suspense, useMemo, useState } from "preact/compat";
import type { Image as imageType } from "deco-sites/std/components/types.ts";

export const MainMenuItem = (
  { text, children, index }: {
    text: string;
    index: number;
    children?: Array<{
      label: string;
      href: string;
      image?: {
        src?: imageType;
        alt?: string;
      };
    }>;
  },
) => {
  const [showOptions, setShowOptions] = useState(false);

  const MODAL_BASE_SIZE = 300;

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

    const alignment: { [key: string]: string } = {};
    const childrenLenght = children?.length ?? 0;
    const modalWidth = childrenLenght * MODAL_BASE_SIZE;
    const screenWidth = window?.innerWidth ?? 0;

    if (childrenLenght >= 2) {
      alignment["left"] = `${(screenWidth - modalWidth) / 2}px`;
    }

    return {
      ...alignment,
      "width": `${modalWidth}px`,
    };
  }, [index]);

  return (
    <>
      <div>
        <Button
          id={`menu-item-button-${index}`}
          class="bg-transparent border-none  hover:bg-transparent"
          onMouseEnter={openModal}
         onMouseLeave={closeModal}
        >
          <span class="text-white hover:text-primary  text-16 font-semibold ">
            {text}
          </span>
        </Button>

        {showOptions && !!children && !!children?.length && (
          <Suspense fallback={null}>
            {children && children.length > 0 &&
              (
                <div
                  style={{ ...modalAlignment, maxWidth: "1260px" }}
                  onMouseEnter={openModal}
                  onMouseLeave={closeModal}
                  class=" rounded-xl absolute    flex flex-row  border- hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 "
                >
                  {children.map(({ image, href, label }) =>
                    image?.src && (
                      <div class="p-6  flex flex-col justify-center gap-y-4   ">
                        <Image
                          class="rounded-xl p-0"
                          src={image.src}
                          alt={image.alt}
                          width={300}
                          height={332}
                          loading="lazy"
                        />
                        <div class="w-full text-center">
                          <span class="font-medium text-lg  text-primary-200 font-sans  ">
                            {label}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
          </Suspense>
        )}
      </div>
    </>
  );
};
