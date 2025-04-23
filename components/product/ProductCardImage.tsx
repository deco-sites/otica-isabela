import Image from "apps/website/components/Image.tsx";

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
  // promotion,
}: Props) => {
  return (
    <figure
      class="relative mb-[10px] pt-4"
      style={{ aspectRatio: `${306} / ${170}` }}
    >
      {
        /* {promotion
        ? (
          <div class="border-[#f37121] border text-[#f37121] rounded-[3px] text-[10px] text-center p-2 absolute right-0 top-0">
            {promotion}
          </div>
        )
        : null} */
      }
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
    </figure>
  );
};

export default ProductCardImage;
