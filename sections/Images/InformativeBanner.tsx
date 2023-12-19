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

  return (
    <div
      class={`w-full ${image?.src?.mobile ? "flex" : "hidden"}   ${
        image?.src?.desktop ? "lg:flex" : "hidden"
      }  items-center justify-center bg-black py-3`}
    >
      <BasicImageAndLink
        {...image}
        height={{ desktop: 32, mobile: 32 }}
        width={{ desktop: 1275, mobile: 425 }}
      />
    </div>
  );
};

export default InformativeBanner;
