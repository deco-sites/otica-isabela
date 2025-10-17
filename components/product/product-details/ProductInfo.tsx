import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import type { Promotion } from "$store/components/product/ProductDetails.tsx";
import ToExperimentButton from "$store/components/product/ToExperimentButton.tsx";
import { sendFBEvent } from "$store/components/ultils/facebook.ts";
import Ratings from "$store/components/product/product-details/Ratings.tsx";
import WishlistButton from "$store/components/wishlist/WishlistButton.tsx";
import ChooseLensButton from "$store/islands/ChooseLensButton.tsx";
import { AuthData } from "$store/packs/types.ts";
import { type LoaderReturnType } from "@deco/deco";
import ProductInfoColors from "$store/islands/ProductInfoColors.tsx";
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
  const { productID, offers, name, url, additionalProperty, sku } = product;
  const { price, listPrice, installments } = useOffer(offers);
  const chooseLensUrl = `/passo-a-passo${url?.split("/produto")[1]}`;
  const experimenterImage = additionalProperty?.find((prop) =>
    prop.propertyID === "experimentador"
  )?.value;
  // const colorsList = additionalProperty?.filter((prop) =>
  //   prop.propertyID === "color"
  // );
  // const colors = colorsList?.map(({ unitCode }) => unitCode);
  // const colorsName = colorsList?.map(({ value }) => value);
  const addToCard = {
    idProduct: Number(productID),
    sku: Number(sku),
    price: price!,
    name: name!,
  };
  const promotionFlag = additionalProperty?.find((prop) =>
    prop.propertyID === "flag"
  )?.value?.toLowerCase();
  const promotion = promotions?.find((current) =>
    current.label.toLowerCase() === promotionFlag
  );
  const currentCategory = breadcrumbList?.itemListElement[0].name;
  const rating = additionalProperty?.find((prop) =>
    prop.propertyID === "rating"
  )?.value;
  const isAllowedToAddLens = additionalProperty?.find((prop) =>
    prop.propertyID === "isAllowedToAddLens"
  );
  const isLensWithoutPrescription = additionalProperty?.find((prop) =>
    prop.propertyID === "isLensWithoutPrescription"
  )?.value;
  const lensDescription = additionalProperty?.find((prop) =>
    prop.propertyID === "lensDescription"
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
          <h1 class="w-full font-outfit font-medium text-[17px] text-lg">
            {name}
          </h1>
          {lensDescription && (
            <span class="font-outfit font-medium text-sm">
              {lensDescription}
            </span>
          )}
          {!!ratingValue && (
            <a href="#product-review" aria-label="Veja as avaliações!">
              <Ratings ratingValue={ratingValue} />
            </a>
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
      <div class="flex items-normal justify-between lg:mt-6">
        <div class="flex flex-col gap-2">
          <ProductInfoColors page={page} />
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

        <div class="flex items-center h-fit ml-2 gap-2">
          {
            /* {!!colorsList?.length && (
            <div
              class="flex gap-2 justify-between w-full tooltip tooltip-top ring-1 ring-offset-2 ring-[#aaa] rounded-full mr-1"
              data-tip={colorsName?.join(" / ")}
            >
              <span
                class="mask mask-circle h-4 w-4 bg-secondary transition-transform"
                style={{
                  background: colors && colors?.length > 1
                    ? `linear-gradient(${colors.join(", ")})`
                    : colors?.[0],
                }}
              />
            </div>
          )} */
          }
        </div>
        {/* Experimenter */}
        {!isLentes && experimenterImage
          ? (
            <div class="mt-4 max-w-[190px] ml-auto flex items-center">
              <ToExperimentButton
                image={experimenterImage!}
                variant="filled"
                size="small"
              />
            </div>
          )
          : null}
      </div>

      {/* Choose Lens */}
      {stepLabel && isAllowedToAddLens && (
        <div class="mt-[11px] lg:mt-6 w-full">
          <ChooseLensButton
            {...addToCard}
            text={stepLabel}
            chooseLensUrl={chooseLensUrl}
          />
        </div>
      )}

      {/* Add To Cart & Whislist */}
      {!isLentes && (
        <div
          onClick={() => {
            sendFBEvent("AddToCart", {
              content_ids: [sku],
              content_type: "produto",
              value: price,
              currency: "BRL",
            });
          }}
          class="mt-[11px] w-full flex items-center"
          id="add-to-cart-button"
        >
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
