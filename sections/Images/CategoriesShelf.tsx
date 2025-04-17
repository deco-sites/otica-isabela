import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { usePartialSection as usePartialSection } from "@deco/deco/hooks";
/**
 * @titleBy name
 */
interface Item {
    /**
     * @title Nome
     */
    name: string;
    /**
     * @description Imagem
     */
    image: ImageWidget;
    /**
     * @title Link
     */
    url: string;
}
/**
 * @titleBy name
 */
interface Category {
    /**
     * @title Nome
     */
    name: string;
    /**
     * @title Itens
     */
    items: Item[];
    /**
     * @title Link de "Ver todos"
     */
    seeAllUrl: string;
}
interface Props {
    /**
     * @title Título
     */
    title: string;
    /**
     * @title Categorias
     */
    categories: Category[];
    /**
     * @ignore
     */
    tabIndex?: number;
}
export default function ({ title, categories, tabIndex = 0 }: Props) {
    const id = useId();
    const category = categories[tabIndex];
    return (
        <div
            id={id}
            class="max-w-[1320px] w-[95%] mx-auto flex flex-col gap-11 my-12"
        >
            <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
                <span class="text-2xl text-grayscale-700">{title}</span>

                <div class="flex items-center gap-6">
                    {categories.map(({ name }, index) => (
                        <button
                            type="button"
                            class={clx(
                                "transition-colors",
                                index === tabIndex
                                    ? "text-slot-primary-500"
                                    : "text-grayscale-700 hover:text-slot-primary-500",
                            )}
                            {...usePartialSection({
                                props: { tabIndex: index },
                            })}
                        >
                            {name}
                        </button>
                    ))}
                </div>

                <a
                    href={category.seeAllUrl}
                    class="text-grayscale-700 flex items-center gap-2"
                >
                    Ver todos
                    <Icon
                        id="chevron-right"
                        size={24}
                        class="text-grayscale-700"
                    />
                </a>
            </div>

            <div class="relative">
                <Slider class="carousel py-2 gap-[3.5vw] w-full">
                    {category.items.map(({ image, name, url }, index) => (
                        <Slider.Item
                            index={index}
                            class="carousel-item justify-center !w-[calc(50%-3.5vw+(3.5vw/2))] md:!w-[calc(33.333%-3.5vw+(3.5vw/3))] lg:!w-[calc(25%-3.5vw+(3.5vw/4))] xl:!w-[calc(20%-3.5vw+(3.5vw/5))]"
                        >
                            <a
                                href={url}
                                class="relative hover:text-slot-primary-500 hover:underline hover:underline-offset-4 rounded-lg overflow-hidden transition-shadow hover:shadow-[0_0_12px_2px_rgba(0,0,0,0.15)]"
                            >
                                <img
                                    src={image}
                                    alt={name}
                                    width={170}
                                    height={170}
                                    class="aspect-square"
                                />
                                <span class="absolute bottom-3 left-1/2 -translate-x-1/2 text-xl text-black">
                                    {name}
                                </span>
                            </a>
                        </Slider.Item>
                    ))}
                </Slider>

                <div class="flex items-center justify-between left-0 absolute top-1/2 -translate-y-1/2 w-full pointer-events-none">
                    <Slider.PrevButton class="size-8 rounded bg-grayscale-0 group flex justify-center items-center disabled:cursor-not-allowed duration-200 shadow pointer-events-auto">
                        <Icon
                            id="chevron-right"
                            class="rotate-180 text-slot-primary-500 transition-colors"
                        />
                    </Slider.PrevButton>
                    <Slider.NextButton class="size-8 rounded bg-grayscale-0 group flex justify-center items-center disabled:cursor-not-allowed duration-200 shadow pointer-events-auto">
                        <Icon
                            id="chevron-right"
                            class="text-slot-primary-500 transition-colors"
                        />
                    </Slider.NextButton>
                </div>
            </div>

            <SliderJS rootId={id} />
        </div>
    );
}
