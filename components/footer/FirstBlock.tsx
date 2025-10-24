import Icon from "$store/components/ui/Icon.tsx";
import type { IFirstBlock as FirstBlockProps } from "./Footer.tsx";

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
      <div class="flex flex-col text-center gap-y-0 lg:gap-y-2">
        <span class="text-blue-100 font-semibold text-lg lg:text-[28px]">
          {firstLabel}
        </span>
        <span class="text-white uppercase font-normal font-outfit text-5xl lg:text-6xl pt-1">
          {secondLabel}
        </span>
      </div>
      <div class="flex flex-row justify-between items-center w-full max-w-[240px] lg:max-w-sm">
        <a href={instagram} aria-label="Instagram">
          <Icon
            width="50px"
            height="50px"
            id="Instagram"
            style={{ color: "#000000" }}
          />
        </a>
        <a href={facebook} aria-label="Facebook">
          <Icon
            width="36px"
            height="36px"
            id="Facebook"
            style={{ color: "black" }}
          />
        </a>
        <a href={youtube} aria-label="Youtube">
          <Icon
            width="49px"
            height="36px"
            id="YouTube"
            style={{ color: "black" }}
          />
        </a>
      </div>.
    </section>
  );
};
