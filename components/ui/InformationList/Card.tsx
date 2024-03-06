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

export default function Card({ image, text, href }: Props) {
  return (
    <li class="flex group gap-[var(--card-gap)] transition-all overflow-clip">
      <Wrapper href={href} class="order-[var(--card-image-order)] shrink-0">
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
