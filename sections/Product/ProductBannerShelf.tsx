import Image from "deco-sites/std/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { useId } from "preact/hooks";
import SliderJS from "$store/islands/SliderJS.tsx";
import { HeaderTitle } from "../../components/ui/HeaderTitle.tsx";
import type { Props as HeaderProps } from "../../components/ui/HeaderTitle.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "apps/commerce/types.ts";
import ProductShelf from "$store/components/product/ProductShelf.tsx";

export interface BannersProps {
  label: string;
  href?: string;
  buttonLabel?: string;
  image: LiveImage;
}

export interface Props {
  header?: HeaderProps;
  banners?: BannersProps[];
  products?: LoaderReturnType<Product[] | null>;
  isStopwatchEnabled?: boolean;
}

function ProductBannerShelf({
  header,
  banners,
  products,
  isStopwatchEnabled,
}: Props) {
  const id = `category-list-${useId()}`;

  return (
    <>
      <div class=" w-full flex flex-col mb-4 lg:mb-8">
        {header ? <HeaderTitle {...header} /> : null}

        <div
          id={id}
          class="container h-full flex flex-col gap-8 lg:gap-10 text-base-content py-10"
        >
          <Slider class="carousel carousel-center gap-4 lg:gap-8 row-start-2 row-end-5">
            {banners?.map(({ label, href, image, buttonLabel }, index) => (
              <Slider.Item
                index={index}
                class="carousel-item flex flex-col first:ml-8 lg:first:ml-0"
              >
                <a href={href} aria-label={label}>
                  {image && (
                    <div class="relative">
                      <Image
                        class="rounded-3xl w-[350px] h-auto"
                        src={image}
                        alt={label}
                        width={350 / 2}
                        height={350 / 2}
                        loading="lazy"
                      />
                      {buttonLabel && (
                        <button class="absolute border-orange-600 border rounded-md pr-14 pl-14 pt-1 pb-1 left-[4.5rem] bottom-[1rem] text-orange-600">
                          {buttonLabel}
                        </button>
                      )}
                    </div>
                  )}
                </a>
              </Slider.Item>
            ))}
          </Slider>
          <div class="flex lg:hidden w-full justify-center items-center gap-x-4">
            {banners?.map((_, index) => {
              return <Slider.Dot index={index} />;
            })}
          </div>
        </div>
      </div>
      <SliderJS
        itemsPerPage={{ desktop: { 0: 3 }, mobile: { 0: 1.2 } }}
        rootId={id}
      />

      {products && (
        <ProductShelf
          itemsPerPage={{ desktop: 3, mobile: 1.2 }}
          products={products}
          isStopwatchEnabled={isStopwatchEnabled}
        />
      )}
    </>
  );
}

export default ProductBannerShelf;
