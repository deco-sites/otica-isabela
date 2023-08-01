import Icon from "$store/components/ui/Icon.tsx";

export interface SocialItem {
  icon?:
    | "Facebook"
    | "Instagram"
    | "YouTube";

  link?: string;
}

export interface FooterSocialProps {
  firstLabel?: string;
  secondLabel?: string;
  socialLinks?: SocialItem[];
}

export const FooterSocial = (
  { socialLinks, firstLabel = "", secondLabel = "" }: FooterSocialProps,
) => {
  return (
    <section className="w-full bg-blue-300 flex flex-col items-center justify-center pb-12 pt-12 gap-y-8">
      <div class="flex flex-col text-center gap-y-0  lg:gap-y-2  ">
        <span class="text-blue-100 font-semibold text-lg lg:text-[28px]">
          {firstLabel}
        </span>
        <span class="text-white uppercase font-bold bebas text-2xl lg:text-4xl scale-y-150  ">
          {secondLabel}
        </span>
      </div>
      <div class="flex flex-row justify-between  items-center w-full max-w-[240px] lg:max-w-xs ">
        {socialLinks?.map(({ icon, link }) => {
          if (!icon) {
            return;
          }
          return (
            <a href={link}>
              <Icon width="46px" height="46px" id={icon} />
            </a>
          );
        })}
      </div>
    </section>
  );
};
