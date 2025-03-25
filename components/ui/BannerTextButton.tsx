import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";

export interface BannerTextButton {
  /** @description text to be rendered on top of the text */
  title?: string;
  /** @description Text to be rendered after the title */
  text: string;
  /** @description href where the button will send to */
  href?: string;
  /** @description justify and align the text*/
  textAlign?: "center" | "left";
  image: {
    /** @description Image for big screens */
    desktop: LiveImage;
    /** @description Image for small screens */
    mobile: LiveImage;
    /** @description image alt text */
    alt: string;
    /** @description image align */
    imageAlign?: { desktop: "right" | "left"; mobile: "top" | "botton" };
  };
}

function BannerTextButton(
  { text, href, textAlign, title, image }: BannerTextButton,
) {
  return (
    <div
      class={` container flex  ${
        image?.imageAlign?.mobile === "top" ? "flex-col" : "flex-col-reverse"
      } lg:flex-row my-5`}
    >
      <div
        class={`flex text-center px-3 lg:px-0 lg:mt-0 flex-col justify-center items-center w-full lg:w-1/3 ${
          textAlign === "left" ? "pr-12 text-start" : "pr-4  items-end"
        } ${
          image?.imageAlign?.desktop === "left"
            ? "lg:pl-12 lg:pr-4 lg:order-1 lg:items-start"
            : "lg:pr-12 lg:pl-4 lg:items-end"
        } `}
      >
        {title && (
          <h2 class="text-4xl text-blue-300 font-bold lg:mt-6 ">
            {title}
          </h2>
        )}
        <p
          class={` w-full text-black text-lg lg:text-2xl font-normal ${
            textAlign === "center" ? "text-center" : "text-left"
          }  lg:mt-6 `}
        >
          {text}
        </p>
      </div>
      <a href={href} class="w-full lg:w-2/3 p-5 lg:p-0">
        <Picture
          preload
        >
          <Source
            src={image?.mobile}
            width={390}
            height={220}
            media="(max-width: 983px)"
          />
          <Source
            src={image?.desktop}
            width={730}
            height={410}
            media="(max-width: 984px)"
          />
          <img
            class="w-full rounded-lg"
            src={image?.mobile ?? image?.desktop}
            alt={image.alt}
            decoding="async"
            loading="lazy"
          />
        </Picture>
      </a>
    </div>
  );
}

export default BannerTextButton;
