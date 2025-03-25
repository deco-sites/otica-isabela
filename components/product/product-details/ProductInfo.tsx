import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import type { Promotion } from "site/components/product/ProductDetails.tsx";
import ToExperimentButton from "site/components/product/ToExperimentButton.tsx";
import { sendFBEvent } from "site/components/ultils/facebook.ts";
import Ratings from "site/components/product/product-details/Ratings.tsx";
import WishlistButton from "site/components/wishlist/WishlistButton.tsx";
import ChooseLensButton from "site/islands/ChooseLensButton.tsx";
import Stopwatch from "site/islands/Stopwatch.tsx";
import { AuthData } from "site/packs/types.ts";
import { LoaderReturnType } from "deco/mod.ts";

interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  promotions?: Promotion[];
  labels?: Record<string, string>;
  stepLabels?: Record<string, string>;
  customer: LoaderReturnType<AuthData>;
}

function ProductInfo(
  { page, promotions, labels, stepLabels, customer }: Props,
) {
  const { product, breadcrumbList } = page!;
  const {
    productID,
    offers,
    name,
    url,
    additionalProperty,
    sku,
  } = product;
  const priceValidUntil = product.offers?.offers.at(0)?.priceValidUntil;
  const { price, listPrice, installments } = useOffer(offers);
  const chooseLensUrl = `/passo-a-passo${url?.split("/produto")[1]}`;
  const experimenterImage = additionalProperty?.find(
    (prop) => prop.propertyID === "experimentador",
  )?.value;
  const colorsList = additionalProperty?.filter(
    (prop) => prop.propertyID === "color",
  );
  const colors = colorsList?.map(({ unitCode }) => unitCode);
  const colorsName = colorsList?.map(({ value }) => value);
  const addToCard = {
    idProduct: Number(productID),
    sku: Number(sku),
    price: price!,
    name: name!,
  };

  const promotionFlag = additionalProperty?.find(
    (prop) => prop.propertyID === "flag",
  )?.value;

  const promotion = promotions?.find(
    (current) => current.label === promotionFlag,
  );

  const currentCategory = breadcrumbList?.itemListElement[0].name;

  const rating = additionalProperty?.find(
    (prop) => prop.propertyID === "rating",
  )?.value;

  const isAllowedToAddLens = additionalProperty?.find(
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

  const handleStepsLabel = () => {
    if (isLensWithoutPrescription) {
      return stepLabels?.[`${currentCategory!.toLowerCase()} sem grau`];
    }

    return stepLabels?.[currentCategory!.toLowerCase()];
  };

  const stepLabel = handleStepsLabel();

  return (
    <>
      {/* Name */}
      <div class="mb-4 flex flex-start">
        <div class="flex flex-col">
          <h1 class="w-full font-roboto font-medium text-[17px] text-lg">
            {name}
          </h1>
          {lensDescription && (
            <span class="font-roboto font-medium text-sm">
              {lensDescription}
            </span>
          )}
        </div>
        <div class="ml-2">
          <WishlistButton
            variant="icon"
            productID={productID}
            customer={customer}
          />
        </div>
      </div>

      {/* Stopwatch */}
      {priceValidUntil &&
        (
          <div class="w-full flex justify-center mb-2">
            <Stopwatch
              targetDate={priceValidUntil}
              type="details"
            />
          </div>
        )}

      {/* Buy with lens label */}
      {promotion
        ? (
          <div class="sm:hidden lg:block bg-[#a8e3ff] rounded-[2.5px] text-[13px] text-center p-[2.5px] my-[10px]">
            <span>
              {promotion.flagText.replace(
                "%value",
                formatPrice(price, offers!.priceCurrency!) ?? "",
              )}
            </span>
          </div>
        )
        : null}

      {/* Prices */}
      <div class="flex items-normal justify-between">
        <div class="flex flex-col gap-2">
          {listPrice !== price && (
            <p class="line-through font-semibold text-sm  text-red-500 lg:text-base">
              {formatPrice(listPrice, offers!.priceCurrency!)}
            </p>
          )}
          <p class="text-blue-200 text-xl lg:text-[28px] font-bold">
            {formatPrice(price, offers!.priceCurrency!)}
          </p>
          <span class="text-sm text-base-300">{installments}</span>
        </div>

        <div class="flex flex-col items-end justify-between ml-2 gap-2">
          {!!ratingValue && (
            <a href="#product-review" aria-label="Veja as avaliações!">
              <Ratings ratingValue={ratingValue} />
            </a>
          )}

          {!!colorsList?.length && (
            <div class="flex gap-2 items-center">
              <p class="text-base-300 font-bold">
                {colorsName?.join(" / ").toUpperCase()}
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
      </div>

      {/* Experimenter */}
      {!isLentes && experimenterImage
        ? (
          <div class="mt-4">
            <ToExperimentButton
              image={experimenterImage!}
              variant="filled"
              size="small"
            />
          </div>
        )
        : null}

      {/* Choose Lens */}
      {stepLabel && isAllowedToAddLens && (
        <div class="mt-[11px] w-full">
          <ChooseLensButton
            {...addToCard}
            text={stepLabel}
            chooseLensUrl={chooseLensUrl}
          />
        </div>
      )}

      {/* Add To Cart & Whislist */}
      {!isLentes && (
        <div onClick={() => {
          sendFBEvent('AddToCart', { 
            content_ids: [sku], 
            content_type: 'produto', 
            value: price,
            currency: 'BRL'
          });
        }} class="mt-[11px] w-full flex items-center" id="add-to-cart-button">
          <AddToCartButton
            {...addToCard}
            label={labels?.[currentCategory!.toLowerCase()]}
          />
        </div>
      )}

      {/* Analytics Event */}
      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </>
  );
}

export default ProductInfo;
