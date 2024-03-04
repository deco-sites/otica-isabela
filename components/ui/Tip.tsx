import Image from "apps/website/components/Image.tsx";
import Icon, {
  AvailableIcons,
} from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import { IImage } from "deco-sites/otica-isabela/sdk/types.ts";

interface IIcon {
  id: AvailableIcons;
  /**
   * @default 24
   */
  size: number;
  /**
   * @default 2
   */
  strokeWidth: number;
  /**
   * @format color
   * @default #2f3136
   */
  color: string;
  verticalAlign: "top" | "middle" | "bottom";
}

/**
 * @title Remove Image
 */
type NoImage = null;

interface Props {
  /**
   * @format html
   * @default <p>Content</p>
   */
  text: string;
  icon: IIcon;
  image: IImage | NoImage;
  /**
   * @default #f3f3f3
   * @format color
   */
  backgroundColor: string;
}

const verticalAlign = {
  top: "self-start",
  middle: "self-center",
  bottom: "self-end",
};

export default function Tip({ text, icon, backgroundColor, image }: Props) {
  return (
    <div
      style={{ backgroundColor }}
      class="flex gap-5 container px-10 py-5 rounded items-center flex-wrap"
    >
      <div class="flex gap-5 w-full">
        <Icon
          id={icon.id}
          style={{ color: icon.color }}
          strokeWidth={icon.strokeWidth}
          size={icon.size}
          class={`flex-shrink-0 ${
            verticalAlign[icon.verticalAlign] ?? "self-start"
          }`}
        />
        <div
          style={{
            width: `calc(100% - ${icon.size}px - 20px)`,
            wordWrap: "break-word",
          }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
      {image && <Image class="mx-auto" {...image} />}
    </div>
  );
}
