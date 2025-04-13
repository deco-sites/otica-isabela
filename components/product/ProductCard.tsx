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
import Button from "$store/components/ui/Button.tsx";
import { AuthData } from "$store/packs/types.ts";
import type { LoaderReturnType } from "$live/types.ts";
import WishlistButton from "$store/components/wishlist/WishlistButton.tsx";

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
      class="card card-compact w-full lg:px-1"
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
        href={url}
        aria-label="view product"
        class="relative"
        id={`product-card-${productID}-${imageContainerId}`}
      >
        {isStopwatchEnabled && priceValidUntil && (
          <Stopwatch targetDate={priceValidUntil} type="card" />
        )}
        {isSliderEnabled
          ? (
            <>
              <Slider class="carousel carousel-center w-full scrollbar-none gap-6 min-h-[170px] relative">
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
                {customer && (
                  <div class="absolute top-0 left-0 z-30">
                    <WishlistButton productID={productID} customer={customer} />
                  </div>
                )}
              </Slider>

              <SliderJS
                rootId={`product-card-${productID}-${imageContainerId}`}
              />
            </>
          )
          : (
            <div class="relative">
              <ProductCardImage
                url={front.url!}
                alt={front.alternateName!}
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
          )}
      </a>

      {/* Name & Description */}
      <div class="flex flex-col items-center mt-[10px]">
        <a href={url} aria-label="view product" class="contents">
          <div class="flex flex-col">
            <p class="font-semibold text-black text-base leading-none h-[33px]">
              {name}
            </p>
            {description.length
              ? (
                <div class="min-h-[25px] my-[10px]">
                  <p class="text-xs font-normal leading-none text-base-200 line-clamp-3 ">
                    {description?.map(
                      (property, index) =>
                        `${property?.value}: ${property?.name}mm ${
                          index < description.length - 1 ? "/ " : ""
                        }`,
                    )}
                  </p>
                </div>
              )
              : null}
          </div>
        </a>

        <div class="w-full flex items-center justify-between">
          {/* Available Colors */}
          {availableColors.length
            ? (
              <ul class="flex flex-wrap gap-y-1 gap-x-1 items-center w-[90%] h-4 relative">
                {availableColors
                  .slice()
                  .sort((a, b) => (a.name === product.name
                    ? -1
                    : b.name === product.name
                    ? 1
                    : 0)
                  )
                  .map(({ name, url, unitCodes }) => (
                    <li
                      key={unitCodes.join()}
                      class={`group ${
                        name === product.name
                          ? "ring-1 ring-offset-2 ring-[#aaa] rounded-full mr-1"
                          : ""
                      }`}
                    >
                      <a href={`/produto${url}`} aria-label={name}>
                        <div
                          style={{
                            background: unitCodes.length > 1
                              ? `linear-gradient(${unitCodes.join(", ")})`
                              : `${unitCodes[0]}`,
                          }}
                          class={`
                mask mask-circle h-4 w-4 bg-secondary hover:scale-125 transition-transform
              `}
                        />
                      </a>
                      <div class="absolute w-full z-20 bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {name}
                      </div>
                    </li>
                  ))}
              </ul>
            )
            : null}

          {experimenterImage && !hideExperiment
            ? <ToExperimentButton image={experimenterImage} />
            : (
              <a href={url} class="w-full flex justify-end">
                <Button class="text-black bg-transparent rounded-[15px] btn min-h-[unset] h-[unset] w-fit px-4 py-1.5 text-sm hover:text-white hover:bg-black border border-black">
                  Ver Produto
                </Button>
              </a>
            )}
        </div>
        {/* Price & Discount */}
        <div class="w-full flex justify-normal items-center my-[10px]">
          <a href={url} aria-label="view product" class="contents">
            <div class="flex flex-row  justify-center items-center gap-3 ">
              {discount > 0 && (
                <span class="line-through font-semibold  text-red-500 text-sm">
                  {formatPrice(listPrice, offers!.priceCurrency!)}
                </span>
              )}
              <span class=" text-blue-200 text-base font-bold">
                {formatPrice(price, offers!.priceCurrency!)}
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
