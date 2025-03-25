import Icon from "$store/components/ui/Icon.tsx";
import Image from "deco-sites/std/components/Image.tsx";

interface Props {
  url: string;
  alt: string;
  discount: number;
  preload?: boolean;
  promotion?: string;
}

const ProductCardImage = ({
  url,
  alt,
  preload,
  discount,
  promotion,
}: Props) => {
  return (
    <figure
      class="relative mb-[10px] pt-4"
      style={{ aspectRatio: `${306} / ${170}` }}
    >
      {promotion
        ? (
          <div class="border-[#f37121] border text-[#f37121] rounded-[3px] text-[10px] text-center p-2 absolute right-0 top-0">
            {promotion}
          </div>
        )
        : null}
      {/* Product Images */}
      <Image
        src={url}
        alt={alt || url}
        width={210}
        height={210}
        preload={preload}
        loading={preload ? "eager" : "lazy"}
        decoding="async"
        class="w-full"
      />
      {discount > 0 && (
        <span class="absolute right-0 bottom-0 bg-[#d92027] gap-x-[2px] rounded text-sm flex justify-center items-center text-white p-[2px] ">
          <Icon id="ArrowDown" width={9} height={9} />-{discount}%
        </span>
      )}
    </figure>
  );
};

export default ProductCardImage;
