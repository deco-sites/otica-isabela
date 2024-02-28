import { AvailableIcons } from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";

interface IIcon {
  id: AvailableIcons;
  /**
   * @default 24
   */
  size: number;
  /**
   * @default 16
   */
  strokeWidth: number;
}

/**
 * @title {{header}}
 */
export interface Props {
  /**
   * @default Header
   */
  header: string;
  /**
   * @format textarea
   * @default Content
   */
  text: string;
  icon: IIcon;
}

export default function Step({ icon, header, text }: Props) {
  return (
    <li class="flex gap-[var(--card-gap)] transition-all overflow-clip">
      <Icon
        id={icon.id}
        size={icon.size}
        strokeWidth={icon.strokeWidth}
        class="text-[var(--icon-color)] shrink-0"
      />
      <div class="flex flex-col">
        <h2 class="text-[var(--header-color)] font-bold text-lg">{header}</h2>
        <p class="mt-[var(--text-spacing)] text-[var(--text-color)] break-words">
          {text}
        </p>
      </div>
    </li>
  );
}
