import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface BannerTextButton {
  /** @description text to be rendered on top of the text */
  title?: string;
  /** @description Text to be rendered after the title */
  text: string;
  /** @description href where the button will send to */
  href?: string;
  /** @description justify and align the text (MOBILE ONLY)*/
  textAlign?: "center" | "left";
  image: {
    /** @description Image for big screens */
    desktop: LiveImage;
    /** @description Image for small screens */
    mobile: LiveImage;
    /** @description image alt text */
    alt?: string;
    /** @description image align (DESKTOP ONLY)*/
    imageAlign?: "right" | "left";
  };
}

function BannerTextButton(
  { text, href, textAlign, title, image }: BannerTextButton,
) {
  return (
    <div class=" container flex  flex-col-reverse lg:flex-row my-5 ">
      <div
        class={`flex text-center mt-4 lg:mt-0 flex-col justify-center items-center w-full lg:w-1/3 ${
          textAlign === "left"
            ? "pr-12 pl-4 items-start"
            : "pr-4 pl-12 items-end"
        } ${
          image?.imageAlign === "left"
            ? "lg:pl-12 lg:pr-4 lg:order-1 lg:items-start"
            : "lg:pr-12 lg:pl-4 lg:items-end"
        } `}
      >
        {title && (
          <h1 class="text-4xl text-blue-300 font-bold lg:mt-6 ">
            {title}
          </h1>
        )}
        <p
          class={` w-full text-black text-2xl font-normal ${
            textAlign === "center" ? "text-center" : "text-left"
          }  lg:mt-6 `}
        >
          {text}
        </p>
      </div>
      <a href={href} class="w-full lg:w-2/3">
        <Picture
          preload
        >
          <Source
            src={image?.mobile}
            width={690}
            media="(max-width: 983px)"
          />
          <Source
            src={image?.desktop}
            width={730}
            media="(max-width: 984px)"
          />
          <img
            class="w-full rounded-3xl"
            src={image?.desktop}
            alt={image?.alt ?? title}
          />
        </Picture>
      </a>
    </div>
  );
}

export default BannerTextButton;
