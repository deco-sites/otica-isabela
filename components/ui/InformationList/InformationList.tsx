import Card, {
  Props as CardProps,
} from "deco-sites/otica-isabela/components/ui/InformationList/Card.tsx";

interface Columns {
  /**
   * @default 2
   */
  desktop: number;
  /**
   * @default 1
   */
  mobile: number;
}

interface Colors {
  /**
   * @format color
   * @default #ffffff
   */
  background: string;
  /**
   * @format color
   * @default #2f3136
   */
  header: string;
  /**
   * @format color
   */
  headerOnHover?: string;
  /**
   * @default false
   */
  underlineHeaderOnHover: boolean;
  /**
   * @format color
   * @default #2f3136
   */
  text: string;
  /**
   * @format color
   */
  textOnHover?: string;
}

interface Spacing {
  /**
   * @default 12
   */
  gap: number;
  /**
   * @default 12
   */
  padding: number;
  /**
   * @default true
   */
  container: boolean;
  /**
   * @default 12
   */
  betweenHeaderAndText: number;
  /**
   * @default 12
   */
  betweenImageAndContent: number;
}

interface Style {
  colors: Colors;
  spacing: Spacing;
  /**
   * @default left
   */
  cardImagePosition: "left" | "right";
}

interface Props {
  cards: CardProps[];
  columns: Columns;
  style: Style;
}

export default function InformationList({ cards, columns, style }: Props) {
  const { colors, spacing } = style;
  const {
    background,
    header,
    headerOnHover,
    underlineHeaderOnHover,
    text,
    textOnHover,
  } = colors;
  const {
    gap,
    padding,
    container,
    betweenHeaderAndText,
    betweenImageAndContent,
  } = spacing;

  return (
    <div
      style={{
        backgroundColor: background,
        "--m-cols": `repeat(${columns.mobile}, minmax(0, 1fr))`,
        "--d-cols": `repeat(${columns.desktop}, minmax(0, 1fr))`,
        "--header-color": header,
        "--header-hover": headerOnHover ?? header,
        "--header-text-decoration": underlineHeaderOnHover
          ? "underline"
          : "none",
        "--text-color": text,
        "--text-hover": textOnHover ?? text,
        "--text-spacing": `${betweenHeaderAndText}px`,
        "--card-gap": `${betweenImageAndContent}px`,
        "--card-image-order": style.cardImagePosition === "left" ? "-1" : "2",
      }}
    >
      <ul
        class={"grid grid-cols-[var(--m-cols)] md:grid-cols-[var(--d-cols)]" +
          (container ? " container" : "")}
        style={{
          gap: `${gap}px`,
          padding: `${padding}px`,
        }}
      >
        {cards.map((card, index) => <Card key={index} {...card} />)}
      </ul>
    </div>
  );
}
