import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { type FnContext } from "@deco/deco";
interface Benefit {
    /**
     * @title Ícone
     */
    icon: ImageWidget;
    /**
     * @title Descreve o ícone
     */
    alt: string;
    label: string;
}
interface Props {
    /**
     * @title Título
     */
    title: string;
    /**
     * @title Benefícios
     */
    benefits: Benefit[];
}
export default function ({ title, benefits }: Props) {
    return (<div class="max-w-[1200px] mx-auto w-[95%] flex flex-col max-[1200px]:items-center min-[1200px]:flex-row gap-5 mb-5 min-[768px]:mb-[90px]">
      <h3 class="min-[1200px]:w-[25%] text-2xl font-medium max-[1200px]:text-center max-[768px]:max-w-[340px]">
        {title}
      </h3>
      <div class="grid grid-cols-2 max-[768px]:grid-cols-1 min-[1200px]:w-[75%] gap-12">
        {benefits.map(({ icon, label, alt }) => (<div class="flex gap-8 items-center">
            <Image src={icon} alt={alt} width={75} height={75} class="max-[768px]:w-14 max-[768px]:h-14"/>
            <p class="font-light max-w-80 text-black leading-[1.4]">{label}</p>
          </div>))}
      </div>
    </div>);
}
export function loader(props: Props, req: Request, ctx: FnContext) {
    return { ...props, url: req.url, isMobile: ctx.device !== "desktop" };
}
