import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";

import { IconTitle } from "$store/components/ui/IconTitle.tsx";

import Slider from "$store/components/ui/Slider.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { useId } from "preact/hooks";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

export interface Props {
  products: LoaderReturnType<Product[] | null>;
  title?: string;
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  cardLayout?: cardLayout;
}

function ProductShelf({
  products,
  title
}: Props) {
  const id = useId();
  const externalContainerId = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div
      id={externalContainerId}
      class="w-full flex flex-col gap-12 lg:gap-16 "
    >
      <IconTitle label="Produtos/nVISITADOS" />

      <div
        id={id}
        class="container flex flex-col px-0 sm:px-5"
      >
        <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5">
          {products?.map((product, index) => (
            <div class="flex flex-col">
              <Slider.Item
                index={index}
                class="carousel-item w-full first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
              >
                <ProductCard
                  product={product}
                  itemListName={title}
                />
              </Slider.Item>
            </div>
          ))}
        </Slider>

        <SendEventOnLoad
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product) =>
                mapProductToAnalyticsItem({
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
        <SliderJS rootId={id} />

        <div class="flex flex-row w-full gap-x-3 justify-center items-center py-14 ">
          {products.map((_, index) => (
            <Slider.Dot index={index}>
              <div class=" w-[10px] h-[10px] rounded-3xl bg-blue-200  "></div>
            </Slider.Dot>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductShelf;
