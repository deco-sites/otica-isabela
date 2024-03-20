import { ITextStyle } from "deco-sites/otica-isabela/sdk/types.ts";

export const Alignments = {
  undefined: " justify-start",
  left: " justify-start",
  center: " justify-center",
  right: " justify-end",
};

export const FontWeights = {
  undefined: 400,
  Thin: 100,
  "Extra Light": 200,
  Light: 300,
  Regular: 400,
  Medium: 500,
  "Semi Bold": 600,
  Bold: 700,
  "Extra Bold": 800,
};

export const Headings = {
  undefined: "p",
  Span: "span",
  Paragraph: "p",
  "Heading 1": "h1",
  "Heading 2": "h2",
  "Heading 3": "h3",
  "Heading 4": "h4",
  "Heading 5": "h5",
  "Heading 6": "h6",
};

const toPx = (value: number | undefined) =>
  typeof value === "number" ? value + "px" : undefined;

const toCss = (key: string) => key.replace(/([A-Z])/g, "-$1").toLowerCase();

type ParsedStyle<T> = {
  [K in keyof T as K extends `hover${string}` ? never : K]:
    | string
    | number
    | undefined;
};

function parseStyle(style: ITextStyle, asCss: true, important: boolean): string;
function parseStyle(style: ITextStyle, asCss: true): string;
function parseStyle(style: ITextStyle, asCss: false): ParsedStyle<ITextStyle>;
function parseStyle(style: ITextStyle): ParsedStyle<ITextStyle>;
function parseStyle(
  style: ITextStyle,
  asCss = false,
  important = false,
): ParsedStyle<ITextStyle> | string {
  const { color, fontSize, fontWeight, letterSpacing, textAlign, lineHeight } =
    style;

  if (asCss) {
    return Object.entries(style).reduce((acc, [key, rawValue]) => {
      if (rawValue === undefined) return acc;

      const value = key === "fontWeight"
        ? typeof rawValue === "string"
          ? FontWeights[rawValue as keyof typeof FontWeights]
          : FontWeights.Regular
        : typeof rawValue === "number"
        ? toPx(rawValue)
        : rawValue;

      return `${acc}${toCss(key)}: ${value}${important ? " !important" : ""};`;
    }, "");
  }

  return {
    color: color,
    textAlign,
    fontSize: toPx(fontSize),
    letterSpacing: toPx(letterSpacing),
    lineHeight: toPx(lineHeight),
    fontWeight: fontWeight ? FontWeights[fontWeight] : undefined,
  };
}

export { parseStyle };
