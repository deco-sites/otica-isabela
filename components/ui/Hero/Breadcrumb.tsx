import Icon from "site/components/ui/Icon.tsx";
import { Alignments } from "site/sdk/utils.ts";

/**
 * @title {{name}}
 */
interface IBreadCrumbItem {
  /**
   * @description Organization purpose only
   */
  name: string;
  /**
   * @format html
   */
  label: string;
}

/**
 * @title Add Breadcrumb
 */
export interface IBreadCrumb {
  align: "left" | "center" | "right";
  items: IBreadCrumbItem[];
  /**
   * @default 12
   */
  separatorSize: number;
  /**
   * @format color
   * @default #000000
   */
  separatorColor: string;
}

export default function BreadCrumb({
  align,
  items,
  separatorSize,
  separatorColor,
}: IBreadCrumb) {
  if (!items.length) return <></>;

  return (
    <ul
      class={"flex items-center gap-1" + (Alignments[align] || Alignments.left)}
    >
      {items.map((item, index) => (
        <>
          <li
            class="hover:underline"
            key={index}
            dangerouslySetInnerHTML={{ __html: item.label }}
          >
          </li>
          {index !== items.length - 1 && (
            <li style={{ color: separatorColor }} key={index + "-separator"}>
              <Icon id="ChevronRight" size={separatorSize} strokeWidth={2} />
            </li>
          )}
        </>
      ))}
    </ul>
  );
}
