import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

import { FirstBlock } from "./FirstBlock.tsx";
import { SecondBlock } from "./SecondBlock.tsx";
import { ThirdBlock } from "./ThirdBlock.tsx";
import { FourthBlock } from "./FourthBlock.tsx";

export interface FirstBlock {
  hideFirstBlock?: boolean;
  firstLabel?: string;
  secondLabel?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}

export interface SecondBlock {
  hideSecondBlock?: boolean;
  links?: { label?: string; items?: { label?: string; href?: string }[] }[];
}

export interface ThirdBlock {
  hideThirdBlock?: boolean;
  support?: {
    label?: string;
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
  securityInformation?: {
    label?: string;
    certificates?: {
      image?: LiveImage;
      label?: string;
      width?: number;
      height?: number;
    }[];

    date?: string;
  };
  payments?: {
    label?: string;
    methods?: {
      image?: LiveImage;
      alt?: string;
    };
  };
  logo?: {
    image?: LiveImage;
    description?: string;
  };
}

export interface FourthBlock {
  hideFourthBlock?: boolean;
  address?: string;
  socialName?: string;
}

export interface Props {
  /**
   * @title  Social Section
   */
  firstBlock?: FirstBlock;
  /**
   * @title  Links Section
   */
  secondBlock?: SecondBlock;
  /**
   * @title  Commercial Section
   */
  thirdBlock?: ThirdBlock;
  /**
   * @title Institutional Section
   */
  fourthBlock?: FourthBlock;
}

function Footer({
  secondBlock,
  firstBlock,
  thirdBlock,
  fourthBlock,
}: Props) {
  return (
    <footer class="w-full bg-black">
      <FirstBlock {...firstBlock} />
      <SecondBlock {...secondBlock} />
      <ThirdBlock {...thirdBlock} />
      <FourthBlock {...fourthBlock} />
    </footer>
  );
}

export default Footer;
