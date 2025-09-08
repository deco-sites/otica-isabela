import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/components/ui/SliderJS.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import type { Props } from "$store/components/product/ProductDetails.tsx";
import ToExperimentButton from "$store/components/product/ToExperimentButton.tsx";
import ProductInfo from "$store/components/product/product-details/ProductInfo.tsx";
import Ratings from "$store/components/product/product-details/Ratings.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import WishlistButton from "$store/components/wishlist/WishlistButton.tsx";
import ShareButton from "$store/islands/ShareButton.tsx";
import Image from "apps/website/components/Image.tsx";
import Video from "apps/website/components/Video.tsx";
import { useId } from "$store/sdk/useId.ts";

import CartModalMobile from "$store/components/ui/CartModalMobile.tsx";
import { BestOffersHeader } from "$store/components/ui/BestOffersHeader.tsx";
import ProductInfoColors from "site/islands/ProductInfoColors.tsx";

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

function Details({
  page,
  promotions,
  buttonByCategory,
  stepButtonByCategory,
  customer,
  mobileOptions,
  priceValidUntil,
}: Props) {
  const { product, breadcrumbList } = page!;
  const { name, productID, offers, additionalProperty, url, sku } = product;

  // Busca a imagem dos acessórios inclusos
  // const accessoriesImage = additionalProperty?.find(
  //   (prop) =>
  //     prop.propertyID === "panel" && prop.name === "Acessórios Inclusos",
  // )?.value;

  // Converte HTML para extrair a URL da imagem (se existir)
  // const accessoriesImagePath = accessoriesImage?.match(/src="([^"]+)"/)?.[1] ||

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
  const chooseLensUrl = `/passo-a-passo${url?.split("/produto")[1]}`;
  const experimenterImage = additionalProperty?.find(
    (prop) => prop.propertyID === "experimentador",
  )?.value;
  // const colorsList = additionalProperty?.filter(
  //   (prop) => prop.propertyID === "color",
  // );
  // const colors = colorsList?.map(({ unitCode }) => unitCode);
  // const colorsName = colorsList?.map(({ value }) => value);
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
      acc[curr.category.toLowerCase()] = curr.label;
      return acc;
    },
    {},
  );
  const stepLabels = stepButtonByCategory?.reduce(
    (acc: { [key: string]: string }, curr) => {
      acc[curr.category.toLowerCase()] = curr.label;
      return acc;
    },
    {},
  );

  const promotionFlag = additionalProperty?.find(
    (prop) => prop.propertyID === "flag",
  )?.value?.toLowerCase();

  const promotion = promotions?.find(
    (current) => current.label.toLowerCase() === promotionFlag,
  );

  const rating = additionalProperty?.find(
    (prop) => prop.propertyID === "rating",
  )?.value;

  const isAllowedToAddLens = additionalProperty?.some(
    (prop) => prop.propertyID === "isAllowedToAddLens",
  );

  const isLensWithoutPrescription = additionalProperty?.find(
    (prop) => prop.propertyID === "isLensWithoutPrescription",
  )?.value;

  const lensDescription = additionalProperty?.find(
    (prop) => prop.propertyID === "lensDescription",
  )?.value;

  const ratingValue = rating ? parseFloat(rating) : 0;
  const isLentes = product?.category?.includes("Lentes de Contato");

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
        class="block mb-[10px] text-center md:text-left px-3 lg:px-0"
      >
        <Breadcrumb itemListElement={breadcrumbList?.itemListElement} />
      </div>

      {/* Header - Mobile */}
      <div
        id={`experimentador-section-${id}`}
        class="flex items-center justify-between lg:hidden"
      >
        {/* Discount Span - Mobile (Header) */}
        {discount > 0 && discountTagLocation === "Header" && (
          <span class="flex font-bold bg-[#d92027] gap-x-1 rounded text-sm lg:flex justify-center items-center text-white p-2.5 ">
            <Icon id="ArrowDown" width={9} height={9} />-{discount}%
          </span>
        )}
        <div class="flex items-center">
          <ShareButton link={url!} />
          <WishlistButton productID={productID} customer={customer} />
        </div>

        {/* Ratings - Mobile (Header) */}
        {!!ratingValue &&
          starsLocation === "Header" &&
          discountTagLocation !== "Header" && (
          <a href="#product-review" aria-label="Veja as avaliações!">
            <Ratings ratingValue={ratingValue} />
          </a>
        )}
        {!isLentes && experimenterImage
          ? (
            <ToExperimentButton
              image={experimenterImage!}
              variant="filled"
              size="tiny"
            />
          )
          : null}
      </div>

      {/* Product Name - Mobile (Header) */}
      {nameLocation === "Header" && (
        <div class="mt-4 mb-4 text-center px-8 lg:hidden">
          <span class="font-outfit font-normal text-lg">{name}</span>
          {lensDescription && (
            <span class="font-outfit font-medium text-sm">
              {lensDescription}
            </span>
          )}

          {/* Exibir imagem dos acessórios somente se existir */}
          {
            /* {accessoriesImagePath && (
            <div class="mt-4 text-center">
              <Image
                src={accessoriesImagePath}
                alt="Acessórios Inclusos"
                width={350}
                height={350}
                loading="lazy"
              />
              <p class="text-sm text-gray-700 mt-2">teste</p>{" "}
            </div>
          )} */
          }
        </div>
      )}

      {/* Image Slider - Mobile & Desktop */}
      <div id={id} class="lg:flex lg:justify-center lg:gap-12">
        <div class="relative flex flex-col items-center text-center w-full mt-2 lg:mt-0">
          <div class="relative lg:w-full">
            <div class="relative flex flex-col-reverse lg:justify-end lg:flex-row gap-2">
              <ul
                id="image-dots"
                class={`carousel lg:flex-col w-fit carousel-center lg:mt-2 flex lg:max-w-[540px] gap-1 lg:gap-2 mx-auto lg:mx-0 ${
                  showProductTumbnails ? "" : "max-lg:hidden"
                }`}
              >
                {images.map((img, index) => (
                  <li class="min-w-[20%] flex items-center px-1 bg-white border-black">
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
              <div class="relative">
                {priceValidUntil && (
                  <BestOffersHeader
                    priceValidUntil={priceValidUntil!}
                    page="details"
                  />
                )}
                <Slider
                  id={`product-images-${id}`}
                  class="carousel carousel-center gap-6 bg-white w-[95vw] sm:w-[30vw] md:w-[60vw] lg:w-[540px]"
                >
                  {images.map((img, index) => (
                    <Slider.Item
                      index={index}
                      class="carousel-item lg:!w-full items-center"
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
              </div>
              <div class="flex lg:hidden items-center justify-between absolute left-1/2 top-[20vh] -translate-x-1/2 -translate-y-1/2 w-[98%] pointer-events-none">
                <Slider.PrevButton class="size-8 rounded group flex justify-center items-center disabled:opacity-0 duration-200 pointer-events-auto">
                  <Icon
                    id="chevron-right"
                    class="rotate-180 text-slot-primary-500 transition-colors"
                  />
                </Slider.PrevButton>
                <Slider.NextButton class="size-8 rounded group flex justify-center items-center disabled:opacity-0 duration-200 pointer-events-auto">
                  <Icon
                    id="chevron-right"
                    class="text-slot-primary-500 transition-colors"
                  />
                </Slider.NextButton>
              </div>

              {/* Discount Span - Mobile (Image) & Desktop */}
              {discount > 0 && discountTagLocation !== "Header" && (
                <span
                  class={`absolute text-red-500 font-semibold text-sm flex justify-center items-center
                  right-4 lg:right-2.5 lg:bottom-2 lg:top-auto ${
                    mobileOptions!.discountTagLocation === "Image Bottom"
                      ? "bottom-20"
                      : "top-2"
                  }`}
                >
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Product Name - Mobile (Bottom) */}
            {nameLocation === "Bottom" && (
              <div class="mt-4 mb-4 text-center px-8 lg:hidden flex flex-col">
                <span class="font-outfit font-normal text-lg">{name}</span>
                {lensDescription && (
                  <span class="font-outfit font-medium text-sm">
                    {lensDescription}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Buy with lens label */}
          {promotion && (
            <div class="bg-[#a8e3ff] rounded-[2.5px] text-[13px] text-center p-[2.5px] my-[10px] w-[90%] lg:hidden leading-6">
              {promotion.flagText.replace(
                "%value",
                formatPrice(price, offers!.priceCurrency!)!,
              )}
            </div>
          )}
        </div>

        {/* Ratings - Mobile (Bottom) */}
        {!!ratingValue &&
          (starsLocation === "Bottom" || discountTagLocation === "Header") && (
          <div class="flex flex-col items-center my-8 lg:hidden">
            <a
              href="#product-review"
              class="text-center"
              aria-label="Veja as avaliações!"
            >
              <Ratings ratingValue={ratingValue} />
              <p class="text-lg font-bold">Veja as avaliações</p>
            </a>
          </div>
        )}

        {/* Price & Color - Mobile */}
        <div class="lg:hidden px-3 flex items-center justify-between mt-4">
          <div id="price-mobile-container">
            <ProductInfoColors page={page} />

            <div id="price-mobile-content" class="mt-2">
              {discount > 0 && (
                <span class="mt-2 line-through font-semibold text-sm  text-red-500 lg:text-base">
                  {formatPrice(listPrice, offers!.priceCurrency!)}
                </span>
              )}
              <p class="mt-1 text-blue-200 text-[27px] font-bold">
                {formatPrice(price, offers!.priceCurrency!)}
              </p>
            </div>
            <p class="text-sm text-base-300 font-bold">{installments}</p>
          </div>
        </div>

        {/* Choose Lens & Add To Cart - Mobile */}
        <CartModalMobile
          chooseLensUrl={chooseLensUrl}
          addToCard={addToCard}
          labels={labels}
          stepLabels={stepLabels}
          isLentes={!!isLentes}
          currentCategory={currentCategory!}
          isAllowedToAddLens={!!isAllowedToAddLens}
          isLensWithoutPrescription={isLensWithoutPrescription!}
          observableElement={displayModalAfter === "Header"
            ? { type: "Tag", value: "header" }
            : {
              type: "Id",
              value: `${
                displayModalAfter
                  .toLowerCase()
                  .replace(/\s+/g, "-")
              }-${id}`,
            }}
        />

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
      </div>
      <SliderJS rootId={id} />
    </>
  );
}

export default Details;
