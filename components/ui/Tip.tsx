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

export default function Tip({
  text =
    "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, dignissimos quia rerum ipsum iusto ex ipsam distinctio neque laborum pariatur ut tenetur reprehenderit iure dolor dolorem, beatae vero possimus repellat!</p>",
  icon = {
    color: "#2f3136",
    id: "Bulb",
    size: 24,
    strokeWidth: 2,
    verticalAlign: "middle",
  },
  backgroundColor = "#f6f6f6",
  image,
}: Props) {
  return (
    <div style={{ backgroundColor }} class="container px-10 py-5 rounded">
      <div class="flex gap-5 w-full">
        <Icon
          id={icon.id}
          style={{ color: icon.color }}
          strokeWidth={icon.strokeWidth}
          size={icon.size}
          class={"flex-shrink-0 " +
            `${verticalAlign[icon.verticalAlign] ?? "self-start"}`}
        />
        <div class="flex justify-between gap-3 flex-wrap">
          <div dangerouslySetInnerHTML={{ __html: text }} />
          {image && <Image {...image} />}
        </div>
      </div>
    </div>
  );
}
