import fs from "fs";
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
    // Verificar se a imagem na pasta custom existe
    const imageExists = fs.existsSync(`./static${customImagePath}`);

    // Retornar a URL da imagem na pasta custom apenas se existir
    return {
      ...img,
      url: imageExists ? customImagePath : img.url,
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
  const {
    discountTagLocation,
    nameLocation,
    starsLocation,
    showProductTumbnails,
    displayModalAfter,
  } = mobileOptions;
  const { price, listPrice, installments } = useOffer(offers);
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
      {/* Breadcrumb - Desktop */}
      <div id="breadcrumb" class="block mb-[20px] text-center md:text-left">
        <Breadcrumb itemListElement={breadcrumbList?.itemListElement} />
      </div>

      {/* Header - Mobile */}
      <div
        id={`experimentador-section-${id}`}
        class="flex items-center justify-between mx-3 mt-4 lg:hidden"
      >
        {discount > 0 && discountTagLocation === "Header" && (
          <span class="flex font-bold bg-[#d92027] gap-x-1 rounded text-sm lg:flex justify-center items-center text-white p-2.5">
            <Icon id="ArrowDown" width={9} height={9} />-{discount}%
          </span>
        )}
        <div class="flex items-center">
          <ShareButton link={url!} />
          <WishlistButton productID={productID} customer={customer} />
        </div>
        {!!ratingValue &&
          starsLocation === "Header" &&
          discountTagLocation !== "Header" && (
            <a href="#product-review" aria-label="Veja as avaliações!">
              <Ratings ratingValue={ratingValue} />
            </a>
          )}
        {!isLentes && experimenterImage ? (
          <ToExperimentButton
            image={experimenterImage!}
            variant="filled"
            size="tiny"
          />
        ) : null}
      </div>

      {/* Product Name - Mobile (Header) */}
      {nameLocation === "Header" && (
        <div class="mt-4 mb-4 text-center px-8 lg:hidden">
          <span class="font-roboto font-normal text-lg">{name}</span>
          {lensDescription && (
            <span class="font-roboto font-medium text-sm">{lensDescription}</span>
          )}
        </div>
      )}

      {/* Image Slider - Mobile & Desktop */}
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
      {/* Product Details - Desktop */}
      <div class="hidden lg:block pl-4 pr-4 w-full max-w-[480px]">
        <ProductInfo
          page={page}
          promotions={promotions}
          labels={labels}
          stepLabels={stepLabels}
          customer={customer}
        />
      </div>
      <SliderJS rootId={id} />
    </>
  );
}

export default Details;
