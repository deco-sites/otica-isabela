import Button from "$store/components/ui/Button.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import { Suspense, useState } from "preact/compat";
import type { Image as imageType } from "deco-sites/std/components/types.ts";

function MainMenu(
  { text, children }: {
    text: string;
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

  const closeModal = () => {
    setShowOptions(false);
  };

  const openModal = () => {
    setShowOptions(true);
  };

  return (
    <>
      <div>
        <Button
          class="  bg-transparent border-none  hover:bg-transparent"
          onMouseEnter={openModal}
          onMouseLeave={closeModal}
        >
          <span class="text-white hover:text-primary text-16 font-semibold ">
            {text}
          </span>
        </Button>

        {showOptions && children && children?.length && (
          <Suspense fallback={null}>
            {children && children.length > 0 &&
              (
                <div
                  onMouseEnter={openModal}
                  onMouseLeave={closeModal}
                  class=" rounded-xl absolute  border- hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 "
                >
                  {children.map(({ image, href }) =>
                    image?.src && (
                      <Image
                        class="p-6"
                        src={image.src}
                        alt={image.alt}
                        width={300}
                        height={332}
                        loading="lazy"
                      />
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
