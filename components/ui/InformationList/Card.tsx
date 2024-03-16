import Image from "apps/website/components/Image.tsx";
import { IImage } from "deco-sites/otica-isabela/sdk/types.ts";
import { ComponentChildren } from "preact";

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
  href?: string;
  /**
   * @ignore
   */
  columnOnMobile?: boolean;
}

function Wrapper({
  children,
  href,
  class: _class,
}: {
  children: ComponentChildren;
  href?: string;
  class?: string;
}) {
  if (!href) return <div class={_class}>{children}</div>;

  return (
    <a href={href} class={_class}>
      {children}
    </a>
  );
}

export default function Card({ image, text, href, columnOnMobile }: Props) {
  return (
    <li
      class={"flex group gap-[var(--m-card-gap)] md:gap-[var(--card-gap)] transition-all overflow-clip" +
        (columnOnMobile ? " flex-col md:flex-row" : "")}
    >
      <Wrapper
        href={href}
        class={"order-[var(--card-image-order)] shrink-0" +
          (columnOnMobile ? " self-center" : "")}
      >
        <Image
          class="object-cover rounded-md"
          width={image.width}
          height={image.height}
          src={image.src}
          alt={image.alt}
        />
      </Wrapper>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </li>
  );
}
