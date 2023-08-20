import ProductCard from "$store/components/product/ProductCard.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { useId } from "preact/hooks";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

export interface Props {
  products: LoaderReturnType<Product[] | null>;
  itemListName?: string;
  itemsPerPage: {
    mobile: Record<number, number>;
    desktop: Record<number, number>;
  };
}

export const ProductShelfDots = () => (
  <div class=" w-[10px] h-[10px] rounded-3xl bg-blue-200  ">
  </div>
);

function ProductShelf({
  products,
  itemListName,
  itemsPerPage,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }



  return (
    <div class="w-full flex flex-col gap-0 md:gap-12 lg:gap-16 ">
      <div
        id={id}
        class="container flex flex-col px-0 sm:px-5"
      >
        <Slider class="carousel carousel-center sm:carousel-end gap-0 md:gap-6 col-span-full row-start-2 row-end-5">
          {products?.map((product, index) => (
            <div class="flex flex-col">
              <Slider.Item
                index={index}
                class="carousel-item w-full  lg:first:pl-0 first:pl-4 last:pr-4  lg:last:pr-0 "
              >
                <ProductCard
                  product={product}
                  itemListName={itemListName}
                />
              </Slider.Item>
            </div>
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
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
        <SliderJS
          itemsPerPage={itemsPerPage}
          rootId={id}
        />

        <div class="flex flex-row w-full gap-x-3 justify-center items-center py-14 ">
          {products.map((_, index) => (
            <Slider.Dot index={index}>
              <ProductShelfDots />
            </Slider.Dot>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductShelf;
