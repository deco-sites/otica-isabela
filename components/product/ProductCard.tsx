import Image from "deco-sites/std/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnClick } from "$store/sdk/analytics.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

function ProductCard({ product, preload, itemListName }: Props) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    additionalProperty,
  } = product;
  const id = `product-card-${productID}`;

  const targetNames: string[] = [
    "Altura da Lente",
    "Largura da Lente",
    "Largura da Ponte",
    "Hastes",
    "Frente Total",
    "Aro",
  ];

  const nameMapping: Record<string, string> = {
    "Altura da Lente": "Altura",
    "Largura da Lente": "Largura",
    "Largura da Ponte": "Ponte",
    "Frente Total": "Frente",
  };

  const [front] = images ?? [];

  const { highPrice: listPrice, lowPrice: price } = offers ?? {};
  const possibilities = useVariantPossibilities(product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});

  const discount = Math.ceil(
    (((listPrice ?? 0) - (price ?? 0)) / (listPrice ?? 0)) * 100,
  );

  const propertyDescription = additionalProperty?.filter((property) =>
    targetNames.some((targetName) => property?.name?.includes(targetName))
  )?.map(
    (property) => {
      const mappedName = nameMapping[property?.name ?? ""] || property.name;
      return { ...property, name: mappedName };
    },
  );

  return (
    <div
      id={id}
      class="card card-compact w-full text-center h-full  min-w-[340px]"
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />

      <figure
        class="relative"
        style={{ aspectRatio: `${306} / ${170}` }}
      >
        {/* Product Images */}
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="contents"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={306}
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
        </a>

        {discount > 0 && (
          <span class="absolute right-0 bottom-0 bg-[#d92027] gap-x-[2px] rounded text-sm flex justify-center items-center text-white p-[2px] ">
            <Icon
              id="ArrowDown"
              width={9}
              height={9}
            />-{discount}%
          </span>
        )}
      </figure>

      {/* Prices & Name */}
      <div class="flex-auto flex flex-col p-1 gap-3 lg:gap-4">
        <div class="flex flex-col gap-0">
          <h2 class=" font-semibold text-black   text-base lg:text-lg min-h-[57px] mb-6  ">
            {name}
          </h2>

          <p class="text-sm font-normal text-base-200 line-clamp-3 min-h-[42px] mb-2 ">
            {propertyDescription?.map((property, index) =>
              `${property?.name}: ${property?.value}mm ${
                index < propertyDescription.length - 1 ? "/" : ""
              } `
            )}
          </p>
        </div>

        <ul class="flex items-center justify-center gap-2 w-full h-5 ">
          {variants.slice(0, 1).map(([[link]]) => (
            <li>
              <a href={link}>
                <div class="mask mask-circle h-5 w-5 bg-secondary mx-2" />
              </a>
            </li>
          ))}
        </ul>

        <div class="flex flex-col gap-2">
          <div class="flex flex-row  justify-center items-center gap-3  ">
            {discount > 0 && (
              <div class="line-through font-semibold text-sm  text-red-500 lg:text-base ">
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </div>
            )}
            <div class=" text-blue-200 text-xl lg:text-[28px] font-bold">
              {formatPrice(price, offers!.priceCurrency!)}
            </div>
          </div>
        </div>

        <div class="w-full flex items-center justify-center">
          <button class="flex items-center justify-center h-14 gap-x-3 group btn btn-outline w-60 lg:w-full  border-black font-bold text-xl lg:text-2xl text-black hover:text-white hover:bg-black py-2">
            <span class="hidden lg:flex">
              <Icon
                id="Camera"
                class="group-hover:invert"
                width={40}
                height={37}
              />
            </span>
            <span class="flex lg:hidden">
              <Icon
                id="Camera"
                class="group-hover:invert"
                width={25}
                height={23}
              />
            </span>
            Experimentar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
