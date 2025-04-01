import ProductShelf from "$store/components/product/ProductShelf.tsx";
import { BestOffersHeader } from "$store/components/ui/BestOffersHeader.tsx";
import type { Product } from "apps/commerce/types.ts";
import { AuthData } from "$store/packs/types.ts";
import type { LoaderReturnType } from "$live/types.ts";

interface Time {
    /**
     * @format date
     */
    date?: string;
    /**
     * @description Horário de término da oferta no formato: 23:59:59
     */
    hour?: string;
}

export interface Props {
    date?: Time;
    products?: Product[] | null;
    customer: LoaderReturnType<AuthData>;
}

function NewBestDailyOffers({ date, products, customer }: Props) {
    if (!products?.length) {
        return null;
    }

    if (!date?.date) return null;
    const fullDate = date.hour ? `${date.date}T${date.hour}` : date.date;

    const targetDate = new Date(fullDate);
    const currentDate = new Date();
    if (targetDate <= currentDate) {
        return null;
    }

    return (
        <div class="w-full flex flex-col gap-12 lg:gap-16 ">
            <BestOffersHeader
                priceValidUntil={fullDate}
                page={"home"}
            />
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

export default NewBestDailyOffers;
