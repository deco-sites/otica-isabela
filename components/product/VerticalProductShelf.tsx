import ProductCard from "$store/components/product/ProductCard.tsx";
import { useId } from "preact/hooks";
import SliderJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";

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
    <div class="container w-full hidden  lg:flex flex-col" id={id}>
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

      <div class="flex flex-row w-full gap-x-3 justify-center items-center py-14 ">
        {arrangedProducts.map((_, index) => <Slider.Dot index={index} />)}
      </div>

      <SliderJS
        perPageDots
        rootId={id}
      />
    </div>
  );
};

export default VerticalProductShelf;
