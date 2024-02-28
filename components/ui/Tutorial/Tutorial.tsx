import Step, {
  Props as StepProps,
} from "deco-sites/otica-isabela/components/ui/Tutorial/Step.tsx";

interface Colors {
  /**
   * @format color
   * @default #2f3136
   */
  header: string;
  /**
   * @format color
   * @default #2f3136
   */
  text: string;
  /**
   * @format color
   * @default #2f3136
   */
  icon: string;
  /**
   * @format color
   * @default #2f3136
   */
  cardHeader: string;
  /**
   * @format color
   * @default #2f3136
   */
  cardText: string;
  /**
   * @format color
   * @default #f3f4f4
   */
  cardsBackground: string;
}

interface Spacing {
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
  betweenTextAndCards: number;
  /**
   * @default 12
   */
  betweenCards: number;
  /**
   * @default 12
   */
  betweenIconAndContent: number;
  /**
   * @default 12
   */
  betweenCardHeaderAndCardText: number;
}

interface Props {
  /**
   * @default Header
   */
  header: string;
  /**
   * @format textarea
   * @default Content
   */
  text: string;
  steps: StepProps[];
  colors: Colors;
  spacing: Spacing;
}

export default function Tutorial({
  header,
  text,
  steps,
  colors,
  spacing,
}: Props) {
  const {
    betweenTextAndCards,
    betweenCards,
    betweenCardHeaderAndCardText,
    betweenHeaderAndText,
    betweenIconAndContent,
    container,
  } = spacing;
  const {
    cardHeader,
    cardText,
    header: headerColor,
    icon,
    text: textColor,
    cardsBackground,
  } = colors;

  return (
    <div
      class={"flex flex-col p-5 md:p-10" + (container ? " container" : "")}
      style={{
        "--card-gap": `${betweenIconAndContent}px`,
        "--icon-color": icon,
        "--header-color": cardHeader,
        "--text-color": cardText,
        "--text-spacing": `${betweenCardHeaderAndCardText}px`,
      }}
    >
      <h1 style={{ color: headerColor }} class="font-bold text-2xl">
        {header}
      </h1>
      <p style={{ color: textColor, marginTop: betweenHeaderAndText }}>
        {text}
      </p>
      <ul
        class="flex flex-col gap-[var(--card-gap)] p-5 md:p-10"
        style={{
          gap: `${betweenCards}px`,
          backgroundColor: cardsBackground,
          marginTop: `${betweenTextAndCards}px`,
        }}
      >
        {steps.map((step, index) => <Step key={index} {...step} />)}
      </ul>
    </div>
  );
}
