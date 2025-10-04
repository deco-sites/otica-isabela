import ProductShelf from "$store/components/product/ProductShelf.tsx";
import { BestOffersHeader } from "$store/components/ui/BestOffersHeader.tsx";
import { AuthData } from "$store/packs/types.ts";
import type { LoaderReturnType } from "$live/types.ts";
import Section from "../../components/ui/Section.tsx";
import { Product } from "site/packs/v2/types.ts";

export interface Props {
  products?: Product[] | null;
  customer: LoaderReturnType<AuthData>;
}

function BestDailyOffers({ products, customer }: Props) {
  if (!products?.length) {
    return null;
  }

  const priceValidUntil = null; // TODO: get priceValidUntil from product API

  if (!priceValidUntil) return null;

  return (
    <div class="w-full flex flex-col gap-12 lg:gap-16 mb-14">
      <BestOffersHeader priceValidUntil={priceValidUntil} page={"home"} />
      <ProductShelf
        itemsPerPage={{ desktop: 3, mobile: 1.2 }}
        products={products}
        itemListName="Ofertas do dia"
        isStopwatchEnabled
        customer={customer}
      />
    </div>
  );
}

export default BestDailyOffers;

export const LoadingFallback = () => <Section.Placeholder height="600px" />;
