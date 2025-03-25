import { Picture, Source } from "apps/website/components/Picture.tsx";
import { AvailableIcons } from "site/components/ui/Icon.tsx";
import { IImage } from "site/sdk/types.ts";
import { Fragment } from "preact";

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

interface ITab {
  label: string;
  icon: AvailableIcons;
  /**
   * @format color
   */
  iconColor: string;
  /**
   * @format color
   */
  textColor: string;
  /**
   * @format color
   */
  backgroundColor: string;
  /**
   * @format color
   */
  activeBackgroundColor: string;
}

/**
 * @title No Tag
 */
type NoTag = null;

/**
 * @title Add Image
 */
export interface Props {
  desktop: IImage;
  mobile: IImage;
  position: "left" | "right";
  tag: ITag | NoTag;
  href?: string;
}

export default function ResponsiveImage({ mobile, desktop, tag, href }: Props) {
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
