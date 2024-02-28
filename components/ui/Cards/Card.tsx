import Icon, {
  AvailableIcons,
} from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import Text, { IText } from "deco-sites/otica-isabela/components/ui/Text.tsx";
import { useId } from "deco-sites/otica-isabela/sdk/useId.ts";

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
        class="bg-white md:flex-col flex md:justify-center items-center p-5 transition-all group hover:shadow-[0_0_10px_var(--shadow-hover)]"
      >
        <Icon
          style={{ "--icon-color": icon.color, "--icon-hover": icon.onHover }}
          strokeWidth={icon.strokeWidth}
          class="text-[var(--icon-color)] group-hover:text-[var(--icon-hover)] transition-all"
          id={icon.id}
          size={icon.size}
        />
        <Text {...header} />
        {content && (
          <div class="hidden md:inline">
            <Text {...content} />
          </div>
        )}
      </a>
    </>
  );
}
