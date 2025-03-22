import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";

interface IconAndLink {
    /**
     * @title ‎
     * @description Ícone
     */
    icon: ImageWidget;
    /**
     * @title Texto
     */
    text: string;
    url?: string;
}

interface Ajuda {
    /**
     * @title Central de ajuda
     */
    centralDeAjuda: IconAndLink[];
    /**
     * @title Url do botão da central de ajuda
     */
    centralDeAjudaUrl: string;
    /**
     * @title Entre em contato
     */
    entreEmContato: IconAndLink[];
}

export interface Props {
    /**
     * @title Popup central de ajuda
     */
    ajuda: Ajuda;
}

function Help({ ajuda }: Pick<Props, "ajuda">) {
    return (
        <div class="relative">
            <input type="checkbox" id="info" class="peer hidden" />

            <label
                for="info"
                class="group cursor-pointer flex items-center justify-center"
            >
                <Icon
                    id="info"
                    width={22}
                    height={22}
                    class="text-slot-primary-600 group-hover:opacity-0 transition-opacity"
                />
                <Icon
                    id="info-fill"
                    width={22}
                    height={22}
                    class="text-slot-primary-600 opacity-0 group-hover:opacity-100 transition-opacity absolute"
                />
            </label>

            <div class="top-full right-0 absolute rounded-b-lg bg-white shadow-[0_4px_4px_rgba(0,0,0,0.1)] opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto transition-opacity w-screen max-w-[336px] z-30">
                <div class="pt-4 px-7 pb-10">
                    <label
                        for="info"
                        class="cursor-pointer absolute top-4 right-4"
                    >
                        <Icon
                            id="x"
                            width={24}
                            height={24}
                            class="text-grayscale-700"
                        />
                    </label>

                    <div class="flex flex-col gap-4">
                        <span class="text-grayscale-800 text-lg font-medium text-center">
                            Central de ajuda
                        </span>

                        <div class="flex flex-col divide-y divide-grayscale-200">
                            {ajuda.centralDeAjuda.map(({ icon, text, url }) => {
                                const Component = url ? "a" : "span";
                                const props = url ? { href: url } : {};

                                return (
                                    <Component
                                        {...props}
                                        class="text-grayscale-600 hover:text-slot-primary-500 hover:underline transition-colors flex items-center gap-2 py-3"
                                    >
                                        <Image
                                            src={icon}
                                            alt={text}
                                            width={24}
                                            height={24}
                                        />
                                        {text}
                                    </Component>
                                );
                            })}
                        </div>

                        <div class="h-12">
                            <a
                                href={ajuda.centralDeAjudaUrl}
                                class="flex-1 h-full border border-grayscale-600 flex justify-center items-center rounded-2xl text-slot-primary-500 font-bold text-sm hover:bg-slot-primary-500 hover:text-white hover:border-0 transition-colors"
                            >
                                Ajuda
                            </a>
                        </div>
                    </div>
                </div>

                <div class="bg-[#F3F3F3] pt-8 px-7 pb-4 flex flex-col gap-4">
                    <span class="text-grayscale-800 text-lg font-medium text-center">
                        Entre em contato
                    </span>

                    <div class="flex flex-col divide-y divide-grayscale-200">
                        {ajuda.entreEmContato.map(({ icon, text, url }) => {
                            const Component = url ? "a" : "span";
                            const props = url ? { href: url } : {};

                            return (
                                <Component
                                    {...props}
                                    class="text-grayscale-600 transition-colors flex items-center gap-2 py-3"
                                >
                                    <Image
                                        src={icon}
                                        alt={text}
                                        width={24}
                                        height={24}
                                    />
                                    {text}
                                </Component>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Help;
