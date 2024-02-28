import { IImage } from "deco-sites/otica-isabela/sdk/types.ts";
import Image from "apps/website/components/Image.tsx";

/**
 * @title Add Link
 */
interface IHref {
  /**
   * @default Saiba mais >
   */
  label: string;
  /**
   * @default /
   */
  href: string;
}

/**
 * @title No Link
 */
type NoLink = null;

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
   * @format html
   * @default <p>Content</p>
   */
  text: string;
  link: IHref | NoLink;
}

export default function Card({ image, header, text, link }: Props) {
  return (
    <li class="flex flex-col group transition-all">
      <Image
        class="object-cover rounded-md w-full"
        width={image.width}
        height={image.height}
        src={image.src}
        alt={image.alt}
      />
      <h2 class="mt-[var(--header-spacing,12px)] text-[var(--header-color)] group-hover:text-[var(--header-hover)] group-hover:[text-decoration:var(--header-text-decoration)] font-bold text-lg">
        {header}
      </h2>
      <div
        class="mt-[var(--content-spacing,12px)] text-[var(--content-color)] group-hover:!text-[var(--content-hover)]"
        dangerouslySetInnerHTML={{ __html: text }}
      />
      {link && (
        <a
          class="mt-[var(--link-spacing,12px)] text-[var(--link-color)] group-hover:text-[var(--link-hover)] underline"
          href={link.href}
        >
          {link.label}
        </a>
      )}
    </li>
  );
}
