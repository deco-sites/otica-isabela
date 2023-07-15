import Button from "$store/components/ui/Button.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import Image from "deco-sites/std/components/Image.tsx";
import { Suspense, useEffect, useMemo, useState } from "preact/compat";
import type { Image as imageType } from "deco-sites/std/components/types.ts";

function MainMenu(
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
) {
  const [showOptions, setShowOptions] = useState(false);
  const [buttonSize, setButtonSize] = useState(0);

  const closeModal = () => {
    setShowOptions(false);
  };

  const openModal = () => {
    setShowOptions(true);
  };

  const modalMargin = useMemo(() => {
    return buttonSize  ;
  }, [buttonSize, index]);

  useEffect(() => {
    if (!IS_BROWSER || index > 0) {
      return;
    }
    const getSize = () => {
      const size =
        document.getElementById("menu-item-button")?.getBoundingClientRect()
          .left;

          console.log("size",size)
      setButtonSize(size ?? 0);
    };

    getSize();
  }, []);

  return (
    <>
      <div>
        <Button
          id="menu-item-button"
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
                  style={{ marginRight: modalMargin/2 }}
                  onMouseEnter={openModal}
                  onMouseLeave={closeModal}
                  class=" rounded-xl absolute   flex flex-row  border- hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 "
                >
                  {children.map(({ image, href, label }) =>
                    image?.src && (
                      <div>
                        <Image
                          class="p-6  rounded-xl"
                          src={image.src}
                          alt={image.alt}
                          width={300}
                          height={332}
                          loading="lazy"
                        />
                        <div class="w-full text-center">
                          <span class="text-primary   ">
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
}

export default MainMenu;
