import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Image from "apps/website/components/Image.tsx";
import { useId } from "$store/sdk/useId.ts";
import { Product } from "site/packs/v2/types.ts";

interface Props {
  product: Product;
}

// type Variant = ProductLeaf & {
//   Imagem?: string;
// };

function OtherColorsShelf({ product }: Props) {
  const id = `other-colors-shelf-${useId()}`;
  const { isVariantOf, productID } = product;
  const { hasVariant } = isVariantOf || {};

  if (hasVariant && hasVariant.length <= 1) return null;

  const images = hasVariant
    ?.map((variant: Variant) => ({
      image: variant.Imagem,
      alternateName: variant.alternateName,
      url: variant.url,
      sku: variant.sku,
    }))
    .filter((variant) => variant.sku !== productID);

  return (
    <div class="mt-10">
      <h3 class="text-[32px] text-black text-center font-outfit font-bold">
        {product?.category?.name.includes("Lentes de Contato") ||
            product?.category?.name.includes("Acessórios")
          ? "Mais opções"
          : "Mais cores"}
      </h3>
      <div class="w-full flex flex-col gap-0 md:gap-12 lg:gap-16 mt-10">
        <div id={id} class="container flex flex-col px-0 sm:px-5">
          <Slider class="carousel carousel-center sm:carousel-end gap-0 md:gap-6 col-span-full row-start-2 row-end-5">
            {images?.map(({ image, alternateName, url }, index) => (
              <div class="flex flex-col">
                <Slider.Item
                  index={index}
                  class="carousel-item w-full justify-center items-center"
                >
                  <a href={url}>
                    <Image
                      class="max-w-[260px] md:max-w-[100%]"
                      src={image!}
                      alt={alternateName}
                      width={260}
                      height={260}
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
          />

          {/* Dots */}
          <div class="flex flex-row w-full gap-x-3 justify-center items-center py-14">
            {images?.map((_, index) => <Slider.Dot index={index} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherColorsShelf;
