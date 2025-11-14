// SimilarProducts.tsx
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Icon from "site/components/ui/Icon.tsx";
import ProductCard from "./ProductCard.tsx";
import { useSimilarProducts } from "./useSimilarProducts.ts";
import { getColorVariants, getFormattedProperties, getPriceInfo, } from "./utils.ts";
import type { Props } from "./types.ts";
import { type SectionProps } from "@deco/deco";
function SimilarProducts({ page }: SectionProps<typeof loader>) {
    const id = `similar-products-${useId()}`;
    const product = page?.product;
    const { selectedVariants, getDisplayImage, handleImageHover, handleImageLeave, handleColorClick, handleColorHover, handleColorLeave, } = useSimilarProducts();
    const similarProducts = product?.additionalProperty?.filter((prop) => prop.name === "Produto Similar") || [];
    if (similarProducts.length === 0)
        return null;
    const getProperties = getFormattedProperties(similarProducts);
    return (<div className="my-10 md:my-14">
            <h3 className="text-2xl font-bold text-center mb-6 lg:mb-12">
                Mais inspirações para o seu novo visual
            </h3>

            <div className="w-full flex flex-col gap-0 md:gap-12 lg:gap-16">
                <div id={id} className="container flex flex-col px-0 sm:px-5 relative">
                    <Slider className="carousel carousel-center sm:carousel-end gap-4 md:gap-6 col-span-full sm:px-0 px-2.5">
                        {similarProducts.map((similar, index) => {
            const { price, listPrice } = getPriceInfo(similar);
            const colorVariants = getColorVariants(similar);
            const displayImage = getDisplayImage(index, similar);
            const selectedVariant = selectedVariants[index]
                ?.variant;
            const productUrl = selectedVariant?.productUrl ||
                similar.url;
            return (<ProductCard key={`${similar.IdProduct || similar.url}-${index}`} similar={similar} index={index} displayImage={displayImage} price={price} listPrice={listPrice} colorVariants={colorVariants} selectedVariant={selectedVariant} productUrl={productUrl} page={page} getProperties={getProperties} onImageHover={() => handleImageHover(index, similar)} onImageLeave={() => handleImageLeave(index)} onColorClick={(color) => handleColorClick(index, color)} onColorHover={(color) => handleColorHover(index, color)} onColorLeave={() => handleColorLeave(index)}/>);
        })}
                    </Slider>

                    <div className="flex items-center justify-between left-0 absolute top-1/2 -translate-y-1/2 w-full pointer-events-none">
                        <Slider.PrevButton className="size-8 rounded bg-grayscale-0 group flex justify-center items-center disabled:opacity-0 duration-200 shadow pointer-events-auto">
                            <Icon id="chevron-right" className="rotate-180 text-slot-primary-500 transition-colors"/>
                        </Slider.PrevButton>
                        <Slider.NextButton className="size-8 rounded bg-grayscale-0 group flex justify-center items-center disabled:opacity-0 duration-200 shadow pointer-events-auto">
                            <Icon id="chevron-right" className="text-slot-primary-500 transition-colors"/>
                        </Slider.NextButton>
                    </div>
                </div>
            </div>

            <SliderJS itemsPerPage={{
            desktop: { 0: 3 },
            mobile: { 0: 1 },
        }} rootId={id}/>
        </div>);
}
export const loader = ({ page }: Props) => {
    return { page };
};
export default SimilarProducts;
