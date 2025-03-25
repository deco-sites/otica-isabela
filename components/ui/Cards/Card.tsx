import Icon, {
  AvailableIcons,
} from "site/components/ui/Icon.tsx";
import Text, { IText } from "site/components/ui/Text.tsx";
import { useId } from "site/sdk/useId.ts";

/**
 * @title Set Color
 * @format color
 */
type SetColor = string;
/**
 * @title Set Shadow
 * @format color
 */
type SetShadow = string;
/**
 * @title Ignore
 */
type Ignore = null;
/**
 * @title Ignore
 */
type IgnoreCard = null;

interface IIcon {
  id: AvailableIcons;
  /**
   * @default 24
   */
  size: number;
  /**
   * @format color
   */
  color: string;
  /**
   * @default 16
   */
  strokeWidth: number;
  onHover: SetColor | Ignore;
}

interface IStyle {
  /**
   * @default 12
   */
  gap: number;
  onHover: SetShadow | IgnoreCard;
  /**
   * @default 12
   */
  borderRadius: number;
}

/**
 * @title {{name}}
 */
export interface ICard {
  name: string;
  header: IText;
  content: IText;
  icon: IIcon;
  href: string;
  style?: IStyle;
}

export default function Card({ header, content, icon, href, style }: ICard) {
  const id = useId();
  const { onHover, ..._style } = style ?? ({} as IStyle);

  return (
    <>
      <a
        id={id}
        style={{
          ..._style,
          ...(onHover && { "--shadow-hover": `${onHover}` }),
        }}
        href={href}
        class="bg-white md:flex-col flex justify-center items-center p-5 transition-all group hover:shadow-[0_0_10px_var(--shadow-hover)]"
      >
        <Icon
          style={{ "--icon-color": icon.color, "--icon-hover": icon.onHover }}
          strokeWidth={icon.strokeWidth}
          class="text-[var(--icon-color)] group-hover:text-[var(--icon-hover)] transition-all shrink-0"
          id={icon.id}
          size={icon.size}
        />
        <div class="flex flex-col items-start md:items-center justify-center gap-1">
          <Text {...header} />
          {content && <Text {...content} />}
        </div>
      </a>
    </>
  );
}
