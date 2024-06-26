import { Product } from "apps/commerce/types.ts";

import ProductCard from "$store/components/product/ProductCard.tsx";
import { AuthData } from "$store/packs/types.ts";
import type { LoaderReturnType } from "$live/types.ts";

export interface Columns {
  mobile?: number;
  desktop?: number;
}

export interface Props {
  products: Product[] | null;
  isSliderEnabled?: boolean;
  customer: LoaderReturnType<AuthData>;
}

function ProductGallery({ products, isSliderEnabled, customer }: Props) {
  return (
    <div class="grid grid-cols-1 gap-4 lg:gap-y-12 items-end xs:grid-cols-2 lg:grid-cols-3">
      {products?.map((product, index) => (
        <ProductCard
          product={product}
          preload={index < 3}
          isSliderEnabled={isSliderEnabled}
          customer={customer}
          isStopwatchEnabled
          hideExperiment
        />
      ))}
    </div>
  );
}

export default ProductGallery;
