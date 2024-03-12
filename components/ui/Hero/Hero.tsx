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

const contentExample: IContent = {
  title: {
    text: "<h1 style='font-size:32px;font-weight:bold;text-align:center;'>Title</h1><p style='text-align:center;'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, fuga at? Sit expedita tempora laudantium, sapiente dolorum vitae, facilis nam laborum ex debitis est praesentium aperiam rem, quibusdam quae commodi.</p>",
    color: "#000000",
    onHover: null,
  },
  subtitle: null,
};

export default function Hero({
  content = contentExample,
  background = { color: "#9aa9ee" },
  breadcrumbs,
  style = {
    container: true,
    padding: { top: 32, bottom: 32, left: 12, right: 12 },
  },
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
