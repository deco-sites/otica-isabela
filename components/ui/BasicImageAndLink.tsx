import Image from "deco-sites/std/components/Image.tsx";
import type { Image as ImageType } from "deco-sites/std/components/types.ts";

export interface BasicImageAndLinkProps {
  src?: ImageType;
  alt?: string;
  href?: string; 
}

interface Props extends BasicImageAndLinkProps{
  width?: number;
}

export const BasicImageAndLink = (
  { alt, href, src, width }: Props,
) => {
  return (
    <a
      href={href ?? "/"}
      aria-label="Basic image and link"
    >
      <Image
        src={src ?? ""}
        alt={alt ?? ""}
        width={width ?? 0}
      />
    </a>
  );
};
