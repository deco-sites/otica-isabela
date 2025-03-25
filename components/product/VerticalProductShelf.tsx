import ProductCard from "$store/components/product/ProductCard.tsx";
import { useId } from "$store/sdk/useId.ts";

import SliderJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import { AuthData } from "$store/packs/types.ts";
import type { Product } from "apps/commerce/types.ts";

export interface Props {
  products?: Product[];
  customer?: LoaderReturnType<AuthData>;
}

const VerticalProductShelf = ({ products, customer }: Props) => {
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
            class="carousel-item w-full flex flex-col gap-8"
          >
            {allProducts.map((product) => (
              <ProductCard product={product} customer={customer} />
            ))}
          </Slider.Item>
        ))}
      </Slider>

      <div class="flex flex-row w-full gap-x-3 justify-center items-center py-14 ">
        {arrangedProducts.map((_, index) => <Slider.Dot index={index} />)}
      </div>

      <SliderJS rootId={id} />
    </div>
  );
};

export default VerticalProductShelf;
