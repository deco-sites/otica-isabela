import { BasicImageAndLink } from "$store/components/ui/BasicImageAndLink.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  image?: LiveImage;
  alt?: string;
}

const DesktopFullWidthImage = ({ image, alt }: Props) => {
  if (!image) {
    return null;
  }

  return <BasicImageAndLink alt={alt} src={{ desktop: image }} />;
};

export default DesktopFullWidthImage;
