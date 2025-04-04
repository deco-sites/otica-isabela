const HorizontalAlign = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
  full: "stretch",
};

/**
 * @title Add Button
 */
export interface Props {
  /**
   * @default Button
   */
  label: string;
  /**
   * @default /
   */
  href: string;
  /**
   * @title Background Color
   * @format color
   * @default #2f3136
   */
  color: string;
  /**
   * @title Text Color
   * @format color
   * @default #f3f3f3
   */
  labelColor: string;
  style?: "filled" | "outlined";
  /**
   * @default left
   */
  horizontalAlign: "left" | "center" | "right" | "full";
  /**
   * @title Abrir em nova guia?
   */
  blank?: boolean;
}

export default function Button({
  color,
  horizontalAlign,
  href,
  label,
  labelColor,
  style = "filled",
  blank,
}: Props) {
  return (
    <a
      href={href}
      target={blank ? "_blank" : ""}
      class="text-center py-3 px-4 rounded-md min-w-52"
      style={{
        ...(style === "filled"
          ? { backgroundColor: color }
          : { border: `1px solid ${color}` }),
        color: labelColor,
        alignSelf: HorizontalAlign[horizontalAlign],
      }}
    >
      {label}
    </a>
  );
}
