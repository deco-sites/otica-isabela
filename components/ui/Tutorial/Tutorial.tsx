import Step, {
  Props as StepProps,
} from "deco-sites/otica-isabela/components/ui/Tutorial/Step.tsx";

interface Colors {
  /**
   * @format color
   * @default #2f3136
   */
  icon: string;
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
  betweenTextAndCards: number;
  /**
   * @default 12
   */
  betweenCards: number;
  /**
   * @default 12
   */
  betweenIconAndContent: number;
}

interface Props {
  /**
   * @format html
   * @default <p>Header</p>
   */
  header: string;
  steps: StepProps[];
  colors: Colors;
  spacing: Spacing;
}

export default function Tutorial({ header, steps, colors, spacing }: Props) {
  const {
    betweenTextAndCards,
    betweenCards,
    betweenIconAndContent,
    container,
  } = spacing;
  const { icon, cardsBackground } = colors;

  return (
    <div
      class={"flex flex-col p-5 md:p-0" + (container ? " container" : "")}
      style={{
        "--card-gap": `${betweenIconAndContent}px`,
        "--icon-color": icon,
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: header }} />
      <ul
        class="flex flex-col gap-[var(--card-gap)] p-5 md:p-10"
        style={{
          gap: `${betweenCards}px`,
          backgroundColor: cardsBackground,
          marginTop: `${betweenTextAndCards}px`,
        }}
      >
        {steps.map((step, index) => (
          <Step key={index} {...step} />
        ))}
      </ul>
    </div>
  );
}
