import { AvailableIcons } from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";

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
  verticalAlign: "top" | "middle" | "bottom";
}

const verticalAlign = {
  top: "self-start",
  middle: "self-center",
  bottom: "self-end",
};

/**
 * @title Step
 */
export interface Props {
  /**
   * @format html
   * @default <h2>Step</h2>
   */
  header: string;
  /**
   * @format html
   * @default <p>Content</p>
   */
  text: string;
  icon: IIcon;
  /**
   * @ignore
   */
  isMobile: boolean;
}

export default function Step({ icon, header, text, isMobile }: Props) {
  return (
    <li
      class={"flex gap-[var(--card-gap)] transition-all overflow-clip" +
        (isMobile ? " flex-col" : "")}
    >
      {isMobile
        ? (
          <>
            <div class="flex gap-3 items-center">
              <Icon
                id={icon.id}
                size={icon.size}
                strokeWidth={icon.strokeWidth}
                class={"text-[var(--icon-color)] shrink-0 " +
                  `${verticalAlign[icon.verticalAlign] ?? "self-start"}`}
              />
              <div dangerouslySetInnerHTML={{ __html: header }} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: text }} />
          </>
        )
        : (
          <>
            <Icon
              id={icon.id}
              size={icon.size}
              strokeWidth={icon.strokeWidth}
              class={"text-[var(--icon-color)] shrink-0 " +
                `${verticalAlign[icon.verticalAlign] ?? "self-start"}`}
            />
            <div class="space-y-2">
              <div dangerouslySetInnerHTML={{ __html: header }} />
              <div dangerouslySetInnerHTML={{ __html: text }} />
            </div>
          </>
        )}
    </li>
  );
}
