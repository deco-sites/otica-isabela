import { Picture, Source } from "apps/website/components/Picture.tsx";
import { IImage } from "deco-sites/otica-isabela/sdk/types.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

interface Thumbnail {
  desktop: IImage;
  mobile: IImage;
}

interface Props {
  thumbnail: Thumbnail;
  iframeUrl: string;
  container?: boolean;
  /**
   * @ignore
   */
  showIframe?: boolean;
}

const image: IImage = {
  src: "https://fakeimg.pl/600x400",
  alt: "Fake Image",
  width: 600,
  height: 400,
};

export default function DeferredIframe({
  thumbnail = {
    desktop: image,
    mobile: image,
  },
  iframeUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
  container = true,
  showIframe = false,
}: Props) {
  return (
    <div class={"w-full px-5 md:p-0" + (container ? " container" : "")}>
      {showIframe ? (
        <iframe
          class="w-full h-full aspect-video"
          src={iframeUrl}
          allowFullScreen
        />
      ) : (
        <button {...usePartialSection<Props>({ props: { showIframe: true } })}>
          <Picture
            class="w-full h-full"
            preload={thumbnail.desktop.preload || thumbnail.mobile.preload}
          >
            <Source
              src={thumbnail.desktop.src}
              width={thumbnail.desktop.width}
              height={thumbnail.desktop.height}
              alt={thumbnail.desktop.alt}
              fetchPriority={thumbnail.desktop.preload ? "high" : "auto"}
              loading={thumbnail.desktop.preload ? "eager" : "lazy"}
            />
            <Source
              src={thumbnail.mobile.src}
              width={thumbnail.mobile.width}
              height={thumbnail.mobile.height}
              alt={thumbnail.mobile.alt}
              fetchPriority={thumbnail.mobile.preload ? "high" : "auto"}
              loading={thumbnail.mobile.preload ? "eager" : "lazy"}
            />
            <img class="object-cover w-full" src={thumbnail.mobile.src} />
          </Picture>
        </button>
      )}
    </div>
  );
}
