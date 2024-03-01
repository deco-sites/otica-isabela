import { IImage } from "deco-sites/otica-isabela/sdk/types.ts";
import Image from "apps/website/components/Image.tsx";

/**
 * @title Card
 */
export interface Props {
  image: IImage;
  /**
   * @default <p>Content</p>
   * @format html
   */
  text: string;
  href: string;
}

export default function Card({ image, text, href }: Props) {
  return (
    <li class="flex group gap-[var(--card-gap)] transition-all overflow-clip">
      <a href={href} class="order-[var(--card-image-order)] shrink-0">
        <Image
          class="object-cover rounded-md"
          width={image.width}
          height={image.height}
          src={image.src}
          alt={image.alt}
        />
      </a>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </li>
  );
}
