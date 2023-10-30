import { Product } from "apps/commerce/types.ts";

import ProductCard from "$store/components/product/ProductCard.tsx";

export interface Columns {
  mobile?: number;
  desktop?: number;
}

export interface Props {
  products: Product[] | null;
  isSliderEnabled?: boolean;
}

function ProductGallery({ products, isSliderEnabled }: Props) {
  return (
    <div class="grid grid-cols-1 gap-4 items-center
	xs:grid-cols-2 lg:grid-cols-3">
      {products?.map((product, index) => (
        <ProductCard
          product={product}
          preload={index < 3}
          isSliderEnabled={isSliderEnabled}
          isStopwatchEnabled
        />
      ))}
    </div>
  );
}

export default ProductGallery;
