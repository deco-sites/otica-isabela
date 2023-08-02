import Icon from "$store/components/ui/Icon.tsx";
import type { FirstBlock as FirstBlockProps } from "./Footer.tsx";

export const FirstBlock = (
  { socialLinks, firstLabel = "", secondLabel = "", hideFirstBlock }:
    FirstBlockProps,
) => {
  const { facebook, instagram, youtube } = socialLinks ?? {};

  if (hideFirstBlock) {
    return null;
  }

  return (
    <section className="w-full bg-blue-300 flex flex-col items-center justify-center  pt-12 gap-y-8">
      <div class="flex flex-col text-center gap-y-0  lg:gap-y-2  ">
        <span class="text-blue-100 font-semibold text-lg lg:text-[28px]">
          {firstLabel}
        </span>
        <span class="text-white uppercase font-bold  text-2xl lg:text-4xl scale-y-150  ">
          {secondLabel}
        </span>
      </div>
      <div class="flex flex-row justify-between  items-center w-full max-w-[240px] lg:max-w-xs ">
        <a href={instagram}>
          <Icon width="50px" height="50px" id="Instagram" />
        </a>
        <a href={facebook}>
          <Icon width="36px" height="36px" id="Facebook" />
        </a>
        <a href={youtube}>
          <Icon width="49px" height="36px" id="YouTube" />
        </a>
      </div>.
    </section>
  );
};
