import Icon, {
  AvailableIcons,
} from "site/components/ui/Icon.tsx";

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
interface Item {
  icon: IIcon;
  /**
   * @default Content
   */
  text: string;
}

interface Props {
  /**
   * @format html
   * @default <p>Content</p>
   */
  text: string;
  items: Item[];
  /**
   * @default 120
   */
  maxItemWidth: number;
  /**
   * @format color
   * @default #014567
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
  spaceBetweenTextAndItems: number;
  /**
   * @default 12
   */
  spaceBetweenIconAndText: number;
  /**
   * @default 12
   */
  spaceBetweenItems: number;
}

export default function BenefitList({
  text,
  items,
  maxItemWidth,
  backgroundColor,
  color,
  spaceBetweenTextAndItems,
  spaceBetweenIconAndText,
  spaceBetweenItems,
}: Props) {
  return (
    <div style={{ backgroundColor, color }}>
      <div class="container p-5 md:p-10">
        <div
          style={{ marginBottom: `${spaceBetweenTextAndItems}px` }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <ul
          class="flex flex-wrap justify-center"
          style={{ gap: `${spaceBetweenItems}px` }}
        >
          {items.map((item, index) => (
            <li
              key={index}
              style={{ maxWidth: `${maxItemWidth}px` }}
              class="flex flex-col items-center w-full"
            >
              <Icon {...item.icon} />
              <span
                class="text-center"
                style={{ marginTop: `${spaceBetweenIconAndText}px` }}
              >
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
