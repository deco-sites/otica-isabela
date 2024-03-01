import Card, {
  Props as CardProps,
} from "deco-sites/otica-isabela/components/ui/CardsWithImage/Card.tsx";

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
  /**
   * @format color
   * @default #b47d2e
   */
  link: string;
  /**
   * @format color
   */
  linkOnHover?: string;
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
  betweenImageAndHeader: number;
  /**
   * @default 12
   */
  betweenHeaderAndContent: number;
  /**
   * @default 12
   */
  betweenContentAndLink: number;
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
  const {
    background,
    header,
    text,
    link,
    headerOnHover,
    underlineHeaderOnHover,
    linkOnHover,
    textOnHover,
  } = colors;
  const {
    container,
    gap,
    betweenImageAndHeader,
    betweenHeaderAndContent,
    betweenContentAndLink,
  } = spacing;

  return (
    <div
      style={{
        backgroundColor: background,
        "--m-cols": `repeat(${columns.mobile}, minmax(0, 1fr))`,
        "--d-cols": `repeat(${columns.desktop}, minmax(0, 1fr))`,
        "--header-color": header,
        "--content-color": text,
        "--link-color": link,
        "--header-hover": headerOnHover ?? header,
        "--content-hover": textOnHover ?? text,
        "--link-hover": linkOnHover ?? link,
        "--header-spacing": `${betweenImageAndHeader}px`,
        "--content-spacing": `${betweenHeaderAndContent}px`,
        "--link-spacing": `${betweenContentAndLink}px`,
        "--header-text-decoration": underlineHeaderOnHover
          ? "underline"
          : "none",
      }}
    >
      <ul
        class={
          "grid grid-cols-[var(--m-cols)] md:grid-cols-[var(--d-cols)] p-5 md:px-0" +
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
