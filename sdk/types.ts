/**
 * @title Add Image
 */
export interface IImage {
  /**
   * @format image-uri
   */
  src: string;
  alt: string;
  width: number;
  height: number;
  /**
   * @default false
   */
  preload?: boolean;
}

export interface ITextStyle {
  /**
   * @format color
   * @default #000
   */
  color: string;
  /**
   * @default 16
   */
  fontSize: number;
  /**
   * @default Regular
   */
  fontWeight:
    | "Thin"
    | "Extra Light"
    | "Light"
    | "Regular"
    | "Medium"
    | "Semi Bold"
    | "Bold"
    | "Extra Bold";
  letterSpacing: number;
  textAlign: "left" | "center" | "right";
  lineHeight: number;
  /**
   * @format color
   * @default #000000
   */
  hoverColor: string;
}
