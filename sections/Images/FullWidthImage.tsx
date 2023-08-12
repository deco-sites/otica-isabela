import type { BasicImageAndLinkProps } from "$store/components/ui/BasicImageAndLink.tsx";
import { BasicImageAndLink } from "$store/components/ui/BasicImageAndLink.tsx";
export interface Props {
  image?: BasicImageAndLinkProps;
  activate?: boolean;
}

const DesktopFullWidthImage = ({ image, activate }: Props) => {
  if (!activate) {
    return null;
  }

  return <BasicImageAndLink {...image} />;
};

export default DesktopFullWidthImage;
