import Icon from "$store/components/ui/Icon.tsx";
import type { AvailableIcons } from "$store/components/ui/Icon.tsx";

interface IconTitleProps {
  iconText?: string;
  icon?: AvailableIcons;
  mainText?: string;
}

export const IconTitle = ({ iconText, mainText, icon }: IconTitleProps) => {
  return (
    <div class="w-full flex flex-col justify-center items-center mt-12 mb-6 md:mb-16   ">
      <div class="text-start">
        {iconText && (
          <span class="flex items-center font-semibold text-xl  md:text-3xl  gap-x-1 text-blue-100">
            {iconText} {icon && <Icon width={65} height={34} id={icon} />}
          </span>
        )}
        {mainText && (
          <span class="text-white uppercase font-bebas-neue font-normal  text-5xl md:text-[64px] ">
            {mainText}
          </span>
        )}
      </div>
    </div>
  );
};
