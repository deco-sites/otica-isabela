import ToExperimentButton from "deco-sites/otica-isabela/components/product/ToExperimentButton.tsx";
import WishlistButton from "deco-sites/otica-isabela/components/wishlist/WishlistButton.tsx";
import Ratings from "deco-sites/otica-isabela/components/product/product-details/Ratings.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import type { ProductDetailsPage } from "apps/commerce/types.ts";

function ProductInfo({ page }: { page: ProductDetailsPage }) {
  const { product, breadcrumbList } = page;
  const { productID, offers, name, url, isVariantOf, additionalProperty } =
    product;
  const { price, listPrice, installments } = useOffer(offers);
  const chooseLensUrl = `/passo-a-passo${url?.split("/produto")[1]}`;
  const experimenterImage = additionalProperty?.find(
    (prop) => prop.propertyID === "experimentador",
  )?.value;
  const colorsList = additionalProperty?.filter(
    (prop) => prop.propertyID === "color",
  );
  const colors = colorsList?.map((color) => color.unitCode);

  return (
    <>
      {/* Name */}
      <div>
        <span class="font-roboto font-medium text-[17px] text-lg">{name}</span>
      </div>

      {/* Buy with lens label */}
      <div class="sm:hidden lg:block bg-[#a8e3ff] rounded-[2.5px] text-[13px] text-center p-[2.5px] my-[10px]">
        <span>Compre com lentes de grau e pague só R$ {price}</span>
      </div>

      {/* Ratings */}
      <Ratings />

      {/* Prices */}
      <div class="w-[80%] flex items-center">
        <div id="price-container">
          {listPrice && (
            <p class="mt-4 mb-4 line-through font-semibold text-sm  text-red-500 lg:text-base">
              {formatPrice(listPrice, offers!.priceCurrency!)}
            </p>
          )}
          <p class="text-blue-200 text-xl lg:text-[28px] font-bold">
            {formatPrice(price, offers!.priceCurrency!)}
          </p>
          <span class="text-sm text-base-300">{installments}</span>
        </div>

        {!!colorsList?.length && (
          <div id="colors" class="flex items-center ml-2">
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

      {/* Experimenter */}
      <div class="mt-4 lg:max-w-[80%]">
        <ToExperimentButton image={experimenterImage!} variant="filled" />
      </div>

      {/* Choose Lens */}
      <div class="mt-[11px] lg:max-w-[80%] w-full">
        <a href={chooseLensUrl}>
          <button class="text-white bg-orange-500 rounded-[9px] uppercase btn w-full py-2 text-[15px] min-h-[56px] hover:text-orange-500 hover:bg-white hover:border-orange-500">
            Escolher as Lentes
          </button>
        </a>
      </div>

      {/* Add To Cart & Whislist */}
      <div class="mt-[11px] lg:max-w-[80%] w-full flex items-center">
        <button class="bg-white text-orange-500 border-orange-500 border rounded-[9px] uppercase btn w-full py-2 text-[15px] min-h-[56px] hover:bg-orange-500 hover:text-white hover:border-orange-500">
          Comprar Clipon
        </button>
        <div class="ml-2">
          <WishlistButton
            productGroupID={isVariantOf?.productGroupID}
            productID={productID}
          />
        </div>
      </div>

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
