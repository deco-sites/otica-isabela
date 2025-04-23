import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Icon from "$store/components/ui/Icon.tsx";

/**
 * @titleBy title
 */
interface Item {
    /**
     * @title Ícone
     */
    icon: ImageWidget;
    /**
     * @title Título
     */
    title: string;
    /**
     * @title Descrição
     */
    description: string;
}

interface Button {
    /**
     * @title Texto
     */
    text: string;
    /**
     * @title Link
     */
    url: string;
}

interface Props {
    /**
     * @title Título
     */
    title: string;
    /**
     * @title Itens
     */
    items: Item[];
    /**
     * @title Botão
     */
    button: Button;
    /**
     * @description Banner Desktop
     */
    bannerDesktop: ImageWidget;
    /**
     * @description Banner Mobile
     */
    bannerMobile: ImageWidget;
    /**
     * @title Número de Clientes
     */
    clientsCount: string;
}

export default function (
    { title, items, button, bannerDesktop, bannerMobile, clientsCount }: Props,
) {
    return (
        <div class="max-w-[1300px] w-[95%] mx-auto mb-24 relative">
            <Picture>
                <Source
                    media="(max-width: 768px)"
                    src={bannerMobile}
                    width={768}
                    height={426}
                />
                <Source
                    media="(min-width: 769px)"
                    src={bannerDesktop}
                    width={1320}
                    height={426}
                />
                <img src={bannerDesktop} alt={title} />
            </Picture>

            <div class="lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-14 bg-grayscale-0 rounded-2xl">
                <div class="py-4 px-10 border-b border-b-grayscale-100 flex items-center justify-center">
                    <span class="text-xl font-bold text-grayscale-700">
                        {title}
                    </span>
                </div>
                <div class="py-4 px-11 flex flex-col items-center">
                    <div class="flex flex-col gap-4 mb-8">
                        {items.map(({ icon, title, description }) => (
                            <div class="flex items-center gap-6">
                                <Image
                                    src={icon}
                                    alt={title}
                                    width={32}
                                    height={32}
                                />

                                <div class="flex flex-col gap-0.5">
                                    <span class="text-grayscale-700">
                                        {title}
                                    </span>
                                    <span class="text-grayscale-600 text-xs">
                                        {description}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <a
                        href={button.url}
                        class="w-full h-12 rounded-2xl border border-grayscale-600 flex justify-center items-center text-slot-primary-500 font-bold text-sm hover:bg-slot-primary-500 hover:text-white hover:border-0 transition-colors mb-6"
                    >
                        {button.text}
                    </a>

                    <div class="flex items-center gap-2">
                        <div class="flex items-center gap-1">
                            <Icon
                                id="Star"
                                size={20}
                                class="text-slot-primary-500"
                            />
                            <Icon
                                id="Star"
                                size={20}
                                class="text-slot-primary-500"
                            />
                            <Icon
                                id="Star"
                                size={20}
                                class="text-slot-primary-500"
                            />
                            <Icon
                                id="Star"
                                size={20}
                                class="text-slot-primary-500"
                            />
                            <Icon
                                id="Star"
                                size={20}
                                class="text-slot-primary-500"
                            />
                        </div>

                        <span class="text-grayscale-500 text-sm">
                            {clientsCount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
