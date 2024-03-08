import Image from "apps/website/components/Image.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Video, {
  Props as IVideo,
} from "deco-sites/otica-isabela/components/ui/VideoModal/Video.tsx";
import { IImage } from "deco-sites/otica-isabela/sdk/types.ts";
import { useId } from "preact/hooks";
import { Fragment } from "preact";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";

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
   * @title Background Color
   * @format color
   * @default #2f3136
   */
  color: string;
  /**
   * @title Text Color
   * @format color
   * @default #f3f3f3
   */
  labelColor: string;
  style?: "filled" | "outlined";
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

/**
 * @title See More
 * @format html
 */
type AddSeeMore = string;
/**
 * @title Remove See More
 */
type RemoveSeeMore = null;

interface Props {
  text: IText & {
    desktopPadding?: Padding;
    mobilePadding?: Padding;
  };
  seeMore?: RemoveSeeMore | AddSeeMore;
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
  /**
   * @default false
   */
  backgroundBypassContainer?: boolean;
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

function Button({
  color,
  horizontalAlign,
  href,
  label,
  labelColor,
  style = "filled",
}: IButton) {
  return (
    <a
      href={href}
      class="text-center py-3 px-4 rounded-md min-w-52"
      style={{
        ...(style === "filled"
          ? { backgroundColor: color }
          : { border: `1px solid ${color}` }),
        color: labelColor,
        alignSelf: HorizontalAlign[horizontalAlign],
      }}
    >
      {label}
    </a>
  );
}

export default function RichText({
  text,
  seeMore,
  media,
  button,
  container = false,
  linksGrid,
  spaceBetweenTextAndMedia,
  spaceBetweenTextAndMediaMobile,
  backgroundColor,
  backgroundBypassContainer = false,
  desktopPadding,
  mobilePadding,
}: Props) {
  const Wrapper = backgroundBypassContainer ? "div" : Fragment;
  const id = useId();

  return (
    <Wrapper style={{ backgroundColor }}>
      <div
        style={{
          backgroundColor,
          // desktopPadding
          "--d-pt": `${desktopPadding?.top ?? 0}px`,
          "--d-pr": `${desktopPadding?.right ?? 0}px`,
          "--d-pb": `${desktopPadding?.bottom ?? 0}px`,
          "--d-pl": `${desktopPadding?.left ?? 0}px`,
          // mobilePadding
          "--m-pt": `${mobilePadding?.top ?? 0}px`,
          "--m-pr": `${mobilePadding?.right ?? 12}px`,
          "--m-pb": `${mobilePadding?.bottom ?? 0}px`,
          "--m-pl": `${mobilePadding?.left ?? 12}px`,
          // spaceBetweenTextAndMedia
          "--d-gap": `${spaceBetweenTextAndMedia ?? 20}px`,
          // spaceBetweenTextAndMediaMobile
          "--m-gap": `${spaceBetweenTextAndMediaMobile ?? 20}px`,
          // mobile textPadding
          "--t-m-pt": `${text.mobilePadding?.top ?? 0}px`,
          "--t-m-pr": `${text.mobilePadding?.right ?? 0}px`,
          "--t-m-pb": `${text.mobilePadding?.bottom ?? 0}px`,
          "--t-m-pl": `${text.mobilePadding?.left ?? 0}px`,
          // desktop textPadding
          "--t-d-pt": `${text.desktopPadding?.top ?? 0}px`,
          "--t-d-pr": `${text.desktopPadding?.right ?? 0}px`,
          "--t-d-pb": `${text.desktopPadding?.bottom ?? 0}px`,
          "--t-d-pl": `${text.desktopPadding?.left ?? 0}px`,
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
            "py-4 md:p-0 flex flex-col gap-3" +
            (media
              ? media.position === "right"
                ? " -order-1"
                : ""
              : " col-span-2") +
            (text.verticalAlign === "center"
              ? " self-center"
              : text.verticalAlign === "bottom"
              ? " self-end"
              : "")
          }
        >
          {seeMore && <input id={id} type="checkbox" class="hidden peer" />}
          <div
            style={{ "--d-mw": text.maxWidth, "--m-mw": text.maxWidthMobile }}
            class={
              " peer-checked:hidden max-w-[var(--m-mw)] md:max-w-[var(--d-mw)] [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6" +
              " pt-[var(--t-m-pt)] pr-[var(--t-m-pr)] pb-[var(--t-m-pb)] pl-[var(--t-m-pl)]" +
              " md:pt-[var(--t-d-pt)] md:pr-[var(--t-d-pr)] md:pb-[var(--t-d-pb)] md:pl-[var(--t-d-pl)]"
            }
            dangerouslySetInnerHTML={{ __html: text.content }}
          />
          {seeMore && (
            <>
              <div
                style={{
                  "--d-mw": text.maxWidth,
                  "--m-mw": text.maxWidthMobile,
                }}
                class={
                  "peer-checked:block hidden max-w-[var(--m-mw)] md:max-w-[var(--d-mw)] [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6" +
                  " pt-[var(--t-m-pt)] pr-[var(--t-m-pr)] pb-[var(--t-m-pb)] pl-[var(--t-m-pl)]" +
                  " md:pt-[var(--t-d-pt)] md:pr-[var(--t-d-pr)] md:pb-[var(--t-d-pb)] md:pl-[var(--t-d-pl)]"
                }
                dangerouslySetInnerHTML={{ __html: seeMore }}
              />
              <label
                htmlFor={id}
                class="container w-full peer-checked:[--icon-rotate:-90deg] cursor-pointer flex gap-3 items-center"
              >
                <p class="font-bold">Ver mais</p>
                <Icon
                  id="ChevronRight"
                  size={14}
                  strokeWidth={3}
                  class="transition-all"
                  style={{ rotate: "var(--icon-rotate, 0deg)" }}
                />
              </label>
            </>
          )}
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
            <Button {...button} />
          ) : (
            <div
              style={{
                "--flex-direction": button.flexDirection,
                "--justify-content": button.justifyContent,
              }}
              class="flex items-center gap-3 flex-col md:[flex-direction:var(--flex-direction)] md:[justify-content:var(--justify-content)]"
            >
              <Button {...button.first} />
              <Button {...button.second} />
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
