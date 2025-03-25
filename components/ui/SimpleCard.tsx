import { HTMLWidget } from "apps/admin/widgets.ts";
import { IImage } from "$store/sdk/types.ts";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { FnContext } from "deco/mod.ts";

interface Props {
  /**
   * @title Texto
   */
  text: HTMLWidget;
  /**
   * @title Cor de fundo
   * @format color
   */
  backgroundColor: string;
  desktop: IImage;
  mobile: IImage;
  /**
   * @title Remover cor de fundo do texto no mobile
   */
  removeTextBgOnMobile?: boolean;
  /**
   * @title O card é pequeno?
   */
  isSmall?: boolean;
}

export default function ({
  text,
  desktop,
  mobile,
  backgroundColor,
  isMobile,
  removeTextBgOnMobile,
  isSmall,
}: ReturnType<typeof loader>) {
  return (
    <div
      class={"w-[95%] flex flex-col min-[768px]:flex-row justify-center items-center mx-auto gap-y-10 mb-5 min-[768px]:mb-[90px] " +
        (isSmall ? " max-w-[1200px]" : "max-w-[1920px]") +
        (isMobile && removeTextBgOnMobile
          ? " max-[768px]:!bg-transparent"
          : "")}
      style={{
        backgroundColor,
      }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: text }}
        class={"min-[768px]:w-1/2 min-[768px]:p-5 min-[1000px]:p-20 min-[768px]:text-base max-w-3xl text-sm leading-[1.5] text-black h-full flex flex-col justify-center max-[768px]:items-center max-[768px]:text-center" +
          " [&_:is(h1,h2)]:text-2xl min-[768px]:[&_:is(h1,h2)]:text-4xl [&_:is(h1,h2)]:mb-3 [&_:is(h1,h2)]:font-semibold [&_:is(h1,h2)]:!leading-[1.1]" +
          " [&_p]:max-w-[450px]" +
          " [&_a:hover]:text-[#d39d4e] [&_a]:underline" +
          " min-[768px]:[&_p:has(br)]:h-2.5 min-[850px]:[&_p:has(br)]:h-[unset]"}
      />
      <Picture class="min-[768px]:w-1/2">
        <Source
          media="(min-width: 768px)"
          src={desktop.src}
          alt={desktop.alt}
          width={desktop.width}
          height={desktop.height}
        />
        <Source
          media="(max-width: 767px)"
          src={mobile.src}
          alt={mobile.alt}
          width={mobile.width}
          height={mobile.height}
        />
        <img src={desktop.src} alt={desktop.alt} class="w-full max-w-[unset]" />
      </Picture>
    </div>
  );
}

export function loader(props: Props, req: Request, ctx: FnContext) {
  return { ...props, url: req.url, isMobile: ctx.device !== "desktop" };
}
