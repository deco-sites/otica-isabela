import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import FooterLinks from "./FooterLinks.tsx";
import { FooterSocial } from "./FooterSocial.tsx";

export interface SocialItem {
  icon?:
    | "Facebook"
    | "Instagram"
    | "YouTube";

  link?: string;
}

export interface Props {
  firstBlock?: {
    hideFirstBlock?: boolean;
    firstLabel?: string;
    secondLabel?: string;
    socialLinks?: SocialItem[];
  };
  secondBlock?: {
    hideSecondBlock?: boolean;
    links: { title?: string; items?: { title?: string; href?: string }[] }[];
  };

  thirdBlock?: {
    hideThirdBlock?: boolean;
    support?: {
      sectionTitle?: string;
      links?: {
        image?: LiveImage;
        label?: string;
        href?: string;
      }[];
      openingHours?: {
        hours?: { primaryLabel: string; secondaryLabel: string };
        observation?: string;
      };
    };
    securityInformation: {
      sectionTitle?: string;
      certificates?: {
        image?: LiveImage;
        alt?: string;
      }[];

      date?: string;
    };
    payments?: {
      sectionTitle?: string;
      methods?: {
        image?: LiveImage;
        alt?: string;
      };
    };
    logo?: {
      image?: LiveImage;
      description?: string;
    };
  };

  fourthBlock: {
    hideFourthBlock?: boolean;
    address?: string;
    socialName?: string;
  };
}

function Footer({
  secondBlock,
  firstBlock,
  thirdBlock,
  fourthBlock,
}: Props) {
  const { hideSecondBlock, links } = secondBlock ?? {};
  const { hideFirstBlock, ...firstBlockProps } = firstBlock ?? {};
  const { hideThirdBlock, support, securityInformation, payments, logo } =
    thirdBlock ?? {};
  const { methods, sectionTitle: paymentsTitle } = payments ?? {};
  const { links: suportLink, openingHours, sectionTitle: supportTile } =
    support ?? {};
  const { certificates, sectionTitle: certificatesTitle, date } =
    securityInformation ?? {};

  const { address, socialName, hideFourthBlock } = fourthBlock ?? {};

  return (
    <footer class="w-full bg-black">
      {hideFirstBlock && <FooterSocial {...firstBlockProps} />}
      {hideSecondBlock && <FooterLinks links={links ?? []} />}
      {hideThirdBlock && (
        <section class="container w-full flex flex-col lg:flex-row mt-8 gap-y-8  pb-8">

          
          <div class="w-full lg:w-1/4 flex flex-col gap-y-3 ">
            <h2 class="font-bold text-center lg:text-start text-base  text-blue-300 uppercase w-full ">
              {supportTile}
            </h2>
            {suportLink?.map(({ href, image, label }) => {
              return (
                <a class="flex items-center gap-x-3 pl-6 lg:pl-0" href={href}>
                  {image && <Image width={20} src={image} alt={label} />}
                  <span class="text-white font-normal text-xs">{label}</span>
                </a>
              );
            })}


            <div class="flex flex-col text-center lg:text-start text-white">
              <span class="text-base font-medium">
                {openingHours?.hours?.primaryLabel}
              </span>
              <span class="text-base font-medium">
                {openingHours?.hours?.secondaryLabel}
              </span>
              <span class="text-xs font-normal">
                {openingHours?.observation}
              </span>
            </div>
          </div>

          <div class="flex flex-col items-center lg:items-start w-full lg:w-1/4 gap-y-4 ">
            <h2 class="font-bold text-center lg:text-start text-base text-blue-300 uppercase w-full">
              {certificatesTitle}
            </h2>
            <div class=" w-5/6 flex  justify-center lg:justify-between items-center">
              {certificates?.map(({ alt, image }) => {
                if (!image) return null;
                return <Image width={100} height={40} src={image} alt={alt} />;
              })}
            </div>
            <span class=" w-full text-xs font-normal text-center lg:text-start  text-white">
              {date}
            </span>
          </div>

          <div class="flex flex-col items-center w-full lg:w-1/4  ">
            <h2 class="font-bold text-center lg:text-start text-base text-blue-300 uppercase w-full">
              {paymentsTitle}
            </h2>

            {methods?.image && (
              <div class="w-full flex justify-center lg:justify-start items-center">
                <Image
                  width={230}
                  height={150}
                  src={methods?.image}
                  alt={methods?.alt}
                />
              </div>
            )}
          </div>

          <div class=" flex justify-center lg:justify-start items-start w-full lg:w-1/4">
            {logo?.image && (
              <Image
                width={300}
                height={74}
                src={logo?.image}
                alt={logo?.description}
              />
            )}
          </div>
        </section>
      )}

      {hideFourthBlock && (
        <section class="w-full bg-base-500 ">
          <div class="container pb-5 pt-5 text-white flex flex-col lg:flex-row justify-between items-center text-xs font-bold gap-y-4 ">
            <span>{socialName}</span>
            <span>{address}</span>
          </div>
        </section>
      )}
    </footer>
  );
}

export default Footer;
