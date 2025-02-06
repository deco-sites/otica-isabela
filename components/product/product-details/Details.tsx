import { existsSync } from "node:fs"; // Alteração para Deno compatível
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/components/ui/SliderJS.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import type { Props } from "deco-sites/otica-isabela/components/product/ProductDetails.tsx";
import ToExperimentButton from "deco-sites/otica-isabela/components/product/ToExperimentButton.tsx";
import ProductInfo from "deco-sites/otica-isabela/components/product/product-details/ProductInfo.tsx";
import Ratings from "deco-sites/otica-isabela/components/product/product-details/Ratings.tsx";
import Breadcrumb from "deco-sites/otica-isabela/components/ui/Breadcrumb.tsx";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import WishlistButton from "deco-sites/otica-isabela/components/wishlist/WishlistButton.tsx";
import ShareButton from "deco-sites/otica-isabela/islands/ShareButton.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import Video from "deco-sites/std/components/Video.tsx";
import { useId } from "deco-sites/otica-isabela/sdk/useId.ts";

import CartModalMobile from "$store/components/ui/CartModalMobile.tsx";

const useStableImages = (product: ProductDetailsPage["product"]) => {
  const imageNameFromURL = (url = "") => {
    const segments = new URL(url).pathname.split("/");
    return segments[segments.length - 1];
  };

  const images = product.image ?? [];
  const allImages = product.isVariantOf?.hasVariant
    .flatMap((p) => p.image)
    .reduce((acc, img) => {
      if (img?.url) {
        acc[imageNameFromURL(img.url)] = img.url;
      }
      return acc;
    }, {} as Record<string, string>) ?? {};

  return images.map((img) => {
    const name = imageNameFromURL(img.url);
    const customImagePath = `/images/custom/${name}`;
    const imageExists = existsSync(`./static${customImagePath}`); // Verifica se a imagem existe

    return {
      ...img,
      url: imageExists ? customImagePath : img.url, // Usa a imagem se ela existir
    };
  });
};

function Details({
  page,
  promotions,
  buttonByCategory,
  stepButtonByCategory,
  customer,
  mobileOptions,
}: Props) {
  const { product, breadcrumbList } = page!;
  const { name, productID, offers, additionalProperty, url, sku } = product;
  const { price, listPrice } = useOffer(offers);
  const id = `product-image-gallery:${useId()}`;
  const images = useStableImages(product);

  return (
    <>
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `
            #image-dots::-webkit-scrollbar {
              display: none;
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `,
        }}
      />
      <div id="breadcrumb" class="block mb-[20px] text-center md:text-left">
        <Breadcrumb itemListElement={breadcrumbList?.itemListElement} />
      </div>
      <div id={id} class="lg:flex lg:justify-center lg:gap-9">
        <div class="relative flex flex-col items-center text-center w-full lg:max-w-[540px] mt-2 lg:mt-0">
          <div class="relative">
            <Slider
              id={`product-images-${id}`}
              class="carousel carousel-center gap-6 bg-white w-[95vw] sm:w-[30vw] md:w-[60vw] lg:w-[540px]"
            >
              {images.map((img, index) =>
                img.url ? (
                  <Slider.Item
                    index={index}
                    class="carousel-item w-full items-center"
                  >
                    {img.additionalType === "video" ? (
                      <Video
                        src={img.url}
                        loading="lazy"
                        width={350}
                        height={350}
                        class="w-full"
                        controls
                      />
                    ) : (
                      <Image
                        class="w-full h-max"
                        src={img.url!}
                        alt={img.alternateName}
                        width={350}
                        height={350}
                        preload={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    )}
                  </Slider.Item>
                ) : null
              )}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
