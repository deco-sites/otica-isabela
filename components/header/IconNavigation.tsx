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
    <div class="flex flex-row  gap-x-4  justify-center items-baseline  lg:items-center ">
      {items?.map(({ href, icon, title, mobileVisibility }) => {
        return (
          <a
            href={href}
            aria-label={`${title}-${href}`}
            class={` ${mobileVisibility ? "" : " hidden md:flex"} `}
          >
            <div class="flex flex-col justify-center items-center ">
              <Icon
                id={icon}
                fill="none"
                width={26}
                height={24}
                strokeWidth={0.4}
              />
              <span class=" hidden lg:flex  text-white text-xs font-sans  hover:text-blue-200 font-normal">
                {title}
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
};
