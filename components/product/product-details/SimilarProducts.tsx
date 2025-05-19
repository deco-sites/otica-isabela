import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useId } from "$store/sdk/useId.ts";
import Icon from "site/components/ui/Icon.tsx";

interface Props {
    product: Product;
}

function OtherColorsShelf({ product }: Props) {
    const id = `similar-products-shelf-${useId()}`;
    const getSimilarProducts = product.additionalProperty?.filter((similar) =>
        similar.name === "Produto Similar"
    );

    if (getSimilarProducts && getSimilarProducts.length <= 1) return null;

    return (
        <div class="mt-10">
            <h3 class="text-[32px] text-black text-center font-outfit font-bold">
                Produtos Similares
            </h3>
            <div class="w-full flex flex-col gap-0 md:gap-12 lg:gap-16 mt-10">
                <div
                    id={id}
                    class="container flex flex-col px-0 sm:px-5 relative"
                >
                    <Slider class="carousel carousel-center sm:carousel-end gap-0 md:gap-6 col-span-full row-start-2 row-end-5">
                        {getSimilarProducts?.map((similar, index) => (
                            <div class="flex flex-col">
                                <Slider.Item
                                    index={index}
                                    class="carousel-item w-full justify-center items-center"
                                >
                                    <a href={similar.url}>
                                        <Image
                                            class="max-w-[100%]"
                                            src={similar?.image[0]?.url!}
                                            alt={similar.value}
                                            width={260}
                                            height={260}
                                        />
                                    </a>
                                </Slider.Item>
                            </div>
                        ))}
                    </Slider>

                    <SliderJS
                        itemsPerPage={{
                            desktop: { 0: 3 },
                            mobile: { 0: 1 },
                        }}
                        rootId={id}
                    />

                    <div class="flex items-center justify-between absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[98%] pointer-events-none">
                        <Slider.PrevButton class="size-8 rounded bg-grayscale-0 group flex justify-center items-center disabled:opacity-0 duration-200 shadow pointer-events-auto">
                            <Icon
                                id="chevron-right"
                                class="rotate-180 text-slot-primary-500 transition-colors"
                            />
                        </Slider.PrevButton>
                        <Slider.NextButton class="size-8 rounded bg-grayscale-0 group flex justify-center items-center disabled:opacity-0 duration-200 shadow pointer-events-auto">
                            <Icon
                                id="chevron-right"
                                class="text-slot-primary-500 transition-colors"
                            />
                        </Slider.NextButton>
                    </div>

                    {/* Dots */}
                    <div class="flex flex-row w-full gap-x-3 justify-center items-center py-14">
                        {getSimilarProducts?.map((_, index) => (
                            <Slider.Dot
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OtherColorsShelf;
