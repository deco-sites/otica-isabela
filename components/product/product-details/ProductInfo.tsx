import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type { Promotion } from "$store/components/product/ProductDetails.tsx";
import ToExperimentButton from "$store/components/product/ToExperimentButton.tsx";
import { sendFBEvent } from "$store/components/ultils/facebook.ts";
import Ratings from "$store/components/product/product-details/Ratings.tsx";
// import WishlistButton from "$store/components/wishlist/WishlistButton.tsx";
import ChooseLensButton from "$store/islands/ChooseLensButton.tsx";
import { AuthData } from "$store/packs/types.ts";
import { type LoaderReturnType } from "@deco/deco";
import ProductInfoColors from "$store/islands/ProductInfoColors.tsx";
import { IsabelaProductDetailsPage } from "site/packs/v2/types.ts";
interface Props {
  page: LoaderReturnType<IsabelaProductDetailsPage | null>;
  promotions?: Promotion[];
  labels?: Record<string, string>;
  stepLabels?: Record<string, string>;
  customer: LoaderReturnType<AuthData>;
  currentCategory: string;
  /**@hide true */
  pathname: string;
  /** @hide true */
  priceValidUntil?: string;
}

function ProductInfo(
  { page, promotions, labels, stepLabels, customer, currentCategory, pathname, priceValidUntil }: Props,
) {
  const { product } = page!;
  const {
    id: productID,
    skuId,
    name,
    slug,
    price,
    priceWithDiscount,
    installments,
    isAvailable,
  } = product;
  const chooseLensUrl = `/passo-a-passo/${slug}`;
  const experimenterImage = product.medias.find((img) => img.tryOn)?.url;

  const addToCard = {
    idProduct: Number(productID),
    sku: Number(skuId),
    price: price!,
    name: name!,
  };

  const promotion = product.canBuyWithPrescriptionLenses
    ? promotions?.find((current) =>
      current.label === "canBuyWithPrescriptionLenses"
    )
    : undefined;

  const rating = product.productRating;
  const ratingValue = rating || 0;

  const isAllowedToAddLens = product.lensAttributes?.[0].isAllowedToAddLens;
  const isLensWithoutPrescription = product.lensAttributes?.[0]
    .isLensWithoutPrescription;
  const lensDescription = product.lensAttributes?.[0].lensQuantityDescription;

  const isLentes = product?.category?.name?.toLowerCase().trim().includes(
    "lentes de contato",
  );

  const handleStepsLabel = () => {
    if (isLensWithoutPrescription) {
      return stepLabels?.[`${currentCategory!.toLowerCase().trim()} sem grau`];
    }
    return stepLabels?.[currentCategory!.toLowerCase().trim()];
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
        {
          /* <div class="ml-2">
          <WishlistButton
            variant="icon"
            productID={productID}
            customer={customer}
          />
        </div> */
        }
      </div>
      {/* Buy with lens label */}
      {promotion
        ? (
          <div class="sm:hidden lg:block bg-[#a8e3ff] rounded-[2.5px] text-[13px] text-center p-[2.5px] my-[10px]">
            <span>
              {promotion.flagText
                .replace("%value", formatPrice(price) ?? "")
                .replace("%discount", formatPrice(priceWithDiscount) ?? "")}
            </span>
          </div>
        )
        : priceValidUntil && priceWithDiscount !== price ? (
          <div class="bg-[#a8e3ff] rounded-[2.5px] text-[13px] text-center p-[2.5px] my-[10px]">
            <span>
              {`Compre com lentes e pague só R$ ${formatPrice(priceWithDiscount)} na armação`}
            </span>
          </div>
        ) : null}

      {/* Prices */}
      <div class="flex items-normal justify-between lg:mt-6">
        <div class="flex flex-col gap-2">
          <ProductInfoColors page={page} pathname={pathname} />
          {price !== priceWithDiscount && (
            <p class="line-through font-semibold text-sm text-red-500 lg:text-base">
              {formatPrice(price)}
            </p>
          )}
          <p class="text-blue-200 text-xl lg:text-[28px] font-bold">
            {formatPrice(priceWithDiscount)}
          </p>
          {installments?.length > 0 && (
            <span class="text-sm text-base-300">
              {installments?.at(-1)?.installmentText}
            </span>
          )}
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
      {isAvailable && stepLabel && isAllowedToAddLens && (
        <div class="mt-[11px] lg:mt-6 w-full">
          <ChooseLensButton
            {...addToCard}
            text={stepLabel}
            chooseLensUrl={chooseLensUrl}
          />
        </div>
      )}

      {/* Add To Cart & Whislist */}
      {!isLentes && isAvailable && (
        <div
          onClick={() => {
            sendFBEvent("AddToCart", {
              content_ids: [productID.toString()],
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
            label={labels?.[currentCategory!.toLowerCase().trim()]}
          />
        </div>
      )}
      {!isAvailable && (
        <div class="mt-6 w-full flex items-center justify-center">
          <span class="text-base text-base-300 text-center bg-gray-scale-100 rounded-md py-3 w-full border border-base-300 ">
            Produto sem estoque no momento
          </span>
        </div>
      )}

      {/* Analytics Event */}
      {
        /* <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice: priceWithDiscount,
              }),
            ],
          },
        }}
      /> */
      }
    </>
  );
}
export default ProductInfo;
