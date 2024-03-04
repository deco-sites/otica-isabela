import { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { IImage } from "deco-sites/otica-isabela/sdk/types.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { formatPrice } from "deco-sites/otica-isabela/sdk/format.ts";
import { useOffer } from "deco-sites/otica-isabela/sdk/useOffer.ts";

interface IButton {
  label: string;
  /**
   * @format color
   * @default #f3f3f3
   */
  labelColor: string;
  /**
   * @format color
   * @default #2f3136
   */
  backgroundColor: string;
}

export interface Props {
  product: Product[] | null;
  /**
   * @format html
   */
  text: string;
  button: IButton;
  image: IImage;
  /**
   * @default right
   */
  imagePosition: "left" | "right";
  productTitle?: string;
  /**
   * @ignore Used to render the correct product when rendering with deferred
   */
  skuId?: string;
}

export default function SingleProductShelf({
  product: productList,
  text,
  button,
  image,
  imagePosition = "right",
  productTitle,
  skuId,
}: Props) {
  const product = productList?.[0];

  if (!product) {
    return null;
  }

  skuId = skuId ?? product.productID;

  const hasVariant = product.isVariantOf?.hasVariant ?? [];
  const sku = hasVariant.find((p) => p.sku === skuId);
  const { price } = useOffer(product.offers);
  const colors = new Map<string, { hex: string; skuId: string }>();

  for (const variant of hasVariant) {
    const color = variant.additionalProperty?.find(
      (prop) => prop.propertyID === "color"
    );

    if (color) {
      colors.set(variant.productID, {
        hex: color.unitCode ?? "transparent",
        skuId: variant.sku,
      });
    }
  }

  // @ts-ignore trust me
  const imageUrl = sku?.Imagem ?? product.image?.[0]?.url ?? "";

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 container">
      <div
        class={
          "flex flex-col gap-3 px-3 md:px-0" +
          (imagePosition === "left" ? " order-2" : "")
        }
      >
        <div dangerouslySetInnerHTML={{ __html: text }} />
        <Image
          key={skuId}
          src={imageUrl}
          width={250}
          height={250}
          alt={product.name}
          class="w-full object-cover self-center max-w-[250px]"
        />
        <input
          type="radio"
          name="colors"
          id="0"
          checked={true}
          class="hidden"
        />
        <div class="flex gap-2 justify-center items-center">
          {[...colors.values()].map((color) => (
            <button
              class={
                "w-[30px] h-[30px] border-2 p-0.5 rounded-full" +
                (color.skuId === skuId
                  ? " border-zinc-300"
                  : " border-transparent")
              }
              key={color.skuId}
              disabled={color.skuId === skuId}
              {...usePartialSection({ props: { skuId: color.skuId } })}
            >
              <input
                key={color.skuId}
                id={color.skuId}
                name="colors"
                type="radio"
                class="peer hidden"
              />
              <label
                style={{ backgroundColor: color.hex }}
                htmlFor={color.skuId}
                class="w-full h-full rounded-full block peer-checked:loading peer-checked:loading-spinner"
              />
            </button>
          ))}
        </div>
        <p class="text-center">
          <span class="font-medium">{productTitle ?? product.name}</span>{" "}
          {formatPrice(price)}
        </p>
        <a
          href={product.url}
          style={{
            "--bg-color": button.backgroundColor,
            color: button.labelColor,
          }}
          class="bg-[var(--bg-color)] transition-all text-center py-3 rounded-md min-w-20 px-5 self-center"
        >
          {button.label}
        </a>
      </div>
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        class="w-full object-cover"
      />
    </div>
  );
}
