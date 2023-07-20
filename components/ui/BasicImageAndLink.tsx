import Image from "deco-sites/std/components/Image.tsx";
import type { Image as ImageType } from "deco-sites/std/components/types.ts";

export interface BasicImageAndLinkProps {
  src?: ImageType;
  alt?: string;
  href?: string;
}

export const BasicImageAndLink = (
  { alt, href, src }: BasicImageAndLinkProps,
) => {
  return (
    <a
      href={href ?? "/"}
      aria-label="Store logo"
    >
      <Image
        src={src ?? ""}
        alt={alt ?? ""}
        width={256}
      />
    </a>
  );
};
