import Image from "deco-sites/std/components/Image.tsx";
import type { Image as ImageType } from "deco-sites/std/components/types.ts";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";

export interface BasicImageAndLinkProps {
  src?: { desktop: ImageType; mobile: ImageType };
  alt?: string;
  href?: string;
}

interface Props extends BasicImageAndLinkProps {
  width?: { desktop: number; mobile: number };
}

export const BasicImageAndLink = (
  { alt, href, src, width }: Props,
) => {
  if (!src) {
    return null;
  }
  return (
    <a
      href={href ?? "/"}
      aria-label="Basic image and link"
    >
      <Picture>
        <Source
          media="(max-width: 767px)"
          src={src.mobile ?? ""}
          width={width?.mobile ?? 0}
        />
        <Source
          media="(min-width: 768px)"
          src={src?.desktop ?? ""}
          width={width?.desktop ?? 0}
        />
        <img
          src={src.mobile ?? ""}
          alt={alt}
          decoding="async"
          loading="lazy"
        />
      </Picture>
    </a>
  );
};
