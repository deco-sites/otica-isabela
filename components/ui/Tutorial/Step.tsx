import { AvailableIcons } from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";

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
  verticalAlign: "top" | "middle" | "bottom";
}

const verticalAlign = {
  top: "self-start",
  middle: "self-center",
  bottom: "self-end",
};

/**
 * @title Step
 */
export interface Props {
  /**
   * @format html
   * @default <p>Content</p>
   */
  text: string;
  icon: IIcon;
}

export default function Step({ icon, text }: Props) {
  return (
    <li class="flex gap-[var(--card-gap)] transition-all overflow-clip">
      <Icon
        id={icon.id}
        size={icon.size}
        strokeWidth={icon.strokeWidth}
        class={`text-[var(--icon-color)] shrink-0 ${
          verticalAlign[icon.verticalAlign] ?? "self-start"
        }`}
      />
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </li>
  );
}
