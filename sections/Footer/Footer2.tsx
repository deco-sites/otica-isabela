import type { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import type { AppContext } from "../../apps/site.ts";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";

export default function ({
    sliderInfo,
    sigaNos,
    siteSeguro,
    responsabilidadeTecnica,
    meuPedido,
    sobre,
    ajudaeSuporte,
    nossasLentes,
    nossasLentes2,
    bottomTexts,
    isMobile,
}: ReturnType<typeof loader>) {
    const id = useId();

    const topics = {
        "Meu pedido": meuPedido,
        Sobre: sobre,
        "Ajuda e suporte": ajudaeSuporte,
        "Nossas Lentes": [...nossasLentes, ...nossasLentes2],
    };

    if (isMobile) {
        return (
            <footer class="bg-grayscale-700 w-full">
                <div>
                    {Object.entries(topics).map(([_title, items], index) => {
                        const id = useId();
                        const title = Object.keys(topics)[index];

                        if (!title) return null;

                        return (
                            <div class="flex flex-col border-b border-grayscale-600">
                                <input
                                    type="checkbox"
                                    id={id}
                                    class="peer hidden"
                                />

                                <label
                                    for={id}
                                    class="flex gap-3 items-center justify-between p-4 group text-slot-primary-500 relative"
                                >
                                    <div class="opacity-0 peer-checked:group-[]:opacity-100 pointer-events-none w-1 h-full bg-slot-primary-500 rounded-r-lg absolute left-0 top-0" />
                                    {title}
                                    <Icon
                                        id="chevron-right"
                                        size={20}
                                        class="peer-checked:group-[]:-rotate-90 rotate-90 text-slot-primary-500"
                                    />
                                </label>

                                <div class="grid grid-rows-[0fr] peer-checked:grid-rows-[1fr] transition-all">
                                    <div class="overflow-hidden">
                                        <div class="flex flex-col">
                                            {items.map((
                                                { text, url, newTab },
                                            ) => (
                                                <a
                                                    href={url}
                                                    target={newTab
                                                        ? "_blank"
                                                        : "_self"}
                                                    class="text-grayscale-0 px-4 py-2"
                                                >
                                                    {text}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div class="flex flex-col items-center gap-9 p-6">
                    <div class="flex items-center justify-center gap-4">
                        {sigaNos.map(({ icon, url, newTab }) => (
                            <a href={url} target={newTab ? "_blank" : "_self"}>
                                <Image
                                    src={icon}
                                    alt=""
                                    width={32}
                                    height={32}
                                />
                            </a>
                        ))}
                    </div>

                    <div class="flex flex-col gap-5">
                        <span class="text-slot-primary-400 text-xl font-medium">
                            Responsabilidade tecnica
                        </span>

                        <div class="flex items-center gap-2">
                            <img
                                src={responsabilidadeTecnica.icon}
                                alt=""
                                width={20}
                                height={24}
                            />

                            <div
                                dangerouslySetInnerHTML={{
                                    __html: responsabilidadeTecnica.text,
                                }}
                                class="text-grayscale-0"
                            />
                        </div>
                    </div>

                    <div class="flex items-center gap-4">
                        {siteSeguro.icons.map((icon) => (
                            <img src={icon} alt="" />
                        ))}
                    </div>
                </div>

                <div class="border-t border-t-grayscale-600">
                    <div class="flex flex-col items-center gap-2 px-4 py-6">
                        {bottomTexts.map(({ text }) => (
                            <span class="text-grayscale-0 text-center">
                                {text}
                            </span>
                        ))}
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer class="bg-grayscale-700 w-full">
            <div
                id={id}
                class="max-w-[1320px] w-[95%] mx-auto py-8 flex flex-col gap-11"
            >
                <div class="max-w-[750px] w-full mx-auto relative pb-6">
                    <Slider class="carousel gap-10 mx-auto max-w-[650px] w-full">
                        {sliderInfo.map((
                            { icon, title, description },
                            index,
                        ) => (
                            <Slider.Item
                                index={index}
                                class="carousel-item flex gap-3 items-center !w-[unset]"
                            >
                                <Image
                                    src={icon}
                                    alt=""
                                    width={20}
                                    height={20}
                                />

                                <div class="flex flex-col gap-0.5">
                                    <span class="text-grayscale-50">
                                        {title}
                                    </span>
                                    <span class="text-grayscale-50 font-light text-sm">
                                        {description}
                                    </span>
                                </div>
                            </Slider.Item>
                        ))}
                    </Slider>

                    <div class="flex items-center justify-between absolute left-[43%] top-[33%] -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none">
                        <Slider.PrevButton class="size-8 rounded group flex justify-center items-center disabled:opacity-0 duration-200 shadow pointer-events-auto">
                            <Icon
                                id="chevron-right"
                                class="rotate-180 text-grayscale-0 transition-colors"
                            />
                        </Slider.PrevButton>
                        <Slider.NextButton class="size-8 rounded group flex justify-center items-center disabled:opacity-0 duration-200 shadow pointer-events-auto">
                            <Icon
                                id="chevron-right"
                                class="text-grayscale-0 transition-colors"
                            />
                        </Slider.NextButton>
                    </div>
                </div>

                <div class="flex gap-[3.5vw]">
                    <div class="flex flex-col gap-6">
                        <div class="flex flex-col gap-5">
                            <span class="text-slot-primary-400 text-xl font-medium">
                                Siga-nos
                            </span>

                            <div class="flex items-center gap-4">
                                {sigaNos.map(({ icon, url, newTab }) => (
                                    <a
                                        href={url}
                                        target={newTab ? "_blank" : "_self"}
                                    >
                                        <Image
                                            src={icon}
                                            alt=""
                                            width={32}
                                            height={32}
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div class="flex flex-col gap-5">
                            <span class="text-slot-primary-400 text-xl font-medium">
                                Site Seguro
                            </span>

                            <div class="flex flex-col gap-3">
                                {siteSeguro.iconsWithText.map((
                                    { icon, title, description },
                                ) => (
                                    <div class="flex gap-2">
                                        <Image
                                            src={icon}
                                            alt=""
                                            width={28}
                                            height={28}
                                        />

                                        <div class="flex flex-col">
                                            <span class="text-grayscale-0">
                                                {title}
                                            </span>
                                            <span class="text-grayscale-300 font-light text-xs">
                                                {description}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div class="w-full h-px bg-grayscale-500" />

                            <div class="flex items-center gap-4">
                                {siteSeguro.icons.map((icon) => (
                                    <img src={icon} alt="" />
                                ))}
                            </div>
                        </div>

                        <div class="flex flex-col gap-5">
                            <span class="text-slot-primary-400 text-xl font-medium">
                                Responsabilidade tecnica
                            </span>

                            <div class="flex items-center gap-2">
                                <img
                                    src={responsabilidadeTecnica.icon}
                                    alt=""
                                    width={20}
                                    height={24}
                                />

                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: responsabilidadeTecnica.text,
                                    }}
                                    class="text-grayscale-0"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-wrap gap-[3.5vw]">
                        <div class="flex flex-col gap-6">
                            <div class="flex flex-col gap-4">
                                <span class="text-slot-primary-400 text-xl font-medium">
                                    Meu pedido
                                </span>

                                <div class="flex flex-col gap-2">
                                    {meuPedido.map(({ text, url, newTab }) => (
                                        <a
                                            href={url}
                                            target={newTab ? "_blank" : "_self"}
                                            class="text-grayscale-0"
                                        >
                                            {text}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div class="flex flex-col gap-4">
                                <span class="text-slot-primary-400 text-xl font-medium">
                                    Sobre
                                </span>

                                <div class="flex flex-col gap-2">
                                    {sobre.map(({ text, url, newTab }) => (
                                        <a
                                            href={url}
                                            target={newTab ? "_blank" : "_self"}
                                            class="text-grayscale-0"
                                        >
                                            {text}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col gap-4">
                            <span class="text-slot-primary-400 text-xl font-medium">
                                Ajuda e Suporte
                            </span>

                            <div class="flex flex-col gap-2">
                                {ajudaeSuporte.map(({ text, url, newTab }) => (
                                    <a
                                        href={url}
                                        target={newTab ? "_blank" : "_self"}
                                        class="text-grayscale-0"
                                    >
                                        {text}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div class="flex flex-col gap-4">
                            <span class="text-slot-primary-400 text-xl font-medium">
                                Nossas Lentes
                            </span>

                            <div class="flex flex-col gap-2">
                                {nossasLentes.map(({ text, url, newTab }) => (
                                    <a
                                        href={url}
                                        target={newTab ? "_blank" : "_self"}
                                        class="text-grayscale-0"
                                    >
                                        {text}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div class="flex flex-col gap-4">
                            <span class="text-slot-primary-400 text-xl font-medium">
                                Nossas Lentes
                            </span>

                            <div class="flex flex-col gap-2">
                                {nossasLentes2.map(({ text, url, newTab }) => (
                                    <a
                                        href={url}
                                        target={newTab ? "_blank" : "_self"}
                                        class="text-grayscale-0"
                                    >
                                        {text}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <SliderJS rootId={id} />
            </div>

            <div class="border-t border-t-grayscale-500">
                <div class="flex items-center justify-between gap-2 py-3 max-w-[1320px] w-[95%] mx-auto">
                    {bottomTexts.map(({ text }) => (
                        <span class="text-grayscale-0 text-center">{text}</span>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export function loader(props: Props, _req: Request, ctx: AppContext) {
    return {
        ...props,
        isMobile: ctx.device !== "desktop",
    };
}

/**
 * @titleBy title
 */
interface SliderInfo {
    /**
     * @title ‎
     * @description Ícone
     */
    icon: ImageWidget;
    /**
     * @title Título
     */
    title: string;
    /**
     * @title Descrição
     */
    description: string;
}

/**
 * @titleBy url
 */
interface SigaNos {
    /**
     * @title ‎
     * @description Ícone
     */
    icon: ImageWidget;
    /**
     * @title Link
     */
    url: string;
    /**
     * @title Abrir em nova aba?
     */
    newTab?: boolean;
}

/**
 * @titleBy title
 */
interface IconWithText {
    /**
     * @title ‎
     * @description Ícone
     */
    icon: ImageWidget;
    /**
     * @title Título
     */
    title: string;
    /**
     * @title Descrição
     */
    description: string;
}

interface SiteSeguro {
    /**
     * @title Ícones com texto
     */
    iconsWithText: IconWithText[];
    /**
     * @title Ícones
     */
    icons: ImageWidget[];
}

interface ResponsabilidadeTecnica {
    /**
     * @title ‎
     * @description Ícone
     */
    icon: ImageWidget;
    /**
     * @title Texto
     */
    text: RichText;
}

/**
 * @titleBy text
 */
interface ListItem {
    /**
     * @title Texto
     */
    text: string;
    /**
     * @title Link
     */
    url: string;
    /**
     * @title Abrir em nova aba?
     */
    newTab?: boolean;
}

/**
 * @titleBy text
 */
interface BottomText {
    /**
     * @title Texto
     */
    text: string;
}

interface Props {
    /**
     * @title Sliders
     */
    sliderInfo: SliderInfo[];
    /**
     * @title Siga-nos
     */
    sigaNos: SigaNos[];
    /**
     * @title Site seguro
     */
    siteSeguro: SiteSeguro;
    /**
     * @title Responsabilidade Técnica
     */
    responsabilidadeTecnica: ResponsabilidadeTecnica;
    /**
     * @title Meu pedido
     */
    meuPedido: ListItem[];
    /**
     * @title Sobre
     */
    sobre: ListItem[];
    /**
     * @title Ajuda e suporte
     */
    ajudaeSuporte: ListItem[];
    /**
     * @title Nossas lentes
     */
    nossasLentes: ListItem[];
    /**
     * @title Nossas lentes
     */
    nossasLentes2: ListItem[];
    /**
     * @title Texto de baixo
     */
    bottomTexts: BottomText[];
}
