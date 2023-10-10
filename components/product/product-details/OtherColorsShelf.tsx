import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { Product, ProductLeaf } from "deco-sites/std/commerce/types.ts";

interface Props {
  product: Product;
}

type Variant = ProductLeaf & {
  Imagem?: string;
};

function OtherColorsShelf({ product }: Props) {
  const id = "other-colors-shelf";
  const { isVariantOf } = product;
  const { hasVariant } = isVariantOf || {};

  const images = hasVariant?.map((variant: Variant) => ({
    image: variant.Imagem,
    alternateName: variant.alternateName,
    url: variant.url,
  }));

  return (
    <div class="mt-10">
      <h1 class="text-[32px] text-black text-center font-roboto font-bold">
        Mais cores
      </h1>
      <div class="w-full flex flex-col gap-0 md:gap-12 lg:gap-16 mt-10">
        <div id={id} class="container flex flex-col px-0 sm:px-5">
          <Slider class="carousel carousel-center sm:carousel-end gap-0 md:gap-6 col-span-full row-start-2 row-end-5">
            {images?.map((img, index) => (
              <div class="flex flex-col">
                <Slider.Item
                  index={index}
                  class="carousel-item w-full lg:first:pl-0 first:pl-4 last:pr-4  lg:last:pr-0 justify-center"
                >
                  <a href={img.url} class="hidden md:block">
                    <img
                      src={img.image}
                      alt={img.alternateName}
                      width="340px"
                      height="190px"
                    />
                  </a>
                  <a href={img.url} class="md:hidden">
                    <img
                      src={img.image}
                      alt={img.alternateName}
                      width="260px"
                      height="190px"
                    />
                  </a>
                </Slider.Item>
              </div>
            ))}
          </Slider>

          <SliderJS
            itemsPerPage={{
              desktop: { 0: 3 },
              mobile: { 0: 1 },
            }}
            rootId={id}
            perPageDots
          />

          <div class="flex flex-row w-full gap-x-3 justify-center items-center py-14 ">
            {images?.map((_, index) => (
              <Slider.Dot index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherColorsShelf;
