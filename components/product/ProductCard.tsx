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
import { useId } from "deco-sites/otica-isabela/sdk/useId.ts";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Pré carregar imagem do card */
  preload?: boolean;
  carouselImage?: boolean;
  /** @description usado para eventos do analytics */
  itemListName?: string;
  isStopwatchEnabled?: boolean;
  isSliderEnabled?: boolean;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

function ProductCard({
  product,
  preload,
  itemListName,
  isStopwatchEnabled,
  isSliderEnabled,
}: Props) {
  const imageContainerId = useId();

  const {
    url,
    productID,
    name,
    image: images,
    offers,
    additionalProperty,
  } = product;

  const promotionFlag = additionalProperty?.find(
    (prop) => prop.propertyID === "flag",
  )?.value;
  const id = `product-card-${productID}`;
  const priceValidUntil = product.offers?.offers.at(0)?.priceValidUntil;

  const [front] = images ?? [];

  const { highPrice: listPrice, lowPrice: price } = offers ?? {};

  const discount = Math.ceil(
    (((listPrice ?? 0) - (price ?? 0)) / (listPrice ?? 0)) * 100,
  );

  const description = getDescriptions(additionalProperty!);
  const availableColors = getAvailableColors(product);
  const experimenterImage = additionalProperty?.find(
    (prop) => prop.propertyID === "experimentador",
  )?.value;

  return (
    <div
      id={id}
      class="card card-compact w-full text-center lg:px-[30px]"
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
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

      {/* Stopwatch */}
      <a
        href={url && relative(url)}
        aria-label="view product"
        id={`product-card-${productID}-${imageContainerId}`}
      >
        {isStopwatchEnabled && priceValidUntil && (
          <Stopwatch targetDate={priceValidUntil} type="card" />
        )}
        {isSliderEnabled
          ? (
            <>
              <Slider class="carousel carousel-center w-full scrollbar-none gap-6 min-h-[170px]">
                {images?.map((image, index) => (
                  <Slider.Item
                    index={index}
                    key={index}
                    class="carousel-item w-full"
                  >
                    <ProductCardImage
                      url={image.url!}
                      alt={image.alternateName!}
                      preload={preload && index === 0}
                      discount={discount}
                      promotion={index === 0 ? promotionFlag : ""}
                    />
                  </Slider.Item>
                ))}
              </Slider>
              <SliderJS rootId={imageContainerId} />
            </>
          )
          : (
            <ProductCardImage
              url={front.url!}
              alt={front.alternateName!}
              preload={preload}
              discount={discount}
              promotion={promotionFlag}
            />
          )}
      </a>

      {/* Name & Description */}
      <div class="flex flex-col items-center mt-[10px]">
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="contents"
        >
          <div class="flex flex-col">
            <h4 class="font-semibold text-black mb-6 text-lg leading-none h-[50px]">
              {name}
            </h4>
            <div class="lg:min-w-[306px] min-h-[42px] mb-[10px]">
              <p class="text-sm font-normal leading-none text-base-200 line-clamp-3 ">
                {description?.map(
                  (property, index) =>
                    `${property?.value}: ${property?.name}mm ${
                      index < description.length - 1 ? "/ " : ""
                    }`,
                )}
              </p>
            </div>
          </div>
        </a>

        {/* Available Colors */}
        <ul class="flex items-center justify-center mb-[10px] w-[90%] h-5">
          {availableColors?.map(({ name, url, unitCodes }) => (
            <li key={unitCodes}>
              <a href={`produto${url}`} aria-label={name} title={name}>
                <div
                  style={{
                    background: unitCodes.length > 1
                      ? `linear-gradient(${unitCodes.join(", ")})`
                      : `${unitCodes[0]}`,
                  }}
                  class="mask mask-circle h-5 w-5 bg-secondary mx-2"
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Price & Discount */}
        <div class="flex justify-center items-center mb-[10px]">
          <a
            href={url && relative(url)}
            aria-label="view product"
            class="contents"
          >
            <div class="flex flex-row  justify-center items-center gap-3 ">
              {discount > 0 && (
                <span class="line-through font-semibold  text-red-500 text-base">
                  {formatPrice(listPrice, offers!.priceCurrency!)}
                </span>
              )}
              <span class=" text-blue-200 text-[28px] font-bold">
                {formatPrice(price, offers!.priceCurrency!)}
              </span>
            </div>
          </a>
        </div>

        <ToExperimentButton image={experimenterImage!} />
      </div>
    </div>
  );
}

export default ProductCard;
