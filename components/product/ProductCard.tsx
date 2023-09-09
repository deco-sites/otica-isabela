import Image from "deco-sites/std/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Stopwatch from "deco-sites/otica-isabela/islands/Stopwatch.tsx";
import ToExperimentButton from "deco-sites/otica-isabela/islands/ToExperimentButton.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnClick } from "$store/sdk/analytics.tsx";
import { getAvailableColors } from "deco-sites/otica-isabela/sdk/getVariantColors.ts";
import { getDevice } from "deco-sites/otica-isabela/sdk/getDevice.ts";
import { getDescriptions } from "deco-sites/otica-isabela/sdk/getDescriptions.ts";
import { Size } from "deco-sites/otica-isabela/components/product/Stopwatch.tsx";

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
  /** Preload card image */
  preload?: boolean;
  carouselImage?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
  isStopwatchEnabled?: boolean;
  priceValidUntil?: Date;
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
  priceValidUntil,
}: Props) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    additionalProperty,
  } = product;

  const id = `product-card-${productID}`;

  const [front] = images ?? [];

  const { highPrice: listPrice, lowPrice: price } = offers ?? {};

  const discount = Math.ceil(
    (((listPrice ?? 0) - (price ?? 0)) / (listPrice ?? 0)) * 100,
  );

  const description = getDescriptions(additionalProperty!);
  const availableColors = getAvailableColors(product);
  const device = getDevice();
  const experimenterImage = additionalProperty?.find(
    (prop) => prop.propertyID === "experimentador",
  )?.value;

  return (
    <div
      id={id}
      class="card card-compact w-full text-center h-full"
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
      {isStopwatchEnabled && priceValidUntil && (
        <Stopwatch targetDate={priceValidUntil!} size={Size.card} />
      )}

      <figure class="relative" style={{ aspectRatio: `${306} / ${170}` }}>
        {/* Product Images */}
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="contents"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={306}
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
        </a>

        {discount > 0 && (
          <span class="absolute right-0 bottom-0 bg-[#d92027] gap-x-[2px] rounded text-sm flex justify-center items-center text-white p-[2px] ">
            <Icon id="ArrowDown" width={9} height={9} />-{discount}%
          </span>
        )}
      </figure>

      {/* Prices & Name */}
      <div class="flex-auto flex flex-col p-1 gap-3 lg:gap-4">
        {/* Name & Description */}
        <div class="flex flex-col gap-0">
          <h2 class=" font-semibold text-black   text-base lg:text-lg min-h-[57px] mb-6  ">
            {name}
          </h2>

          <p class="text-sm font-normal text-base-200 line-clamp-3 min-h-[42px] mb-2 ">
            {description?.map(
              (property, index) =>
                `${property?.value}: ${property?.name}mm ${
                  index < description.length - 1 ? "/" : ""
                } `,
            )}
          </p>
        </div>

        {/* Available Colors */}
        <ul class="flex items-center justify-center gap-2 w-full h-5 ">
          {availableColors?.map(({ name, url, unitCodes }) => (
            <li>
              <a href={url} aria-label={name} title={name}>
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
        <div class="flex flex-col gap-2">
          <div class="flex flex-row  justify-center items-center gap-3  ">
            {discount > 0 && (
              <div class="line-through font-semibold text-sm  text-red-500 lg:text-base ">
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </div>
            )}
            <div class=" text-blue-200 text-xl lg:text-[28px] font-bold">
              {formatPrice(price, offers!.priceCurrency!)}
            </div>
          </div>
        </div>

        {/* Experimenter */}
        <ToExperimentButton device={device} image={experimenterImage!} />
      </div>
    </div>
  );
}

export default ProductCard;
