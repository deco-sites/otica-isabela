import Image from "deco-sites/std/components/Image.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  link?: string;
  image?: LiveImage;
}

function WhatsApp({ image, link }: Props) {
  if (!image) {
    return null;
  }

  return (
    <a
      href={link ?? "#"}
      class="fixed bottom-6 right-6 z-40"
      aria-label="WhatsApp"
    >
      <Image
        title="WhatsApp"
        width={50}
        height={50}
        src={image ?? ""}
        alt="WhatsApp"
        loading="eager"
        preload
      />
    </a>
  );
}

export default WhatsApp;
