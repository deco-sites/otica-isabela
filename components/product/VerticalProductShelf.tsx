import ProductCard from "$store/components/product/ProductCard.tsx";
import { useId } from "preact/hooks";
import SliderJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { ProductShelfDots } from "$store/components/product/ProductShelf.tsx";

export interface Props {
  products?: Product[];
}

const VerticalProductShelf = (
  { products }: Props,
) => {
  if (!products || !products?.length) {
    return null;
  }

  const id = useId();
  const arrangedProducts = Array.from(
    { length: Math.ceil(products?.length / 2) },
    (_, index) => products?.slice(index * 2, index * 2 + 2),
  );

  return (
    <div class="w-full">
      <div
        id={id}
        class="container hidden  lg:flex flex-col  "
      >
        <Slider class="carousel">
          {arrangedProducts?.map((allProducts, index) => (
            <Slider.Item
              index={index}
              class="carousel-item  w-full flex flex-col"
            >
              {allProducts.map((product) => (
                <ProductCard
                  product={product}
                />
              ))}
            </Slider.Item>
          ))}
        </Slider>

        <SliderJS
          rootId={id}
        />

        <div class="flex flex-row w-full gap-x-3 justify-center items-center py-14 ">
          {arrangedProducts.map((_, index) => (
            <Slider.Dot index={index}>
              {ProductShelfDots}
            </Slider.Dot>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerticalProductShelf;
