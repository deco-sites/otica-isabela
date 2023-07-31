import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import FooterLinks from "./FooterLinks.tsx";


export type Link = {
  title?: string;
  href: string;
};

export type LinksSection = {
  title: string;
  items: Link[];
};

export interface SocialItem {
  icon:
    | "Facebook"
    | "Instagram"
    | "YouTube";

  link: string;
}

export interface Props {
  firstBlock?: {
    hideFirstBlock?: boolean;
    firstLabel?: string;
    second?: string;
    socialLinks: SocialItem[];
  };

  secondBlock?: {
    hideSecondBlock: boolean;
    links: LinksSection[];
  };

  thirdBlock?: {
    hideThirdBlock?: boolean;
    support: {
      title: string;
      links: {
        image: LiveImage;
        label: string;
        href: string;
      }[];
      openingHours: {
        hours: { primaryLabel: string; secondaryLabel: string };
        observation: string;
      };
    };
    securityInformation: {
      title?: string;
    };
    payments?: {
      title?: string;
      items: PaymentItem[];
    };
    logo?: {
      image: LiveImage;
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
}: Props) {
  const { hideSecondBlock, links } = secondBlock ?? {};
  return (
    <footer>
      {hideSecondBlock && <FooterLinks links={links ?? []} />}
    </footer>
  );
}

export default Footer;
