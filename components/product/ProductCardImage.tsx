import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import Image from "deco-sites/std/components/Image.tsx";

interface Props {
  url: string;
  alt: string;
  discount: number;
  preload?: boolean;
}

const ProductCardImage = ({
  url,
  alt,
  preload,
  discount,
}: Props) => {
  return (
    <figure
      class="relative mb-[10px]"
      style={{ aspectRatio: `${306} / ${170}` }}
    >
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
