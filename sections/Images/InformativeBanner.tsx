import type { BasicImageAndLinkProps } from "$store/components/ui/BasicImageAndLink.tsx";
import { BasicImageAndLink } from "$store/components/ui/BasicImageAndLink.tsx";
export interface Props {
  hidden?: boolean;
  image?: BasicImageAndLinkProps;
}

const InformativeBanner = ({ image, hidden }: Props) => {
  if (hidden) {
    return null;
  }

  return <BasicImageAndLink {...image} />;
};

export default InformativeBanner;
