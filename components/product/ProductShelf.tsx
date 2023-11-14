import ProductCard from "$store/components/product/ProductCard.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { useId } from "preact/hooks";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "apps/commerce/types.ts";

export interface Props {
  products: LoaderReturnType<Product[] | null>;
  itemListName?: string;
  itemsPerPage: {
    mobile: number;
    desktop: number;
  };
  isStopwatchEnabled?: boolean;
}

function ProductShelf({
  products,
  itemListName,
  itemsPerPage,
  isStopwatchEnabled,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full flex flex-col gap-0 md:gap-12 lg:gap-16 ">
      <div id={id} class="container flex flex-col px-0 sm:px-5">
        <Slider class="carousel carousel-center sm:carousel-end gap-4 md:gap-6 col-span-full sm:px-0 px-2.5">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full flex-col justify-end"
            >
              <ProductCard
                product={product}
                itemListName={itemListName}
                isStopwatchEnabled={isStopwatchEnabled}
              />
            </Slider.Item>
          ))}
        </Slider>

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

        <div class="flex flex-row w-full gap-x-3 justify-center items-center sm:py-14 py-10">
          {products.map((_, index) => <Slider.Dot index={index} />)}
        </div>
      </div>
    </div>
  );
}

export default ProductShelf;
