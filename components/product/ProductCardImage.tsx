import Image from "apps/website/components/Image.tsx";

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
}: Props) => {
  return (
    <figure
      class="relative mb-[10px] pt-4 max-lg:max-h-full rounded-[20px] w-full"
      style={{ aspectRatio: `${306} / ${170}` }}
    >
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
