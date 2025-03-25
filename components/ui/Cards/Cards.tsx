import Card, {
  ICard,
} from "site/components/ui/Cards/Card.tsx";

interface Columns {
  /**
   * @default 3
   */
  desktop: number;
  /**
   * @default 1
   */
  mobile: number;
}

interface Padding {
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

interface Style {
  /**
   * @title Spacing
   * @default 12
   */
  gap: number;
  container?: boolean;
  /**
   * @format color
   * @default #fff
   */
  backgroundColor?: string;
  padding?: Padding;
}

interface Props {
  cards: ICard[];
  columns: Columns;
  style?: Style;
}

const card: ICard = {
  content: {
    text:
      '<p style="text-align:center;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, fuga at? Sit expedita tempora laudantium, sapiente dolorum vitae, facilis nam laborum ex debitis est praesentium aperiam rem, quibusdam quae commodi.</p>',
    color: "#000000",
    onHover: null,
  },
  header: {
    text: '<h2 style="font-size:32px;font-weight:bold">Header</h2>',
    color: "#000000",
    onHover: null,
  },
  name: "Name",
  href: "/",
  icon: {
    color: "#000000",
    id: "Bulb",
    onHover: null,
    size: 24,
    strokeWidth: 2,
  },
};

const cardsExample: ICard[] = [card, card, card];
const columnsExample: Columns = { desktop: 3, mobile: 1 };

export default function Cards({
  cards = cardsExample,
  columns = columnsExample,
  style = {
    gap: 32,
    backgroundColor: "#f6f6f6",
    padding: { top: 32, right: 0, bottom: 32, left: 0 },
    container: true,
  },
}: Props) {
  const { container, backgroundColor, ..._style } = style ?? ({} as Style);

  return (
    <div style={{ backgroundColor }}>
      <ul
        class={"grid grid-cols-[var(--m-cols)] md:grid-cols-[var(--d-cols)]" +
          (container ? " container" : "")}
        style={{
          ..._style,
          padding: `${_style.padding?.top ?? 0}px ${
            _style.padding?.right ?? 0
          }px ${_style.padding?.bottom ?? 0}px ${_style.padding?.left ?? 0}px`,
          gap: _style.gap ?? 12,
          "--d-cols": `repeat(${columns.desktop}, 1fr)`,
          "--m-cols": `repeat(${columns.mobile}, 1fr)`,
        }}
      >
        {cards.map((card, index) => (
          <li key={index}>
            <Card {...card} />
          </li>
        ))}
      </ul>
    </div>
  );
}
