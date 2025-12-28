import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button, {
  Props as ButtonProps,
} from "$store/components/ui/RichText/Button.tsx";
import Content from "$store/components/ui/RichText/Content.tsx";
import ResponsiveImage, {
  Props as ResponsiveImageProps,
} from "$store/components/ui/RichText/ResponsiveImage.tsx";
import Video, {
  Props as IVideo,
} from "$store/components/ui/VideoModal/Video.tsx";
import { IImage } from "$store/sdk/types.ts";
import { Fragment } from "preact";
import { useId } from "preact/hooks";

/**
 * @title Add two buttons
 */
interface ITwoButtons {
  justifyContent?: "flex-start" | "center" | "flex-end";
  flexDirection: "row" | "column";
  first: ButtonProps;
  second: ButtonProps;
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
  media: ResponsiveImageProps | IVideoProps | NoImage;
  button: ButtonProps | ITwoButtons | NoButton;
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

const isVideo = (
  media: ResponsiveImageProps | IVideoProps | NoImage,
): media is IVideoProps => {
  return media !== null && "videoUrl" in media;
};

const isImage = (
  media: ResponsiveImageProps | IVideoProps | NoImage,
): media is ResponsiveImageProps => {
  return media !== null && "desktop" in media;
};

const isSingleButton = (
  button: ButtonProps | ITwoButtons | NoButton,
): button is ButtonProps => {
  return button !== null && "label" in button;
};

export default function RichText({
  text = {
    content:
      "<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, at. Quae nam quam vitae doloremque amet. Saepe voluptas adipisci, enim, earum iste vero ab nostrum iusto quam impedit omnis voluptatum!</p>",
    verticalAlign: "center",
  },
  seeMore,
  media = {
    desktop: {
      src: "https://via.placeholder.com/200x100",
      alt: "Placeholder",
      width: 200,
      height: 100,
    },
    mobile: {
      src: "https://via.placeholder.com/100x100",
      alt: "Placeholder",
      width: 100,
      height: 100,
    },
    position: "left",
    tag: null,
  },
  button = {
    color: "#d39d4e",
    labelColor: "#ffffff",
    href: "/",
    style: "filled",
    horizontalAlign: "left",
    label: "button",
  },
  container = false,
  linksGrid = null,
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
    <Wrapper style={{ backgroundColor }} class="contentTextSeo">
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
        class={"contentTextSeo grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-[var(--m-gap)] md:gap-[var(--d-gap)]" +
          " pt-[var(--m-pt)] pr-[var(--m-pr)] pb-[var(--m-pb)] pl-[var(--m-pl)]" +
          " md:pt-[var(--d-pt)] md:pr-[var(--d-pr)] md:pb-[var(--d-pb)] md:pl-[var(--d-pl)]" +
          (container ? " container" : "")}
      >
        {isVideo(media)
          ? <Video {...media} />
          : isImage(media)
          ? <ResponsiveImage {...media} />
          : null}
        <div
          class={"py-4 md:p-0 flex flex-col gap-3 contentTextSeo" +
            (media
              ? media.position === "right" ? " -order-1" : ""
              : " col-span-2") +
            (text.verticalAlign === "center"
              ? " self-center"
              : text.verticalAlign === "bottom"
              ? " self-end"
              : "")}
        >
          {seeMore && <input id={id} type="checkbox" class="hidden peer" />}
          <Content {...text} />
          {seeMore && (
            <>
              <Content {...text} isSeeMore={true} content={seeMore} />
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
                gridTemplateColumns:
                  `repeat(${linksGrid.columns}, minmax(0, 1fr))`,
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
                ),
              )}
            </ul>
          )}
          {button === null
            ? <></>
            : isSingleButton(button)
            ? <Button {...button} />
            : (
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
