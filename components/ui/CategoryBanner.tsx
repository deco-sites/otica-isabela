import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { SectionProps } from "$live/types.ts";
import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";

/**
 * @titleBy matcher
 */
export interface Banner {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @description text to be rendered on top of the image */
  title?: string;
  /** @description text to be rendered on top of the image */
  subtitle?: string;
  image: {
    /** @description Image for big screens */
    desktop: LiveImage;
    /** @description Image for small screens */
    mobile: LiveImage;
    /** @description image alt text */
    alt?: string;
    /** @description image alt text */
    link?: string;
  };
  /** @description turn true to make it not appear on mobile */
  deactiveMobile?: boolean;
}

function Banner({ banner }: SectionProps<ReturnType<typeof loader>>) {
  if (!banner) {
    return null;
  }
  const { title, subtitle, image, deactiveMobile } = banner;

  if (deactiveMobile) {
    return null;
  }

  return (
    <div class="grid grid-cols-1 grid-rows-1">
      <a
        href={image.link}
        class="block overflow-hidden"
      >
        <Picture preload class="col-start-1 col-span-1 row-start-1 row-span-1">
          <Source
            src={image.mobile}
            width={360}
            media="(max-width: 767px)"
          />
          <Source
            src={image.desktop}
            width={1440}
            height={200}
            media="(min-width: 767px)"
          />
          <img
            class="w-full transition-transform duration-700 ease-in-out hover:scale-105"
            src={image.desktop}
            alt={image.alt ?? title}
          />
        </Picture>
      </a>

      <div class="container flex flex-col items-center justify-center sm:items-start col-start-1 col-span-1 row-start-1 row-span-1 w-full">
        <h1>
          <span class="text-5xl font-medium text-base-100">
            {title}
          </span>
        </h1>
        <h2>
          <span class="text-xl font-medium text-base-100">
            {subtitle}
          </span>
        </h2>
      </div>
    </div>
  );
}

export interface Props {
  banners?: Banner[];
}

export const loader = ({ banners = [] }: Props, req: Request) => {
  const banner = banners.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { banner };
};

export default Banner;
