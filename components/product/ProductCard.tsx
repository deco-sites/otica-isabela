import Image from "deco-sites/std/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Modal from "deco-sites/otica-isabela/components/ui/NewModal.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnClick } from "$store/sdk/analytics.tsx";
import { getAvailableColors } from "deco-sites/otica-isabela/sdk/getVariantColors.ts";
import { useState } from "preact/hooks";
import { BASE_EXPERIMENTER_URL } from "../../sdk/constants/index.ts";
import { getDevice } from "deco-sites/otica-isabela/sdk/getDevice.ts";

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
  carouselImage?: boolean;

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

  const [isExperimenterOpen, setExperimenterOpen] = useState(false);

  const toggleExperimenter = () => {
    setExperimenterOpen(!isExperimenterOpen);
  };

  const id = `product-card-${productID}`;

  const targetNames = [
    "Altura da Lente",
    "Largura da Lente",
    "Largura da Ponte",
    "Hastes",
    "Frente Total",
    "Aro",
  ] as const;

  const nameMapping = {
    "Altura da Lente": "Altura",
    "Largura da Lente": "Largura",
    "Largura da Ponte": "Ponte",
    "Frente Total": "Frente",
  } as const;

  const [front] = images ?? [];

  const { highPrice: listPrice, lowPrice: price } = offers ?? {};

  const discount = Math.ceil(
    (((listPrice ?? 0) - (price ?? 0)) / (listPrice ?? 0)) * 100,
  );

  const description = additionalProperty?.filter((property) =>
    targetNames.some((targetName) => property?.name?.includes(targetName))
  )?.map(
    (property) => {
      const mappedName =
        nameMapping[property.name as keyof typeof nameMapping] || property.name;
      return { ...property, name: mappedName };
    },
  );

  const availableColors = getAvailableColors(product);
  const device = getDevice();
  const experimenterImage = additionalProperty?.find((prop) =>
    prop.propertyID === "experimentador"
  )?.value;

  return (
    <div
      id={id}
      class="card card-compact w-full text-center h-full"
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
        {/* Name & Description */}
        <div class="flex flex-col gap-0">
          <h2 class=" font-semibold text-black   text-base lg:text-lg min-h-[57px] mb-6  ">
            {name}
          </h2>

          <p class="text-sm font-normal text-base-200 line-clamp-3 min-h-[42px] mb-2 ">
            {description?.map((property, index) =>
              `${property?.name}: ${property?.value}mm ${
                index < description.length - 1 ? "/" : ""
              } `
            )}
          </p>
        </div>

        {/* Available Colors */}
        <ul class="flex items-center justify-center gap-2 w-full h-5 ">
          {availableColors?.map(({ name, url, unitCodes }) => (
            <li>
              <a href={url} aria-label={name} title={name}>
                <div
                  style={{
                    background: `linear-gradient(${unitCodes.join(", ")})`,
                  }}
                  class="mask mask-circle h-5 w-5 bg-secondary mx-2"
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Price & Discount */}
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
        <span>{toggleExperimenter}</span>

        {/* Experimenter */}
        <div class="w-full flex items-center justify-center">
          <button
            class="flex items-center justify-center h-14 gap-x-3 group btn btn-outline w-60 lg:w-full  border-black font-bold text-xl lg:text-2xl text-black hover:text-white hover:bg-black py-2"
            onClick={toggleExperimenter}
          >
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

        {/* Modal */}
        <Modal
          class="p-0 rounded-md md:min-w-[673px]"
          open={isExperimenterOpen}
          onClose={toggleExperimenter}
        >
          <div id="header" class="text-left sticky bg-white top-0">
            <div class="flex items-center justify-between">
              <h1 class="text-xs font-bold p-2">Experimentador de óculos</h1>
              <Icon
                class="mr-1 cursor-pointer"
                id="XMark"
                width={25}
                height={23}
                onClick={toggleExperimenter}
              />
            </div>
            <span class="border-b block"></span>
          </div>
          <div id="content" class="min-h-[512px] p-2">
            <iframe
              class="w-full"
              width="640"
              height="480"
              src={`${BASE_EXPERIMENTER_URL}?oculos=${experimenterImage}&tipo=${device}`}
            >
            </iframe>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default ProductCard;
