import { IImage } from "deco-sites/otica-isabela/sdk/types.ts";
import Image from "apps/website/components/Image.tsx";

/**
 * @title {{header}}
 */
export interface Props {
  image: IImage;
  /**
   * @default Header
   */
  header: string;
  /**
   * @default Content
   * @format textarea
   */
  text: string;
  href: string;
}

export default function Card({ image, header, text, href }: Props) {
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
      <a class="flex flex-col" href={href}>
        <h2 class="text-[var(--header-color)] group-hover:text-[var(--header-hover)] group-hover:[text-decoration:var(--header-text-decoration)] font-bold text-lg">
          {header}
        </h2>
        <p class="mt-[var(--text-spacing)] text-[var(--text-color)] group-hover:text-[var(--text-hover)] break-words">
          {text}
        </p>
      </a>
    </li>
  );
}
