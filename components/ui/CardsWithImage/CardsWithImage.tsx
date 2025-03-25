import Card, {
  Props as CardProps,
} from "site/components/ui/CardsWithImage/Card.tsx";

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

const card: CardProps = {
  image: {
    src: "https://via.placeholder.com/150",
    alt: "Placeholder",
    width: 150,
    height: 150,
  },
  text:
    "<h2 style='font-size:24px;font-weight:bold;'>Card</h2><p style='text-align:left;'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur, non reiciendis quos voluptates vero aliquid rerum impedit culpa. Nostrum quia nobis, iure saepe veritatis voluptatem vel facilis nemo magni dolor.</p>",
  header: "Card",
};

export default function CardsWithImage({
  cards = [card, card, card],
  columns = { desktop: 3, mobile: 1 },
  colors = { background: "#ffffff" },
  spacing = { betweenImageAndContent: 12, container: true, gap: 32 },
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
        class={"grid grid-cols-[var(--m-cols)] md:grid-cols-[var(--t-cols)] lg:grid-cols-[var(--d-cols)] p-5 md:px-0" +
          (container ? " container" : "")}
        style={{
          gap: `${gap}px`,
        }}
      >
        {cards.map((card, index) => <Card key={index} {...card} />)}
      </ul>
    </div>
  );
}
