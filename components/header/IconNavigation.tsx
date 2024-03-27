import type { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export interface IconNavigation {
  title: string;
  href: string;
  icon: AvailableIcons;
  mobileVisibility?: boolean;
}

interface Props {
  items?: IconNavigation[];
}

export const IconNavigation = ({ items }: Props) => {
  if (!items?.length) {
    return null;
  }

  return (
    <div class="flex flex-row gap-x-4 justify-center items-baseline lg:items-center">
      {items?.map(({ href, icon, title, mobileVisibility }) => {
        return (
          <a
            href={href}
            aria-label={`${title}-${href}`}
            class={`${
              mobileVisibility ? "flex" : "hidden lg:flex"
            } flex-col justify-center items-center group`}
          >
            <Icon
              id={icon}
              fill="none"
              width={26}
              height={26}
              strokeWidth={icon === "Heart" ? 2 : 0.4}
              class="text-white group-hover:text-blue-200 lg:mb-1"
            />
            <span class=" hidden lg:flex text-white text-xs group-hover:text-blue-200 font-normal whitespace-nowrap">
              {title}
            </span>
          </a>
        );
      })}
    </div>
  );
};
