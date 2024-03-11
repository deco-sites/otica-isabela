import Card, {
  Props as CardProps,
} from "deco-sites/otica-isabela/components/ui/CardsWithImage/Card.tsx";

interface Columns {
  /**
   * @default 3
   */
  desktop: number;
  /**
   * @default 2
   */
  tablet?: number;
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
   * @default true
   */
  container: boolean;
  /**
   * @default 12
   */
  betweenImageAndContent: number;
}

interface Props {
  cards: CardProps[];
  columns: Columns;
  colors: Colors;
  spacing: Spacing;
}

export default function CardsWithImage({
  cards,
  columns,
  colors,
  spacing,
}: Props) {
  const { background } = colors;
  const { container, gap, betweenImageAndContent } = spacing;

  return (
    <div
      style={{
        backgroundColor: background,
        "--m-cols": `repeat(${columns.mobile}, minmax(0, 1fr))`,
        "--t-cols": `repeat(${
          columns.tablet ?? columns.desktop
        }, minmax(0, 1fr))`,
        "--d-cols": `repeat(${columns.desktop}, minmax(0, 1fr))`,
        "--content-spacing": `${betweenImageAndContent}px`,
      }}
    >
      <ul
        class={
          "grid grid-cols-[var(--m-cols)] md:grid-cols-[var(--t-cols)] lg:grid-cols-[var(--d-cols)] p-5 md:px-0" +
          (container ? " container" : "")
        }
        style={{
          gap: `${gap}px`,
        }}
      >
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </ul>
    </div>
  );
}
