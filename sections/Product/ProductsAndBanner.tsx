import Image from "deco-sites/std/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { ProductShelfDots } from "$store/components/product/ProductShelf.tsx";
import { useId } from "preact/hooks";
import SliderJS from "$store/islands/SliderJS.tsx";
import { IconTitle } from "$store/components/ui/IconTitle.tsx";
import type { IconTitleProps } from "$store/components/ui/IconTitle.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import ProductShelf from "$store/components/product/ProductShelf.tsx";

export interface BannersProps {
  label: string;
  href?: string;
  image?: LiveImage;
}

export interface Props {
  header?: IconTitleProps;
  /**
   * @title Banners
   */
  banners?: BannersProps[];
  products?: LoaderReturnType<Product[] | null>;
}

function ProductsAndBanner({ header, banners, products }: Props) {
  const id = `category-list-${useId()}`;

  return (
    <>
      <div class=" w-full flex flex-col mb-4 lg:mb-8">
        <IconTitle {...header} />

        <div
          id={id}
          class="container h-full py-8 flex flex-col gap-8 lg:gap-10 text-base-content mb-8  lg:py-10"
        >
          <Slider class="carousel carousel-center gap-4 lg:gap-8 row-start-2 row-end-5">
            {banners?.map((
              { label, href, image },
              index,
            ) => (
              <Slider.Item
                index={index}
                class="carousel-item flex flex-col mb-3 lg:mb-8  first:ml-8 lg:first:ml-0"
              >
                <a
                  href={href}
                >
                  {image &&
                    (
                      <figure>
                        <Image
                          class=" rounded-3xl"
                          src={image}
                          alt={label}
                          width={350}
                          height={350}
                          loading="lazy"
                        />
                      </figure>
                    )}
                </a>
              </Slider.Item>
            ))}
          </Slider>
          <div class="flex lg:hidden w-full justify-center items-center gap-x-4">
            {banners?.map((_, index) => {
              return (
                <Slider.Dot index={index}>
                  <ProductShelfDots />
                </Slider.Dot>
              );
            })}
          </div>
        </div>
      </div>
      <SliderJS
        itemsPerPage={{ desktop: { 0: 3 }, mobile: { 0: 1.5 } }}
        rootId={id}
      />

      {products && (
        <ProductShelf
          itemsPerPage={{ desktop: { 0: 3 }, mobile: { 0: 1.5 } }}
          products={products}
          itemListName="Produtos Visitados"
        />
      )}
    </>
  );
}

export default ProductsAndBanner;
