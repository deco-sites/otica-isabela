import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as ImageType } from "deco-sites/std/components/types.ts";

export interface BasicImageAndLinkProps {
  /** @title Imagens */
  src?: { 
    desktop?: ImageType; 
    mobile?: ImageType 
  };
  alt?: string;
  href?: string;
}

interface Props extends BasicImageAndLinkProps {
  width?: { desktop: number; mobile: number };
  height?: { desktop: number; mobile: number };
}

export const BasicImageAndLink = (
  { alt, href, src, width, height }: Props,
) => {
  if (!src) {
    return null;
  }

  if (!href || href === "") {
    return (
      <Picture class="w-full">
        <Source
          media="(max-width: 992px)"
          src={src?.mobile ?? ""}
          width={width?.mobile ?? 0}
          height={height?.mobile ?? 0}
        />
        <Source
          media="(min-width: 993px)"
          src={src?.desktop ?? ""}
          width={width?.desktop ?? 0}
          height={height?.desktop ?? 0}
        />
        <img
          src={src.mobile ?? src?.desktop ?? ""}
          alt={alt}
          class={`${
            !src?.mobile ? "max-lg:hidden" : !src?.desktop ? "lg:hidden" : ""
          } aspect-auto w-full`}
          decoding="async"
          loading="eager"
        />
      </Picture>
    );
  }

  return (
    <a
      href={href ?? "#"}
      aria-label="Basic image and link"
      class={`${
        !src?.mobile
          ? "hidden lg:flex "
          : !src?.desktop
          ? "flex lg:hidden "
          : ""
      }`}
    >
      <Picture>
        <Source
          media="(max-width: 992px)"
          src={src?.mobile ?? ""}
          width={width?.mobile ?? 0}
          height={height?.mobile ?? 0}
        />
        <Source
          media="(min-width: 993px)"
          src={src?.desktop ?? ""}
          width={width?.desktop ?? 0}
          height={height?.desktop ?? 0}
        />
        {
          <img
            src={src.mobile ?? src?.desktop ?? ""}
            alt={alt}
            class={`${
              !src?.mobile ? "max-lg:hidden" : !src?.desktop ? "lg:hidden" : ""
            } aspect-auto w-full`}
            decoding="async"
            loading="eager"
          />
        }
      </Picture>
    </a>
  );
};
