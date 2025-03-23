import { useSignal } from "@preact/signals";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { useEffect } from "preact/hooks";
import { delay } from "std/async/delay.ts";
import type { AppContext } from "../../apps/site.ts";
import { clx } from "../../sdk/clx.ts";
import type { Benefit } from "../Beneficios.tsx";
import Beneficios from "../Beneficios.tsx";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";

/**
 * @titleBy alt
 */
interface CarouselImage {
    desktop: ImageWidget;
    mobile: ImageWidget;
    /**
     * @title Descreva a imagem
     */
    alt: string;
}

interface Carousel {
    /**
     * @title O carrossel será infinito?
     * @default true
     */
    infinite?: boolean;
    /**
     * @title Intervalo entre cada imagem (em segundos)
     */
    interval: number;
}

interface Props {
    images: CarouselImage[];
    benefits: Benefit[];
    carousel: Carousel;
}

// https://easings.net/#easeInSine
function easeInSine(x: number): number {
    return 1 - Math.cos((x * Math.PI) / 2);
}

export default function Carrossel(
    { images, benefits, carousel, isMobile }: ReturnType<typeof loader>,
) {
    const { infinite = true, interval } = carousel;

    const duration = interval * 1000 * images.length;
    const total = images.length * duration;

    const chunks = Array(images.length)
        .fill(0)
        .map((_, i) => i * duration);

    const paused = useSignal(false);
    const tracking = useSignal(0);
    const current = useSignal(0);
    const steps = useSignal(0);

    const steps_num = duration / 10;
    const notify = useSignal(Promise.withResolvers<void>());

    useEffect(() => {
        (async () => {
            while (true) {
                if (paused.value) {
                    await notify.value.promise;
                    notify.value = Promise.withResolvers();
                }

                tracking.value = Math.min(
                    total,
                    (steps.value / steps_num) * total,
                );

                // Change image
                for (const [i, chunk] of chunks.entries()) {
                    if (tracking.value >= chunk) {
                        current.value = i;
                    }
                }

                await delay(duration / steps_num);
                steps.value += 1;

                if (steps.value >= steps_num) {
                    const promises = [];

                    // Reset tracking
                    for (let i = 0; i < steps_num; i++) {
                        promises.push(
                            setTimeout(() => {
                                tracking.value = easeInSine(
                                    (steps.value - i) /
                                        ((1 * 1000 * images.length) / 10),
                                ) * total;
                            }, 0),
                        );
                    }

                    await Promise.all(promises);
                    steps.value = 0;
                }
            }
        })();
    }, []);

    return (
        <>
            <div class="max-w-[1320px] w-full mx-auto relative lg:mb-16">
                {images.map(({ desktop, mobile, alt }, index) => (
                    <div
                        class={clx(
                            "w-full transition-opacity duration-700 lg:px-5 3xl:px-0",
                            index !== current.value && "opacity-0",
                            index !== 0 && "absolute left-0 top-0 h-full",
                        )}
                    >
                        <Picture>
                            <Source
                                media="(max-width: 768px)"
                                src={mobile}
                                width={768}
                                height={350}
                            />
                            <Source
                                media="(min-width: 769px)"
                                src={desktop}
                                width={1320}
                                height={430}
                            />
                            <img class="" src={desktop} alt={alt} />
                        </Picture>
                    </div>
                ))}

                <div class="flex items-center justify-between absolute top-1/2 -translate-y-1/2 w-full px-[3vw]">
                    <button
                        type="button"
                        class="bg-slot-primary-500 size-8 rounded flex justify-center items-center"
                        onClick={() => {
                            current.value = infinite
                                ? current.value - 1 < 0
                                    ? images.length - 1
                                    : current.value - 1
                                : Math.max(0, current.value - 1);
                            tracking.value = chunks[current.value];
                            steps.value = (steps_num / images.length) *
                                current.value;
                        }}
                    >
                        <Icon
                            id="chevron-right"
                            size={24}
                            class="text-white rotate-180"
                        />
                    </button>

                    <button
                        type="button"
                        class="bg-slot-primary-500 size-8 rounded flex justify-center items-center"
                        onClick={() => {
                            current.value = infinite
                                ? (current.value + 1) % images.length
                                : Math.min(
                                    images.length - 1,
                                    current.value + 1,
                                );
                            tracking.value = chunks[current.value];
                            steps.value = (steps_num / images.length) *
                                current.value;
                        }}
                    >
                        <Icon id="chevron-right" size={24} class="text-white" />
                    </button>
                </div>
            </div>
            <div class="w-full my-8">
                <Beneficios benefits={benefits} noMargin isMobile={true} />
            </div>
            {!isMobile && (
                <div class="max-w-[1320px] w-full mx-auto relative mb-16">
                    <div class="absolute left-1/2 -translate-x-1/2 bottom-3 flex flex-col items-center gap-4 w-full">
                        <div class="flex items-center gap-6">
                            <div class="flex items-center gap-2">
                                {images.map((_, index) => {
                                    const min = index * duration;
                                    const max = (index + 1) * duration;

                                    const percentage = Math.max(
                                        0,
                                        ((tracking.value - min) / (max - min)) *
                                            100,
                                    );

                                    return (
                                        <button
                                            type="button"
                                            class={clx(
                                                "w-20 h-1 rounded overflow-hidden bg-grayscale-0 relative",
                                            )}
                                        >
                                            <div
                                                class="h-full bg-slot-primary-600"
                                                style={{
                                                    width: `${
                                                        Math.min(
                                                            percentage,
                                                            100,
                                                        )
                                                    }%`,
                                                }}
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                            <button
                                type="button"
                                class="bg-slot-primary-500 size-8 rounded-full flex justify-center items-center active:scale-[0.85] active:brightness-[0.85]"
                                onClick={() => {
                                    if (paused.value) {
                                        notify.value.resolve();
                                    }

                                    paused.value = !paused.value;
                                }}
                            >
                                <Icon
                                    id="player"
                                    size={24}
                                    class="text-white"
                                />
                            </button>
                        </div>

                        <div class="max-lg:hidden w-full">
                            <Beneficios
                                benefits={benefits}
                                noMargin
                                isMobile={false}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export function loader(props: Props, _req: Request, ctx: AppContext) {
    return {
        ...props,
        isMobile: ctx.device !== "desktop",
    };
}
