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
      <div class="flex flex-col text-center">
        <span class="text-white  text-xl">{firstLabel}</span>
        <span class="text-white uppercase font-normal text-5xl ">
          {secondLabel}
        </span>
      </div>
      <div class="flex flex-row justify-between  items-center w-full max-w-[240px] ">
        {socialLinks?.map(({ icon, link }) => {
          if (!icon) {
            return;
          }
          return (
            <a href={link}>
              <Icon width="36px" height="36px" id={icon} />
            </a>
          );
        })}
      </div>
    </section>
  );
};
