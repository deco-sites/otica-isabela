import Icon from "$store/components/ui/Icon.tsx";
import type { AvailableIcons } from "$store/components/ui/Icon.tsx";

export interface IconTitleProps {
  firstLineText?: string;
  firstLineTextWeight?: "medium" | "semi-bold";
  secondLineText?: string;
  secondLineTextWeight?: "bold" | "normal";
  textAlignment?: "center" | "start";

  /**
   * @format color
   */
  firstLineTextColor?: string;
  /**
   * @format color
   */
  secondLineTextColor?: string;

  /**
   * @format color
   */
  backgroundColor?: string;

  hideIcon?: boolean;
  icon?: AvailableIcons;
  iconSize?: {
    width?: number;
    height?: number;
  };

  /**
   * @format color
   * @title Background Color
   */
}

const textAlignmentConfig = {
  center: "items-center",
  start: "items-start",
};

const secondLineTextWeightConfig = {
  "bold": 700,
  "normal": 400,
};

const firstLineTextWeightConfig = {
  "medium": 500,
  "semi-bold": 600,
};

export const IconTitle = (
  {
    backgroundColor = "transparent",
    icon,
    firstLineText,
    secondLineText,
    firstLineTextWeight = "medium",
    secondLineTextWeight = "bold",
    firstLineTextColor = "black",
    secondLineTextColor = "black",
    textAlignment = "center",
    hideIcon,
    iconSize,
  }: IconTitleProps,
) => {
  const { height, width } = iconSize ?? {};

  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      class={`w-full flex flex-col justify-center items-center  pt-10 pb-10 `}
    >
      <div
        class={`flex flex-col ${
          textAlignmentConfig[textAlignment]
        } justify-center`}
      >
        <span
          style={{
            color: firstLineTextColor,
            fontWeight: firstLineTextWeightConfig[firstLineTextWeight],
          }}
          class="flex items-center justify-start  font-medium text-xl md:text-[28px]  gap-x-2"
        >
          {firstLineText}
          {!hideIcon && icon && (
            <Icon width={width ?? 65} height={height ?? 34} id={icon} />
          )}
        </span>

        <span
          style={{
            color: secondLineTextColor,
            fontWeight: secondLineTextWeightConfig[secondLineTextWeight],
          }}
          class="text-black uppercase font-bebas-neue text-5xl md:text-[64px]  "
        >
          {secondLineText}
        </span>
      </div>
    </div>
  );
};
