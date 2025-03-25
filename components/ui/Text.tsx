import { useId } from "$store/sdk/useId.ts";

/**
 * @title Ignore
 */
type Ignore = null;
/**
 * @title Set Color
 * @format color
 */
type SetColor = string;

/**
 * @title Add Text
 */
export interface IText {
  /**
   * @format html
   * @default <p>Title</p>
   */
  text: string;
  /**
   * @format color
   * @default #000000
   */
  color: string;
  onHover: SetColor | Ignore;
  /**
   * @description Max width of the text, e.g: 100%, 200px, 50%, etc.
   * @default 100%
   */
  maxWidth?: string;
}

export default function Text({ text, onHover, color, maxWidth }: IText) {
  const id = useId();

  return (
    <div
      style={{
        "--hover-color": onHover,
        "--color": color,
        "--max-width": maxWidth,
      }}
      class="transition-all group-hover:text-[var(--hover-color)] text-[var(--color)] md:max-w-[var(--max-width)]"
      id={id}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
