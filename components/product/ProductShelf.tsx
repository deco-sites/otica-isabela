import ProductCard from "$store/islands/ProductCard.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "apps/commerce/types.ts";
import { useId } from "$store/sdk/useId.ts";
import { AuthData } from "$store/packs/types.ts";

export interface Props {
  products: LoaderReturnType<Product[] | null>;
  itemListName?: string;
  itemsPerPage: {
    mobile: number;
    desktop: number;
  };
  isStopwatchEnabled?: boolean;
  customer?: LoaderReturnType<AuthData>;
}

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-between left-0 absolute top-1/2 -translate-y-1/2 w-full pointer-events-none">
        <Slider.PrevButton class="size-8 rounded bg-grayscale-0 group flex justify-center items-center disabled:cursor-not-allowed duration-200 shadow pointer-events-auto">
          <Icon
            id="chevron-right"
            class="rotate-180 text-slot-primary-500 transition-colors"
          />
        </Slider.PrevButton>
        <Slider.NextButton class="size-8 rounded bg-grayscale-0 group flex justify-center items-center disabled:cursor-not-allowed duration-200 shadow pointer-events-auto">
          <Icon
            id="chevron-right"
            class="text-slot-primary-500 transition-colors"
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function ProductShelf({
  products,
  itemListName,
  itemsPerPage,
  isStopwatchEnabled,
  customer,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full flex flex-col gap-0 md:gap-12 lg:gap-16 my-8">
      <div id={id} class="container flex flex-col px-0 sm:px-5 relative">
        <Slider class="carousel carousel-center sm:carousel-end gap-4 md:gap-6 col-span-full sm:px-0 px-2.5">
          {products?.slice(0, 9).map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full flex-col justify-end"
            >
              <ProductCard
                product={product}
                itemListName={itemListName}
                isStopwatchEnabled={isStopwatchEnabled}
                customer={customer}
              />
            </Slider.Item>
          ))}
        </Slider>

        {/* <Buttons /> */}

        <SendEventOnLoad
          event={{
            name: "view_item_list",
            params: {
              item_list_name: itemListName,
              items: products.map((product) =>
                mapProductToAnalyticsItem({
                  product,
                  ...useOffer(product.offers),
                })
              ),
            },
          }}
        />
        <SliderJS
          itemsPerPage={{
            desktop: { 0: itemsPerPage.desktop },
            mobile: { 0: itemsPerPage.mobile },
          }}
          rootId={id}
        />

        {
          /* <div class="flex flex-row w-full gap-x-3 justify-center items-center sm:py-14 py-10">
          {products.map((_, index) => <Slider.Dot index={index} />)}
        </div> */
        }
        <Buttons />
      </div>
    </div>
  );
}

export default ProductShelf;
