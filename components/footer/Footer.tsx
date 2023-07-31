import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import FooterLinks from "./FooterLinks.tsx";
import type { FooterSocial as FooterSocialProps } from "./FooterSocial.tsx";
import { FooterSocial } from "./FooterSocial.tsx";

import type { LinkBlockProps } from "./FooterLinks.tsx";

interface SecondBlock {
  hideSecondBlock?: boolean;
  links: {
    title?: string;
    items?: {
      href?: string;
      title: string;
    }[];
  }[];
}
interface FirstBlock extends FooterSocialProps {
  hideFirstBlock?: boolean;
}

export interface Props {
  firstBlock?: FirstBlock;
  secondBlock?: SecondBlock;

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
    address: string;
    socialName: string;
  };
}

function Footer({
  secondBlock,
  firstBlock,
  thirdBlock,
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

  return (
    <footer class="w-full bg-black">
      {hideFirstBlock && <FooterSocial {...firstBlockProps} />}
      {hideSecondBlock && <FooterLinks links={links ?? []} />}
      {hideThirdBlock && (
        <section class="container">
          <div class="">
            <h2>{supportTile}</h2>
            {suportLink?.map(({ href, image, label }) => {
              return (
                <a href={href}>
                  {image && <Image width={20} src={image} alt={label} />}
                  <span>{label}</span>
                </a>
              );
            })}
            <div>
              <span>{openingHours?.hours?.primaryLabel}</span>
              <span>{openingHours?.hours?.secondaryLabel}</span>
              <span>{openingHours?.observation}</span>
            </div>
          </div>

          <div class="">
            <h2>{certificatesTitle}</h2>
            {certificates?.map(({ alt, image }) => {
              if (!image) return null;
              return <Image width={140} src={image} alt={alt} />;
            })}
            <span>{date}</span>
          </div>
          <div class="">
            <h2>{paymentsTitle}</h2>

            {methods?.image && (
              <Image width={140} src={methods.image} alt={methods.alt} />
            )}
          </div>

          {logo?.image && (
            <Image width={140} src={logo.image} alt={logo.description} />
          )}
        </section>
      )}
    </footer>
  );
}

export default Footer;
