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

// Função para verificar se uma imagem realmente existe
async function doesImageExist(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
}

const useStableImages = async (product: ProductDetailsPage["product"]) => {
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

  const verifiedImages = await Promise.all(
    images.map(async (img) => {
      const name = imageNameFromURL(img.url);
      const customPath = `/images/custom/${name}`;

      const exists = await doesImageExist(customPath);
      return exists ? { ...img, url: customPath } : img;
    })
  );

  return verifiedImages;
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
  const {
    discountTagLocation,
    nameLocation,
    starsLocation,
    showProductTumbnails,
    displayModalAfter,
  } = mobileOptions;
  const { price, listPrice, installments } = useOffer(offers);
  const id = `product-image-gallery:${useId()}`;

  // Verificar imagens estáveis
  const images = useStableImages(product);

  return (
    <>
      {/* Breadcrumb - Desktop */}
      <div
        id="breadcrumb"
        class="block mb-[20px] text-center md:text-left"
      >
        <Breadcrumb itemListElement={breadcrumbList?.itemListElement} />
      </div>

      {/* Image Slider - Mobile & Desktop */}
      <div id={id} class="lg:flex lg:justify-center lg:gap-9">
        <div class="relative flex flex-col items-center text-center w-full lg:max-w-[540px] mt-2 lg:mt-0">
          <div class="relative">
            <Slider
              id={`product-images-${id}`}
              class="carousel carousel-center gap-6 bg-white w-[95vw] sm:w-[30vw] md:w-[60vw] lg:w-[540px]"
            >
              {images.map((img, index) => (
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
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
