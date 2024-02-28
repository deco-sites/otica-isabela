import Icon, {
  AvailableIcons,
} from "deco-sites/otica-isabela/components/ui/Icon.tsx";

interface IIcon {
  id: AvailableIcons;
  /**
   * @default 24
   */
  size: number;
  /**
   * @default 2
   */
  strokeWidth: number;
}

/**
 * @title {{text}}
 */
interface IInformationList {
  icon: IIcon;
  /**
   * @default Content
   */
  text: string;
}

interface IInfomation {
  /**
   * @default Header
   */
  header: string;
  /**
   * @default Content
   */
  text: string;
  list: IInformationList[];
  /**
   * @default 12
   */
  spaceBetweenIconAndContent: number;
  /**
   * @default 12
   */
  spaceBetweenInformations: number;
  /**
   * @default 12
   */
  spaceBetweenHeaderAndText: number;
  /**
   * @default 12
   */
  spaceBetweenTextAndInformations: number;
}

/**
 * @title {{header}}
 */
interface IStep {
  /**
   * @default Header
   */
  header: string;
  /**
   * @default Content
   */
  text: string;
}

interface ITutorial {
  /**
   * @default Header
   */
  header: string;
  steps: IStep[];
  /**
   * @default 12
   */
  spaceBetweenHeaderAndCards: number;
  /**
   * @default 12
   */
  spaceBetweenCards: number;
  /**
   * @default 4
   */
  spaceBetweenCardHeaderAndCardText: number;
}

interface Props {
  information: IInfomation;
  tutorial: ITutorial;
  /**
   * @format color
   * @default #205589
   */
  backgroundColor: string;
  /**
   * @format color
   * @default #ffffff
   */
  color: string;
  /**
   * @default 12
   */
  spaceBetweenSections: number;
  /**
   * @default false
   */
  invert: boolean;
}

export default function Tutorial({
  information,
  tutorial,
  backgroundColor,
  color,
  invert,
  spaceBetweenSections,
}: Props) {
  return (
    <div style={{ backgroundColor }}>
      <div
        class="flex justify-center flex-col md:flex-row items-stretch p-5 md:p-10 container"
        style={{ color }}
      >
        <div class={"md:w-1/2" + (invert ? " order-2" : "")}>
          <h2 class="font-bold text-2xl">{information.header}</h2>
          <p
            style={{ marginTop: `${information.spaceBetweenHeaderAndText}px` }}
          >
            {information.text}
          </p>
          <ul
            style={{
              gap: information.spaceBetweenInformations,
              marginTop: `${information.spaceBetweenTextAndInformations}px`,
            }}
            class="grid grid-cols-2"
          >
            {information.list.map((item, index) => (
              <li
                key={index}
                class="flex  items-center"
                style={{ gap: `${information.spaceBetweenIconAndContent}px` }}
              >
                <Icon class="shrink-0" {...item.icon} />
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div
          class={
            "md:w-1/2 border-current" +
            (invert
              ? " mb-[var(--space)] pb-[var(--space)] border-b md:mb-0 md:pb-0 md:border-b-0 md:mr-[var(--space)] md:pr-[var(--space)] md:border-r"
              : " mt-[var(--space)] pt-[var(--space)] border-t md:mt-0 md:pt-0 md:border-t-0 md:ml-[var(--space)] md:pl-[var(--space)] md:border-l")
          }
          style={{ "--space": `${spaceBetweenSections}px` }}
        >
          <h2 class="font-bold text-2xl">{tutorial.header}</h2>
          <ul
            style={{
              gap: `${tutorial.spaceBetweenCards}px`,
              marginTop: `${tutorial.spaceBetweenHeaderAndCards}px`,
            }}
            class="flex flex-col"
          >
            {tutorial.steps.map((step, index) => (
              <li
                key={index}
                class="flex flex-col"
                style={{
                  gap: `${tutorial.spaceBetweenCardHeaderAndCardText}px`,
                }}
              >
                <h3 class="font-bold">{step.header}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
