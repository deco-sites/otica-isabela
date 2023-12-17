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
import AddToCartButton from "deco-sites/otica-isabela/islands/AddToCartButton.tsx";
import ChooseLensButton from "deco-sites/otica-isabela/islands/ChooseLensButton.tsx";
import ShareButton from "deco-sites/otica-isabela/islands/ShareButton.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import Video from "deco-sites/std/components/Video.tsx";
import { useId } from "preact/hooks";

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

function Details({ page, promotions, buttonByCategory, customer }: Props) {
  const { product, breadcrumbList } = page!;
  const { name, productID, offers, additionalProperty, url, sku } = product;
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
  const addToCard = {
    idProduct: Number(productID),
    sku: Number(sku),
    price: price!,
    name: name!,
  };
  const currentCategory = breadcrumbList?.itemListElement[0].name;
  const labels = buttonByCategory?.reduce(
    (acc: { [key: string]: string }, curr) => {
      acc[curr.category] = curr.label;
      return acc;
    },
    {},
  );

  const promotionFlag = additionalProperty?.find(
    (prop) => prop.propertyID === "flag",
  )?.value;

  const promotion = promotions?.find(
    (current) => current.label === promotionFlag,
  );

  const rating = additionalProperty?.find(
    (prop) => prop.propertyID === "rating",
  )?.value;

  const ratingValue = rating ? parseFloat(rating) : 0;

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
      <div
        id="breadcrumb"
        class="block mb-[20px] lg:mb-[40px] text-center md:text-left"
      >
        <Breadcrumb itemListElement={breadcrumbList?.itemListElement} />
      </div>

      {/* Header - Mobile */}
      <div
        id="pdp-mobile-header-container"
        class="flex items-center justify-between mx-3 mt-4 lg:hidden"
      >
        {discount > 0 && (
          <span class="flex font-bold bg-[#d92027] gap-x-1 rounded text-sm lg:flex justify-center items-center text-white p-2.5 ">
            <Icon id="ArrowDown" width={9} height={9} />-{discount}%
          </span>
        )}
        <div class="flex items-center">
          <ShareButton link={url!} />
          <WishlistButton productID={productID} customer={customer} />
        </div>
        <ToExperimentButton
          image={experimenterImage!}
          variant="filled"
          size="tiny"
        />
      </div>

      {/* Product Name - Mobile */}
      <div class="mt-4 text-center px-8 lg:hidden">
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
                  class="carousel-item w-full items-center"
                >
                  {img.additionalType === "video"
                    ? (
                      <Video
                        src={img.url}
                        loading="lazy"
                        width={350}
                        height={350}
                        class="w-full"
                        controls
                      />
                    )
                    : (
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
            {discount > 0 && (
              <span class="hidden absolute right-0 bottom-2 bg-[#d92027] gap-x-[2px] rounded text-sm lg:flex justify-center items-center text-white p-[2px] ">
                <Icon id="ArrowDown" width={9} height={9} />-{discount}%
              </span>
            )}
          </div>

          {/* Buy with lens label */}
          {promotion && (
            <div class="bg-[#a8e3ff] rounded-[2.5px] text-[13px] text-center p-[2.5px] my-[10px] w-[90%] lg:hidden leading-6">
              {promotion.flagText.replace("%value", price!.toString())}
            </div>
          )}
          {/* Dots - Mobile & Desktop */}
          <ul
            id="image-dots"
            class="w-[90%] lg:mt-2 flex overflow-auto lg:max-w-[540px] gap-1"
          >
            {images.map((img, index) => (
              <li class="min-w-[92px] flex items-center px-1 bg-white border-black">
                <Slider.Dot index={index}>
                  <Image
                    class="group-disabled:border-base-300"
                    width={92}
                    height={92}
                    src={img.additionalType === "video"
                      ? img?.image?.[0].url!
                      : img.url!}
                    alt={img.alternateName}
                    loading="lazy"
                  />
                </Slider.Dot>
              </li>
            ))}
          </ul>
        </div>

        {/* Ratings - Mobile */}
        {!!ratingValue && (
          <div class="flex flex-col items-center my-8 lg:hidden">
            <a href="#product-review" class="text-center">
              <Ratings ratingValue={ratingValue} />
              <p class="text-lg font-bold">Veja as avaliações</p>
            </a>
          </div>
        )}

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
              <ChooseLensButton {...addToCard} />
            </a>
          </div>
          <div class="mt-4 lg:max-w-[80%] w-full flex items-center mx-auto">
            <AddToCartButton
              {...addToCard}
              label={labels?.[currentCategory!]}
            />
          </div>
        </div>

        {/* Product Details - Desktop */}
        <div class="hidden lg:block pl-4 pr-4 w-full max-w-[480px]">
          <ProductInfo
            page={page}
            promotions={promotions}
            buttonByCategory={buttonByCategory}
            customer={customer}
          />
        </div>
      </div>
      <SliderJS rootId={id} />
    </>
  );
}

export default Details;
