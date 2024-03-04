import { Picture, Source } from "apps/website/components/Picture.tsx";
import { IImage } from "deco-sites/otica-isabela/sdk/types.ts";
import Video, {
  Props as IVideo,
} from "deco-sites/otica-isabela/components/ui/VideoModal/Video.tsx";
import Image from "apps/website/components/Image.tsx";
import { Fragment } from "preact";

/**
 * @title Add Button
 */
interface IButton {
  /**
   * @default Button
   */
  label: string;
  /**
   * @default /
   */
  href: string;
  /**
   * @format color
   * @default #2f3136
   */
  color: string;
  /**
   * @format color
   * @default #f3f3f3
   */
  labelColor: string;
  /**
   * @default left
   */
  horizontalAlign: "left" | "center" | "right" | "full";
}

/**
 * @title Add two buttons
 */
interface ITwoButtons {
  justifyContent?: "flex-start" | "center" | "flex-end";
  flexDirection: "row" | "column";
  first: IButton;
  second: IButton;
}

/**
 * @title Add Tag
 */
interface ITag {
  /**
   * @default Tag
   */
  text: string;
  /**
   * @default bottom-right
   */
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /**
   * @format color
   * @default #2f3136
   */
  color: string;
  /**
   * @format color
   * @default #d3d3d3
   */
  backgroundColor: string;
}

/**
 * @title Add Image
 */
interface IImageProps {
  desktop: IImage;
  mobile: IImage;
  position: "left" | "right";
  tag: ITag | NoTag;
  href?: string;
}

/**
 * @title Add Video
 */
interface IVideoProps extends IVideo {
  position: "left" | "right";
}

interface IText {
  /**
   * @format html
   * @default <p>Content</p>
   */
  content: string;
  /**
   * @default top
   */
  verticalAlign: "top" | "center" | "bottom";
  /**
   * @description e.g: 100%, 500px, 50vw, 50%, etc...
   */
  maxWidth?: string;
  /**
   * @description e.g: 100%, 500px, 50vw, 50%, etc...
   */
  maxWidthMobile?: string;
}

/**
 * @title {{label}}
 */
interface ILink {
  image: IImage;
  label: string;
  href: string;
  /**
   * @format color
   * @default #2f3136
   */
  color: string;
  /**
   * @format color
   * @default #d39d4e
   */
  colorHover: string;
}

/**
 * @title Add Links
 */
interface ILinksGrid {
  /**
   * @default 4
   */
  columns: number;
  links: ILink[];
}

interface Padding {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

/**
 * @title No Image
 */
type NoImage = null;
/**
 * @title No Button
 */
type NoButton = null;
/**
 * @title No Tag
 */
type NoTag = null;
/**
 * @title No Links
 */
type NoLinks = null;

interface Props {
  text: IText;
  /**
   * @default 12
   */
  spaceBetweenTextAndMedia?: number;
  /**
   * @default 12
   */
  spaceBetweenTextAndMediaMobile?: number;
  media: IImageProps | IVideoProps | NoImage;
  button: IButton | ITwoButtons | NoButton;
  linksGrid: ILinksGrid | NoLinks;
  /**
   * @default true
   */
  container?: boolean;
  /**
   * @format color
   */
  backgroundColor?: string;
  desktopPadding?: Padding;
  mobilePadding?: Padding;
}

function ResponsiveImage({ mobile, desktop, tag, href }: IImageProps) {
  const preload = desktop.preload || mobile.preload;
  const fetchPriority = preload ? "high" : "low";
  const loading = preload ? "eager" : "lazy";

  const Component = href ? "a" : Fragment;
  const props = href ? { href } : {};

  return (
    <Component {...props} class="block">
      <Picture preload={preload} class="relative">
        <Source
          src={desktop.src}
          width={desktop.width}
          height={desktop.height}
          alt={desktop.alt}
          fetchPriority={fetchPriority}
          loading={loading}
          media="(min-width: 768px)"
        />
        <Source
          src={mobile.src}
          width={mobile.width}
          height={mobile.height}
          alt={mobile.alt}
          fetchPriority={fetchPriority}
          loading={loading}
          media="(max-width: 767px)"
        />
        <img
          class="w-full h-auto object-cover"
          loading={preload ? "eager" : "lazy"}
          src={desktop.src}
          alt={desktop.alt}
        />
        {tag && (
          <span
            style={{
              backgroundColor: tag.backgroundColor,
              color: tag.color,
              top: tag.position.includes("top") ? "12px" : undefined,
              bottom: tag.position.includes("bottom") ? "12px" : undefined,
              left: tag.position.includes("left") ? "12px" : undefined,
              right: tag.position.includes("right") ? "12px" : undefined,
            }}
            class="text-xs rounded-md absolute py-px px-2"
          >
            {tag.text}
          </span>
        )}
      </Picture>
    </Component>
  );
}

const HorizontalAlign = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
  full: "stretch",
};

const isVideo = (
  media: IImageProps | IVideoProps | NoImage
): media is IVideoProps => {
  return media !== null && "videoUrl" in media;
};

const isImage = (
  media: IImageProps | IVideoProps | NoImage
): media is IImageProps => {
  return media !== null && "desktop" in media;
};

const isSingleButton = (
  button: IButton | ITwoButtons | NoButton
): button is IButton => {
  return button !== null && "label" in button;
};

export default function RichText({
  text,
  media,
  button,
  container,
  linksGrid,
  spaceBetweenTextAndMedia,
  spaceBetweenTextAndMediaMobile,
  backgroundColor,
  desktopPadding,
  mobilePadding,
}: Props) {
  return (
    <div
      style={{
        backgroundColor,
        "--d-pt": `${desktopPadding?.top ?? 0}px`,
        "--d-pr": `${desktopPadding?.right ?? 0}px`,
        "--d-pb": `${desktopPadding?.bottom ?? 0}px`,
        "--d-pl": `${desktopPadding?.left ?? 0}px`,
        "--m-pt": `${mobilePadding?.top ?? 0}px`,
        "--m-pr": `${mobilePadding?.right ?? 0}px`,
        "--m-pb": `${mobilePadding?.bottom ?? 0}px`,
        "--m-pl": `${mobilePadding?.left ?? 0}px`,
        "--d-gap": `${spaceBetweenTextAndMedia ?? 20}px`,
        "--m-gap": `${spaceBetweenTextAndMediaMobile ?? 20}px`,
      }}
      class={
        "grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-[var(--m-gap)] md:gap-[var(--d-gap)]" +
        " pt-[var(--m-pt)] pr-[var(--m-pr)] pb-[var(--m-pb)] pl-[var(--m-pl)]" +
        " md:pt-[var(--d-pt)] md:pr-[var(--d-pr)] md:pb-[var(--d-pb)] md:pl-[var(--d-pl)]" +
        (container ? " container" : "")
      }
    >
      {isVideo(media) ? (
        <Video {...media} />
      ) : isImage(media) ? (
        <ResponsiveImage {...media} />
      ) : null}
      <div
        class={
          "p-4 md:p-0 flex flex-col gap-3" +
          (media
            ? media.position === "right"
              ? " md:-order-1"
              : ""
            : " col-span-2") +
          (text.verticalAlign === "center"
            ? " self-center"
            : text.verticalAlign === "bottom"
            ? " self-end"
            : "")
        }
      >
        <div
          style={{ "--d-mw": text.maxWidth, "--m-mw": text.maxWidthMobile }}
          class="max-w-[var(--m-mw)] md:max-w-[var(--d-mw)] [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
          dangerouslySetInnerHTML={{ __html: text.content }}
        />
        {linksGrid && (
          <ul
            style={{
              gridTemplateColumns: `repeat(${linksGrid.columns}, minmax(0, 1fr))`,
            }}
            class="grid justify-between gap-4 w-full"
          >
            {linksGrid.links.map(
              ({ href, color, colorHover, image, label }) => (
                <li>
                  <a
                    href={href}
                    class="flex flex-col gap-2 justify-center items-center hover:text-[var(--hover)] text-[var(--color)] hover:underline text-center"
                    style={{ "--color": color, "--hover": colorHover }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                    />
                    <span class="underline">{label}</span>
                  </a>
                </li>
              )
            )}
          </ul>
        )}
        {button === null ? (
          <></>
        ) : isSingleButton(button) ? (
          <a
            href={button.href}
            class="text-center py-3 px-4 rounded-md min-w-52"
            style={{
              backgroundColor: button.color,
              color: button.labelColor,
              alignSelf: HorizontalAlign[button.horizontalAlign],
            }}
          >
            {button.label}
          </a>
        ) : (
          <div
            style={{
              "--flex-direction": button.flexDirection,
              "--justify-content": button.justifyContent,
            }}
            class="flex items-center gap-3 flex-col md:[flex-direction:var(--flex-direction)] md:[justify-content:var(--justify-content)]"
          >
            <a
              href={button.first.href}
              class="text-center py-3 px-4 rounded-md min-w-52"
              style={{
                backgroundColor: button.first.color,
                color: button.first.labelColor,
                alignSelf: HorizontalAlign[button.first.horizontalAlign],
              }}
            >
              {button.first.label}
            </a>
            <a
              href={button.second.href}
              class="text-center py-3 px-4 rounded-md min-w-52"
              style={{
                backgroundColor: button.second.color,
                color: button.second.labelColor,
                alignSelf: HorizontalAlign[button.second.horizontalAlign],
              }}
            >
              {button.second.label}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
