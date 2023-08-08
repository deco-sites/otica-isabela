import Icon from "$store/components/ui/Icon.tsx";
import type { AvailableIcons } from "$store/components/ui/Icon.tsx";

export interface IconTitleProps {
  icon?: AvailableIcons;

  /** @description Utilize %icon para atribuir a posição do icone. ex: Seja avisado das %icon OFERTAS E DESCONTOS  */
  label?: string;
}

export const IconTitle = (
  { icon, label }: IconTitleProps,
) => {
  const iconText = label ? label?.split("%icon") : [""];
  const iconTextLastIndex = iconText?.length - 1;
  const normalText = label ? label?.split("/n") : [""];
  const iconTextlastIndex = normalText?.length - 1;

  if (normalText.length > 1) {
    return (
      <div class="w-full flex flex-col justify-center items-center bg-gray-scale-100 pt-12 pb-10 ">
        <div class="text-start">
          {normalText.map((text, index) => (
            <>
              {index !== iconTextlastIndex && (
                <span class="flex items-start justify-start font-semibold text-xl  md:text-3xl  gap-x-1 text-blue-200">
                  {text}
                  {icon && <Icon width={65} height={34} id={icon} />}
                </span>
              )}

              {index > 0 && (
                <span class="text-black uppercase font-bebas-neue font-bold text-5xl md:text-[64px]  ">
                  {text}
                </span>
              )}
            </>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div class="w-full flex flex-col justify-center items-center mt-12 mb-6 md:mb-16   ">
      {iconText.map((text, index) => (
        <>
          {index !== iconTextLastIndex && icon && (
            <span class="flex items-center font-semibold text-xl  md:text-3xl  gap-x-1 text-blue-100">
              {text}
              <Icon width={65} height={34} id={icon} />
            </span>
          )}

          {index > 0 && (
            <span class="text-white uppercase font-bebas-neue font-normal  text-5xl md:text-[64px] ">
              {text}
            </span>
          )}
        </>
      ))}
    </div>
  );
};
