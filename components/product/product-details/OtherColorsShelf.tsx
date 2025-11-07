import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Image from "apps/website/components/Image.tsx";
import { useId } from "$store/sdk/useId.ts";
import { Product } from "site/packs/v2/types.ts";
import { MediasResponseObject } from "$store/packs/v2/loaders/productMedias.ts";

interface Props {
  product: Product;
  relatedProductImages?: ({
    slug: string;
    images: MediasResponseObject[];
  } | null)[];
}

function OtherColorsShelf({ product, relatedProductImages }: Props) {
  const id = `other-colors-shelf-${useId()}`;

  if (relatedProductImages && relatedProductImages.length <= 0) return null;

  return (
    <div class="mt-10">
      <h3 class="text-[32px] text-black text-center font-outfit font-bold">
        {product?.category?.name.toLowerCase().includes("lentes de contato") ||
            product?.category?.name.toLowerCase().includes("acessórios")
          ? "Mais opções"
          : "Mais cores"}
      </h3>
      <div class="w-full flex flex-col gap-0 md:gap-12 lg:gap-16 mt-10">
        <div id={id} class="container flex flex-col px-0 sm:px-5">
          <Slider class="carousel carousel-center sm:carousel-end gap-0 md:gap-6 col-span-full row-start-2 row-end-5">
            {relatedProductImages?.map((item, index) => {
              if (!item || !item.slug || !item.images) return null;

              const { slug, images } = item;
              const imagesFilter = images.filter((media) =>
                media && !media.tryOn
              );

              // Se não há imagens válidas, não renderizar
              if (!imagesFilter || imagesFilter.length === 0) return null;

              const firstImage = imagesFilter[0];
              if (!firstImage?.productImage) return null;

              return (
                <div class="flex flex-col" key={slug || index}>
                  <Slider.Item
                    index={index}
                    class="carousel-item w-full justify-center items-center"
                  >
                    <a href={`/produto/${slug}`}>
                      <Image
                        class="md:max-w-[100%]"
                        src={firstImage.productImage}
                        alt={product.name ?? slug}
                        width={280}
                        height={280}
                        loading="lazy"
                      />
                    </a>
                  </Slider.Item>
                </div>
              );
            }).filter(Boolean)}
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
            {relatedProductImages?.filter((item) =>
              item && item.slug && item.images &&
              item.images.filter((media) => media && !media.tryOn).length > 0
            ).map((_, index) => <Slider.Dot index={index} key={index} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherColorsShelf;
