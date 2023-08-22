import Icon from "$store/components/ui/Icon.tsx";
import type { AvailableIcons } from "$store/components/ui/Icon.tsx";

export interface IconTitleProps {
  firstLineText?: string;
  firstLineTextFont?: "bebas" | "roboto";
  firstLineFontSize?: {
    mobile?: "text-xl" | "text-3xl" | "text-5xl" | "text-7xl";
    desktop?: "text-xl" | "text-3xl" | "text-5xl" | "text-7xl";
  };
  firstLineTextWeight?: "medium" | "semi-bold";
  secondLineText?: string;
  secondLineFontSize?: {
    mobile?: "text-xl" | "text-3xl" | "text-5xl" | "text-7xl";
    desktop?: "text-xl" | "text-3xl" | "text-5xl" | "text-7xl";
  };
  secondLineTextFont?: "bebas" | "roboto";
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

const textFontConfig = {
  "bebas": "font-bebas-neue",
  "roboto": "",
};

const fontSizeConfig = {
  "text-xl": "text-xl",
  "text-3xl": "text-3xl",
  "text-5xl": "text-5xl",
  "text-7xl": "text-7xl",
};

export const IconTitle = (
  {
    backgroundColor = "transparent",
    icon,
    firstLineText,
    firstLineTextWeight = "medium",
    firstLineFontSize,
    firstLineTextFont = "roboto",
    secondLineText,
    secondLineFontSize,
    secondLineTextWeight = "bold",
    firstLineTextColor = "black",
    secondLineTextColor = "black",
    secondLineTextFont = "bebas",
    textAlignment = "center",
    hideIcon,
  }: IconTitleProps,
) => {
  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      class={`w-full flex flex-col justify-center items-center pt-10 pb-10 `}
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
          class={`flex items-center justify-start ${
            textFontConfig[firstLineTextFont]
          } ${fontSizeConfig[firstLineFontSize?.mobile ?? "text-xl"]}
          lg:${
            fontSizeConfig[firstLineFontSize?.desktop ?? "text-xl"]
          } gap-x-2`}
        >
          {firstLineText}
          {!hideIcon && icon && <Icon width={65} height={34} id={icon} />}
        </span>

        <span
          style={{
            color: secondLineTextColor,
            fontWeight: secondLineTextWeightConfig[secondLineTextWeight],
          }}
          class={`text-black ${textFontConfig[secondLineTextFont]}
          ${fontSizeConfig[secondLineFontSize?.mobile ?? "text-5xl"]}
          lg:${fontSizeConfig[secondLineFontSize?.desktop ?? "text-7xl"]}
          `}
        >
          {secondLineText}
        </span>
      </div>
    </div>
  );
};
