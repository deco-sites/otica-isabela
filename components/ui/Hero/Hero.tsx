import Background, {
  IBackgroundColor,
  IBackgroundImage,
} from "deco-sites/otica-isabela/components/ui/Hero/Background.tsx";
import BreadCrumb, {
  IBreadCrumb,
} from "deco-sites/otica-isabela/components/ui/Hero/Breadcrumb.tsx";
import Text, { IText } from "deco-sites/otica-isabela/components/ui/Text.tsx";
import { useId } from "deco-sites/otica-isabela/sdk/useId.ts";

interface IPadding {
  /**
   * @default 12
   */
  top: number;
  /**
   * @default 12
   */
  right: number;
  /**
   * @default 12
   */
  bottom: number;
  /**
   * @default 12
   */
  left: number;
}

interface IStyle {
  height?: string;
  padding?: IPadding;
  gap?: number;
  /**
   * @default true
   */
  container?: boolean;
}

/**
 * @title Remove Subtitle
 */
type NoSubtitle = null;
/**
 * @title No Background
 */
type NoBackground = null;
/**
 * @title No BreadCrumbs
 */
type NoBreadcrumbs = null;

export interface IContent {
  title: IText;
  subtitle: IText | NoSubtitle;
}

interface Props {
  content: IContent;
  background: IBackgroundColor | IBackgroundImage | NoBackground;
  breadcrumbs?: IBreadCrumb | NoBreadcrumbs;
  style?: IStyle;
}

export default function Hero({
  content,
  background,
  breadcrumbs,
  style,
}: Props) {
  const id = useId();
  const { title, subtitle } = content;
  const { padding, gap, height, container } = style || {};

  return (
    <Background
      id={id}
      style={{
        padding: `${padding?.top ?? 0}px ${padding?.right ?? 0}px ${
          padding?.bottom ?? 0
        }px ${padding?.left ?? 0}px`,
        minHeight: height,
      }}
      props={background}
    >
      <div
        style={{ gap }}
        class={"flex flex-col" + (container ? " container" : "")}
      >
        {breadcrumbs && <BreadCrumb {...breadcrumbs} />}
        <div>
          <Text {...title} />
          {subtitle && <Text {...subtitle} />}
        </div>
      </div>
    </Background>
  );
}
