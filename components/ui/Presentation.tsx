import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { IImage } from "$store/sdk/types.ts";
import { type FnContext } from "@deco/deco";
interface Props {
    /**
     * @title Cor de fundo
     * @format color
     */
    backgroundColor: string;
    /**
     * @title Texto
     */
    text: HTMLWidget;
    desktop: IImage;
    mobile: IImage;
}
const image = {
    src: "https://fakeimg.pl/600x400",
    width: 600,
    height: 400,
    alt: "Placeholder",
};
export default function ({ backgroundColor = "#f5f5f5", text = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>", desktop = image, mobile = image, }: ReturnType<typeof loader>) {
    return (<div class="max-w-[1920px] w-full flex flex-col-reverse min-[768px]:flex-row justify-center items-center mx-auto mb-5 min-[768px]:mb-[90px]" style={{ backgroundColor }}>
      <div dangerouslySetInnerHTML={{ __html: text }} class={"max-[768px]:pb-10 max-[768px]:pr-5 min-[768px]:text-base max-w-3xl pl-5 pt-7 text-sm leading-[1.5] text-black" +
            " max-[768px]:[&_h1]:text-center min-[768px]:[&_h1]:text-2xl min-[850px]:[&_h1]:text-[34px] [&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:text-[34px] [&_h1]:font-semibold [&_h1]:!leading-[1.1]" +
            " [&_p]:max-w-[720px]" +
            " [&_a:hover]:text-[#d39d4e] [&_a]:underline" +
            " min-[768px]:[&_p:has(br)]:h-2.5 min-[850px]:[&_p:has(br)]:h-[unset]"}/>
      <Picture>
        <Source media="(min-width: 768px)" src={desktop.src} alt={desktop.alt} width={desktop.width} height={desktop.height}/>
        <Source media="(max-width: 767px)" src={mobile.src} alt={mobile.alt} width={mobile.width} height={mobile.height}/>
        <img src={desktop.src} alt={desktop.alt}/>
      </Picture>
    </div>);
}
export function loader(props: Props, req: Request, ctx: FnContext) {
    return { ...props, url: req.url, isMobile: ctx.device !== "desktop" };
}
