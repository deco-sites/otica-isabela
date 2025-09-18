import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "$store/sdk/useId.ts";

export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;
  /** @description mobile otimized image */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;

    /** @description Image description */
    label: string;
  };
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function BannerItem({ image, lcp }: { image: Banner; lcp?: boolean }) {
  const { alt, mobile, desktop, action } = image;

  return (
    <a href={action?.href ?? "#"} rel="nofollow" aria-label={action?.label}>
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={360}
          height={504}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1024}
          height={332}
        />
        <img
          class="w-full h-auto"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-start z-10 col-start-1 row-start-2">
        <Slider.PrevButton class="bg-white w-11 h-11 opacity-25 hover:opacity-30 rounded-tr-3xl rounded-br-3xl">
          <Icon
            size={35}
            class="text-base-300"
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-end z-10 col-start-3 row-start-2">
        <Slider.NextButton class="bg-white w-11 h-11 opacity-25 hover:opacity-30 rounded-tl-3xl rounded-bl-3xl pl-2">
          <Icon
            size={35}
            class="text-base-300"
            id="ChevronRight"
            strokeWidth={3}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function BannerCarousel({ images, preload, interval }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="relative grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px]"
    >
      <Slider class="carousel relative carousel-center w-full col-span-full row-span-full scrollbar-none gap-6">
        {images?.map((image, index) => (
          <Slider.Item
            index={index}
            class="flex-none box-content snap-center w-full"
          >
            <BannerItem image={image} lcp={index === 0 && preload} />
          </Slider.Item>
        ))}
      </Slider>
      <div class="absolute bottom-3 flex w-full justify-center items-center gap-x-4">
        {images?.map((_, index) => {
          return <Slider.Dot index={index} />;
        })}
      </div>
      <Buttons />

      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default BannerCarousel;
