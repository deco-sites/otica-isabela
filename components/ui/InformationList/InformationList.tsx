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
  betweenImageAndContent: number;
  /**
   * @default 12
   */
  betweenImageAndContentMobile?: number;
}

interface Style {
  colors: Colors;
  spacing: Spacing;
  /**
   * @default left
   */
  cardImagePosition: "left" | "right";
  /**
   * @title Card text in columns on mobile
   * @description If true, the card text will be in columns on mobile
   */
  cardColOnMobile?: boolean;
}

interface Props {
  cards: CardProps[];
  columns: Columns;
  style: Style;
}

export default function InformationList({ cards, columns, style }: Props) {
  const { colors, spacing, cardImagePosition, cardColOnMobile } = style;
  const { background } = colors;
  const {
    gap,
    padding,
    container,
    betweenImageAndContent,
    betweenImageAndContentMobile,
  } = spacing;

  return (
    <div
      style={{
        backgroundColor: background,
        "--m-cols": `repeat(${columns.mobile}, minmax(0, 1fr))`,
        "--d-cols": `repeat(${columns.desktop}, minmax(0, 1fr))`,
        "--card-gap": `${betweenImageAndContent}px`,
        "--m-card-gap": `${
          betweenImageAndContentMobile ?? betweenImageAndContent
        }px`,
        "--card-image-order": cardImagePosition === "left" ? "-1" : "2",
      }}
    >
      <ul
        class={
          "grid grid-cols-[var(--m-cols)] md:grid-cols-[var(--d-cols)]" +
          (container ? " container" : "")
        }
        style={{
          gap: `${gap}px`,
          padding: `${padding}px`,
        }}
      >
        {cards.map((card, index) => (
          <Card key={index} {...card} columnOnMobile={cardColOnMobile} />
        ))}
      </ul>
    </div>
  );
}
