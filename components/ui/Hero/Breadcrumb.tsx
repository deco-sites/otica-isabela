import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import { ITextStyle } from "deco-sites/otica-isabela/sdk/types.ts";
import { Alignments, parseStyle } from "deco-sites/otica-isabela/sdk/utils.ts";

/**
 * @title {{{label}}}
 */
interface IBreadCrumbItem {
  label: string;
  href: string;
}

export interface IBreadCrumb {
  align: "left" | "center" | "right";
  items: IBreadCrumbItem[];
  /**
   * @default 12
   */
  separatorSize: number;
  textStyle?: ITextStyle;
}

export default function BreadCrumb({
  align,
  items,
  separatorSize,
  textStyle,
}: IBreadCrumb) {
  if (!items.length) return <></>;

  const style = textStyle && parseStyle(textStyle);

  return (
    <ul
      style={{
        ...style,
        ...(textStyle?.hoverColor && { "--hover-color": textStyle.hoverColor }),
      }}
      class={"flex items-center gap-1" +
        (Alignments[align] || Alignments.left) +
        (textStyle?.color ? " group" : "")}
    >
      {items.map((item, index) => (
        <>
          <li key={index}>
            <a
              class={"hover:underline" +
                (textStyle?.color
                  ? " group-hover:text-[var(--hover-color)]"
                  : "")}
              href={item.href}
              aria-current={index === items.length - 1 ? "page" : undefined}
            >
              {item.label}
            </a>
          </li>
          {index !== items.length - 1 && (
            <li key={index + "-separator"}>
              <Icon id="Separator" size={separatorSize} />
            </li>
          )}
        </>
      ))}
    </ul>
  );
}
