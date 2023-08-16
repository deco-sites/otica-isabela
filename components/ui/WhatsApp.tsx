import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

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
      class="fixed bottom-6 right-6 min-[1680px]:right-[15%] z-40"
      aria-label="WhatsApp"
    >
      <Image
        title="WhatsApp"
        width={50}
        height={50}
        src={image ?? ""}
        alt="WhatsApp"
      />
    </a>
  );
}

export default WhatsApp;
