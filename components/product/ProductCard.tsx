import { useState } from "preact/hooks";
import ProductCardImage from "$store/components/product/ProductCardImage.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Stopwatch from "$store/islands/Stopwatch.tsx";
import ToExperimentButton from "$store/islands/ToExperimentButton.tsx";
import { SendEventOnClick } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { getDescriptions } from "$store/sdk/getDescriptions.ts";
import { getAvailableColors } from "$store/sdk/getVariantColors.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useId } from "$store/sdk/useId.ts";
import type { AuthData } from "$store/packs/types.ts";
import type { LoaderReturnType } from "$live/types.ts";
import WishlistButton from "$store/components/wishlist/WishlistButton.tsx";

interface Props {
  product: Product;
  preload?: boolean;
  carouselImage?: boolean;
  itemListName?: string;
  isStopwatchEnabled?: boolean;
  isSliderEnabled?: boolean;
  customer?: LoaderReturnType<AuthData>;
  hideExperiment?: boolean;
}

function ProductCard({
  product,
  preload,
  itemListName,
  isStopwatchEnabled,
  isSliderEnabled,
  customer,
  hideExperiment,
}: Props) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    additionalProperty,
    isVariantOf,
  } = product;
  const [hoverImage, setHoverImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<
    number | null
  >(null);

  const imageContainerId = useId();
  const id = `product-card-${productID}`;

  const [front] = images ?? [];
  const { highPrice: listPrice, lowPrice: price } = offers ?? {};
  const priceValidUntil = offers?.offers.at(0)?.priceValidUntil;
  const discount = Math.ceil(
    (((listPrice ?? 0) - (price ?? 0)) / (listPrice ?? 0)) * 100,
  );
  const promotionFlag = additionalProperty?.find(
    (prop) => prop.propertyID === "flag",
  )?.value;
  const experimenterImage = additionalProperty?.find(
    (prop) => prop.propertyID === "experimentador",
  )?.value;

  const description = getDescriptions(additionalProperty!);
  const availableColors = getAvailableColors(product);
  const variantNames = isVariantOf?.hasVariant.map(({ name }) => name) ?? [];
  const variantImages =
    isVariantOf?.hasVariant.map(({ image }) => image?.[0].url) ??
      [];

  const getVariantImages =
    isVariantOf?.hasVariant.map(({ image }) =>
      image?.map((media) => media.url)
    ) ??
      [];

  const handleColorClick = (colorName: string) => {
    const index = variantNames.indexOf(colorName);
    if (index !== -1 && variantImages[index]) {
      setSelectedImage(variantImages[index]);
      setSelectedVariantIndex(index);
      setHoverIndex(null);
    }
  };

  const handleColorHover = (colorName: string) => {
    const index = variantNames.indexOf(colorName);

    if (index !== -1 && variantImages[index]) {
      setHoverImage(variantImages[index]);
    }
  };

  const handleColorLeave = () => setHoverImage(null);

  const getCurrentImages = () => {
    if (
      selectedVariantIndex !== null && getVariantImages[selectedVariantIndex]
    ) {
      return getVariantImages[selectedVariantIndex];
    }
    return images?.map((img) => img.url) || [];
  };

  const handleImageHover = (index: number) => {
    const currentImages = getCurrentImages();
    if (currentImages.length > 1) {
      const nextIndex = (index + 1) % currentImages.length;
      setHoverImage(currentImages[nextIndex]);
      setHoverIndex(index);
    }
  };

  const handleImageLeave = () => {
    setHoverImage(null);
    setHoverIndex(null);
  };

  const getDisplayImage = (index: number = 0) => {
    const currentImages = getCurrentImages();

    if (hoverIndex === index && currentImages.length > 1) {
      const nextIndex = (index + 1) % currentImages.length;
      return currentImages[nextIndex];
    }

    if (selectedVariantIndex !== null) {
      return hoverImage || selectedImage || currentImages[index] || front?.url!;
    }

    return hoverImage || selectedImage || front?.url!;
  };

  const renderSlider = () => (
    <>
      <Slider class="carousel carousel-center w-full scrollbar-none gap-6 min-h-[170px] relative">
        {getCurrentImages().map((imageUrl, index) => {
          if (imageUrl === "/Content/assets/images/capa-video.jpg") return null;
          return (
            <Slider.Item
              index={index}
              key={index}
              class="carousel-item lg:!w-full max-lg:max-h-[197.77px]"
            >
              <div
                onMouseEnter={() => handleImageHover(index)}
                onMouseLeave={handleImageLeave}
                class="hidden lg:block"
              >
                <ProductCardImage
                  url={getDisplayImage(index)}
                  alt={images?.[index]?.alternateName ||
                    `Product image ${index + 1}`}
                  preload={preload && index === 0}
                  discount={discount}
                  promotion={index === 0 ? promotionFlag : ""}
                />
              </div>

              <div
                onMouseEnter={() => handleImageHover(index)}
                onMouseLeave={handleImageLeave}
                class="lg:hidden"
              >
                <ProductCardImage
                  url={imageUrl}
                  alt={images?.[index]?.alternateName ||
                    `Product image ${index + 1}`}
                  preload={preload && index === 0}
                  discount={discount}
                  promotion={index === 0 ? promotionFlag : ""}
                />
              </div>
            </Slider.Item>
          );
        })}
        {customer && (
          <div class="absolute top-0 left-0 z-30">
            <WishlistButton productID={productID} customer={customer} />
          </div>
        )}
      </Slider>
      <SliderJS rootId={`product-card-${productID}-${imageContainerId}`} />
    </>
  );

  const renderStaticImage = () => (
    <div
      class="relative"
      onMouseEnter={() => handleImageHover(0)}
      onMouseLeave={handleImageLeave}
    >
      <ProductCardImage
        url={getDisplayImage()}
        alt={front?.alternateName!}
        preload={preload}
        discount={discount}
        promotion={promotionFlag}
      />
      {customer && (
        <div class="absolute top-0 left-0 z-30">
          <WishlistButton productID={productID} customer={customer} />
        </div>
      )}
    </div>
  );

  const renderColorSwatches = () => (
    <ul class="flex flex-wrap gap-y-1 gap-x-1 items-center w-[90%] h-4 relative max-lg:ml-5">
      {availableColors
        .sort((a, b) => (a.name === name ? -1 : b.name === name ? 1 : 0))
        .map(({ name, url, unitCodes }) => {
          const isSelected = selectedImage
            ? variantNames[variantImages.indexOf(selectedImage)] === name
            : name === product.name;

          return (
            <li
              onClick={() => handleColorClick(name)}
              onMouseEnter={() => handleColorHover(name)}
              onMouseLeave={handleColorLeave}
              class={`group cursor-pointer ${
                isSelected
                  ? "ring-1 ring-offset-2 ring-[#aaa] rounded-full mr-1"
                  : ""
              }`}
            >
              <a
                aria-label={name}
                onClick={(e) => e.preventDefault()}
              >
                <div
                  style={{
                    background: unitCodes.length > 1
                      ? `linear-gradient(${unitCodes.join(", ")})`
                      : unitCodes[0],
                  }}
                  class="mask mask-circle h-4 w-4 bg-secondary hover:scale-125 transition-transform"
                />
              </a>
              <div class="absolute w-full z-20 bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {name}
              </div>
            </li>
          );
        })}
    </ul>
  );

  const renderExperimentButton = () =>
    experimenterImage && !hideExperiment
      ? <ToExperimentButton image={experimenterImage} />
      : (
        <button class="border-[1px] border-black hover:border-slot-primary-500 text-grayscale-700 hover:text-slot-primary-500 py-[5px] max-lg:py-1 px-4 max-lg:px-3 rounded-[17px] text-center">
          <a
            href={url}
            class="w-full font-semibold flex justify-end hover:underline text-sm max-lg:text-xs"
          >
            {product.category && product?.category.includes("Lentes de Contato")
              ? "Ver Produto"
              : "Experimentar"}
          </a>
        </button>
      );

  return (
    <div
      id={id}
      class="card card-compact w-full lg:px-1"
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item",
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />

      <a
        href={url}
        aria-label="view product"
        class="relative"
        id={`product-card-${productID}-${imageContainerId}`}
      >
        {isStopwatchEnabled && priceValidUntil && (
          <Stopwatch targetDate={priceValidUntil} type="card" />
        )}
        {isSliderEnabled ? renderSlider() : renderStaticImage()}
      </a>

      <div class="flex flex-col items-center mt-[10px]">
        <a href={url} aria-label="view product" class="contents">
          <div class="flex flex-col w-full">
            <p class="text-black text-base leading-none h-[33px]">
              {name}
            </p>
            <div class="min-h-[25px] my-[10px]">
              {description.length > 0 && (
                <p class="text-xs font-normal leading-none text-base-200 line-clamp-3">
                  {description.map(
                    (property, index) =>
                      `${property?.name}: ${property?.value} ${
                        index < description.length - 1 ? "/ " : ""
                      }`,
                  )}
                </p>
              )}
            </div>
          </div>
        </a>

        <div class="w-full flex justify-normal items-center my-[10px]">
          <a href={url} aria-label="view product" class="contents">
            <div class="flex w-full justify-between">
              <div class="flex flex-row justify-center items-center gap-2 max-lg:ml-5">
                {discount > 0 && (
                  <span class="line-through font-semibold text-[#6F6F6F] text-sm">
                    {formatPrice(listPrice, offers!.priceCurrency!)}
                  </span>
                )}
                <span class="text-blue-200 text-lg font-bold">
                  {formatPrice(price, offers!.priceCurrency!)}
                </span>
              </div>
              {discount > 0 && (
                <span class="text-red-500 font-semibold text-sm flex justify-center items-center max-lg:mr-10">
                  {discount}% OFF
                </span>
              )}
              {availableColors.length === 0 && renderExperimentButton()}
            </div>
          </a>
        </div>

        <div class="w-full flex items-center justify-between">
          {availableColors.length > 0 && renderColorSwatches()}
          {availableColors.length > 0 && renderExperimentButton()}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
