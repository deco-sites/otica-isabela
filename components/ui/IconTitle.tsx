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
  const parts = label ? label?.split("%icon") : [""];
  const lastIndex = parts?.length - 1;

  return (
    <div class="w-full flex flex-col justify-center items-center mt-12 mb-6 md:mb-16   ">
      <div>
        {parts.map((part, index) => (
          <>
            {index !== lastIndex && icon && (
              <span class="flex items-center font-semibold text-xl  md:text-3xl  gap-x-1 text-blue-100">
                {part}
                <Icon width={65} height={34} id={icon} />
              </span>
            )}

            {index > 0 && (
              <span class="text-white uppercase font-bebas-neue font-normal  text-5xl md:text-[64px] ">
                {part}
              </span>
            )}
          </>
        ))}
      </div>
    </div>
  );
};
