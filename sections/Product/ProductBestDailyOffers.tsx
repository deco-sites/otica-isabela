import ProductShelf from "$store/components/product/ProductShelf.tsx";
import { BestOffersHeader } from "$store/components/ui/BestOffersHeader.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "apps/commerce/types.ts";

export interface Props {
  products?: LoaderReturnType<Product[] | null>;
}

function BestDailyOffers({ products }: Props) {
  if (!products?.length) {
    return null;
  }

  const priceValidUntil = products[0]?.offers?.offers.at(0)?.priceValidUntil;

  return (
    priceValidUntil && (
      <div class="w-full flex flex-col gap-12 lg:gap-16 ">
        <BestOffersHeader
          priceValidUntil={new Date(`${priceValidUntil} GMT-0300`)}
          page={"home"}
        />
        <ProductShelf
          itemsPerPage={{ desktop: 3, mobile: 1.2 }}
          products={products}
          itemListName="Ofertas do dia"
          isStopwatchEnabled
        />
      </div>
    )
  );
}

export default BestDailyOffers;
