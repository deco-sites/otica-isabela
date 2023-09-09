import ProductShelf from "$store/components/product/ProductShelf.tsx";
import { BestOffersHeader } from "$store/components/ui/BestOffersHeader.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

export interface Props {
  products?: LoaderReturnType<Product[] | null>;
  isStopwatchEnabled?: boolean;
}

function BestDailyOffers({ products, isStopwatchEnabled }: Props) {
  if (!products || products.length === 0) {
    return null;
  }

  //@ts-ignore temporarily until we have this on Product interface
  const priceValidUntil = products[0]?.offers?.priceValidUntil;

  return (
    priceValidUntil && (
      <div class="w-full flex flex-col gap-12 lg:gap-16 ">
        <BestOffersHeader priceValidUntil={priceValidUntil} />
        <ProductShelf
          itemsPerPage={{ desktop: 3, mobile: 1.5 }}
          products={products}
          itemListName="Produtos Visitados"
          isStopwatchEnabled={isStopwatchEnabled}
        />
      </div>
    )
  );
}

export default BestDailyOffers;
