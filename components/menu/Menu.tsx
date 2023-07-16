import Button from "$store/components/ui/Button.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import Image from "deco-sites/std/components/Image.tsx";
import { Suspense, useEffect, useMemo, useState } from "preact/compat";
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
  const [elementPosition, setElementPosition] = useState<
    { [key: string]: string }
  >({});

  const closeModal = () => {
    setShowOptions(false);
  };

  const openModal = () => {
    setShowOptions(true);
  };


  // refatorar e melhorar essa estrutura 

  useEffect(() => {
    const getleftlenght = (elementId: string) => {
      if (!IS_BROWSER) {
        return;
      }

      const posicaoElemento =
        document.getElementById(elementId)?.getBoundingClientRect()
          .left ?? 0;
      const tamanhoDoElemento =
        document.getElementById(elementId)?.getBoundingClientRect()
          .width ?? 0;

      const larguraJanela = window.innerWidth;
      const distanciaDireita = larguraJanela - posicaoElemento;
      const distanciaEsquerda = posicaoElemento;

      const childrenQty = children ? children.length : 0;

      if (childrenQty > 2) {
        if (distanciaDireita < distanciaEsquerda) {
          setElementPosition({
            "right": `${(larguraJanela - distanciaEsquerda) / 2}px`,
          });
        } else {
          setElementPosition({
            "left": `${(larguraJanela - distanciaDireita) / 2}px`,
          });
        }

        return;
      }

      setElementPosition({
        "left": `${distanciaEsquerda - tamanhoDoElemento / 2}px`,
      });
    };

    getleftlenght(`menu-item-button-${index}`);
  }, [!IS_BROWSER, index]);

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
                  style={elementPosition}
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
};
