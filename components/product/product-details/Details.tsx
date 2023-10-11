import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/components/ui/SliderJS.tsx";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import WishlistButton from "deco-sites/otica-isabela/components/wishlist/WishlistButton.tsx";
import ToExperimentButton from "deco-sites/otica-isabela/components/product/ToExperimentButton.tsx";
import ProductInfo from "deco-sites/otica-isabela/components/product/product-details/ProductInfo.tsx";
import ShareButton from "deco-sites/otica-isabela/islands/ShareButton.tsx";
import { useId } from "preact/hooks";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { Variant } from "deco-sites/otica-isabela/components/product/ProductDetails.tsx";
import type { ProductDetailsPage } from "apps/commerce/types.ts";

interface Props {
  page: ProductDetailsPage;
  variant: Variant;
}

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

    return { ...img, url: allImages[name] ?? img.url };
  });
};

function Details({ page, variant }: Props) {
  const { product, breadcrumbList } = page;
  const { name, productID, offers, isVariantOf, additionalProperty, url } =
    product;
  const { price, listPrice, installments } = useOffer(offers);
  const id = `product-image-gallery:${useId()}`;
  const images = useStableImages(product);
  const chooseLensUrl = `/passo-a-passo${url?.split("/produto")[1]}`;
  const experimenterImage = additionalProperty?.find(
    (prop) => prop.propertyID === "experimentador",
  )?.value;
  const colorsList = additionalProperty?.filter(
    (prop) => prop.propertyID === "color",
  );
  const colors = colorsList?.map((color) => color.unitCode);
  const discount = Math.ceil(
    (((listPrice ?? 0) - (price ?? 0)) / (listPrice ?? 0)) * 100,
  );

  /**
   * Product slider variant
   *
   * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
   * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
   * we rearrange each cell with col-start- directives
   */
  if (variant === "slider") {
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
        <div id="breadcrumb" class="hidden lg:block lg:mb-[40px]">
          <Breadcrumb
            itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
          />
        </div>

        {/* Header - Mobile */}
        <div
          id="pdp-mobile-header-container"
          class="flex items-center justify-between mx-3 mt-4 lg:hidden"
        >
          {discount > 0 && (
            <span class="flex px-2 bg-[#d92027] gap-x-[2px] rounded text-sm lg:flex justify-center items-center text-white p-[2px] ">
              <Icon id="ArrowDown" width={9} height={9} />-{discount}%
            </span>
          )}
          <div class="flex items-center">
            <ShareButton link={url!} />
            <WishlistButton
              productGroupID={isVariantOf?.productGroupID}
              productID={productID}
            />
          </div>
          <div class="w-full max-w-[120px]">
            <ToExperimentButton image={experimenterImage!} variant="filled" />
          </div>
        </div>

        {/* Product Name - Mobile */}
        <div class="mt-4 mb-[30px] text-center px-8 lg:hidden">
          <span class="font-roboto font-normal text-lg">{name}</span>
        </div>

        {/* Image Slider - Mobile & Desktop */}
        <div id={id} class="lg:flex lg:justify-center lg:gap-9">
          <div class="relative flex flex-col items-center w-full lg:max-w-[540px]">
            <div class="relative">
              <Slider class="carousel carousel-center gap-6 bg-white w-[95vw] sm:w-[30vw] md:w-[60vw] lg:w-[540px]">
                {images.map((img, index) => (
                  <Slider.Item
                    index={index}
                    class="carousel-item w-full items-center min-h-[540px]"
                  >
                    <img
                      class="w-full h-max"
                      src={img.url!}
                      alt={img.alternateName}
                      width="540px"
                      height="540px"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </Slider.Item>
                ))}
              </Slider>
              {discount > 0 && (
                <span class="hidden absolute right-0 bottom-2 bg-[#d92027] gap-x-[2px] rounded text-sm lg:flex justify-center items-center text-white p-[2px] ">
                  <Icon id="ArrowDown" width={9} height={9} />-{discount}%
                </span>
              )}
            </div>

            {/* Dots - Mobile & Desktop */}
            <ul
              id="image-dots"
              class="w-[90%] mt-2 flex overflow-auto lg:max-w-[540px] gap-1"
            >
              {images.map((img, index) => (
                <li class="min-w-[92px] flex items-center px-1 bg-white border-black">
                  <Slider.Dot index={index}>
                    <Image
                      class="group-disabled:border-base-300"
                      width={92}
                      src={img.url!}
                      alt={img.alternateName}
                    />
                  </Slider.Dot>
                </li>
              ))}
            </ul>
          </div>

          {/* Price & Color - Mobile */}
          <div class="lg:hidden px-3 flex items-center justify-between mt-4">
            <div id="price-mobile-container">
              <div id="price-mobile-content">
                <p class="mt-2 line-through font-semibold text-sm  text-red-500 lg:text-base">
                  {formatPrice(listPrice, offers!.priceCurrency!)}
                </p>
                <p class="mt-1 text-blue-200 text-[27px] font-bold">
                  {formatPrice(price, offers!.priceCurrency!)}
                </p>
              </div>
              <p class="text-sm text-base-300 font-bold">{installments}</p>
            </div>
            {!!colorsList?.length && (
              <div id="colors" class="flex items-center">
                <p class="text-base-300 font-bold">
                  {colorsList?.[0]?.value?.toUpperCase()}
                </p>
                <span
                  class="ml-2 block bg-red-500 w-[25px] h-[30px] rounded-xl border-2 border-gray-300"
                  style={{
                    background: colors && colors?.length > 1
                      ? `linear-gradient(${colors.join(", ")})`
                      : colors?.[0],
                  }}
                />
              </div>
            )}
          </div>

          {/* Choose Lens & Add To Cart - Mobile */}
          <div class="fixed bottom-0 left-0 w-full p-4 z-10 bg-white border border-gray-600 lg:hidden">
            <div class="mt-2 lg:max-w-[80%] w-full mx-auto">
              <a href={chooseLensUrl}>
                <button class="text-white bg-orange-500 rounded-[9px] uppercase btn w-full py-2 text-sm min-h-[50px] hover:text-orange-500 hover:bg-white hover:border-orange-500">
                  Escolher as Lentes
                </button>
              </a>
            </div>
            <div class="mt-4 lg:max-w-[80%] w-full flex items-center mx-auto">
              <button class="bg-white text-orange-500 border-orange-500 border rounded-[9px] uppercase btn w-full py-2 text-sm min-h-[50px] hover:bg-orange-500 hover:text-white hover:border-orange-500">
                Comprar Armação
              </button>
            </div>
          </div>

          {/* Product Info - Desktop */}
          <div class="hidden lg:block pl-4 pr-4 w-full max-w-[480px]">
            <ProductInfo page={page} />
          </div>
        </div>
        <SliderJS rootId={id} borderedDots={true}></SliderJS>
      </>
    );
  }

  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
  return (
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-[50vw_25vw] sm:grid-rows-1 sm:justify-center">
      {/* Image slider */}
      <ul class="carousel carousel-center gap-6">
        {[images[0], images[1] ?? images[0]].map((img, index) => (
          <li class="carousel-item min-w-[100vw] sm:min-w-[24vw] min-h-[290px]">
            <Image
              class="max-h-[290px] h-max"
              sizes="(max-width: 640px) 100vw, 24vw"
              src={img.url!}
              alt={img.alternateName}
              width={290}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </li>
        ))}
      </ul>

      {/* Product Info */}
      <div class="px-4 sm:pr-0 sm:pl-6">
        <ProductInfo page={page} />
      </div>
    </div>
  );
}

export default Details;
