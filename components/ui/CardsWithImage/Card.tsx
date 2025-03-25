import { IImage } from "$store/sdk/types.ts";
import Image from "apps/website/components/Image.tsx";

/**
 * @title {{header}}
 */
export interface Props {
  /**
   * @title Name
   * @description Organization purpose only
   */
  header: string;
  image: IImage;
  /**
   * @format html
   * @default <p>Content</p>
   */
  text: string;
}

export default function Card({ image, text }: Props) {
  return (
    <li class="flex flex-col group transition-all">
      <Image
        class="object-cover rounded-md w-full"
        width={image.width}
        height={image.height}
        src={image.src}
        alt={image.alt}
      />
      <div
        class="mt-[var(--content-spacing,12px)] text-[var(--content-color)] group-hover:!text-[var(--content-hover)]"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </li>
  );
}
