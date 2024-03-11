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
  /**
   * @format color
   * @default #2f3136
   */
  color: string;
}

/**
 * @title {{name}}
 */
interface IInformationList {
  /**
   * @description Organization purpose only
   */
  name: string;
  icon: IIcon;
  /**
   * @format html
   * @default Content
   */
  text: string;
}

interface IInfomation {
  /**
   * @format html
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
  spaceBetweenTextAndInformations: number;
}

/**
 * @title {{name}}
 */
interface IStep {
  /**
   * @description Organization purpose only
   */
  name: string;
  /**
   * @format html
   */
  text: string;
}

interface ITutorial {
  /**
   * @format html
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
  dividerColor: string;
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
  dividerColor,
  invert,
  spaceBetweenSections,
}: Props) {
  return (
    <div style={{ backgroundColor }}>
      <div class="flex justify-center flex-col md:flex-row items-stretch p-5 md:p-10 container">
        <div class={"md:w-1/2" + (invert ? " order-2" : "")}>
          <div dangerouslySetInnerHTML={{ __html: information.text }}></div>
          <ul
            style={{
              gap: information.spaceBetweenInformations,
              marginTop: `${information.spaceBetweenTextAndInformations}px`,
            }}
            class="grid grid-cols-1 md:grid-cols-2"
          >
            {information.list.map((item, index) => (
              <li
                key={index}
                class="flex  items-center"
                style={{ gap: `${information.spaceBetweenIconAndContent}px` }}
              >
                <Icon class="shrink-0" {...item.icon} />
                <div dangerouslySetInnerHTML={{ __html: item.text }} />
              </li>
            ))}
          </ul>
        </div>
        <div
          class={
            "md:w-1/2" +
            (invert
              ? " mb-[var(--space)] pb-[var(--space)] border-b md:mb-0 md:pb-0 md:border-b-0 md:mr-[var(--space)] md:pr-[var(--space)] md:border-r"
              : " mt-[var(--space)] pt-[var(--space)] border-t md:mt-0 md:pt-0 md:border-t-0 md:ml-[var(--space)] md:pl-[var(--space)] md:border-l")
          }
          style={{
            "--space": `${spaceBetweenSections}px`,
            borderColor: dividerColor,
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: tutorial.header }} />
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
                dangerouslySetInnerHTML={{ __html: step.text }}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
