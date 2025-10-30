// ProductCard.tsx
import Slider from "$store/components/ui/Slider.tsx";
import { formatPrice } from "$store/sdk/format.ts";
// import WishlistButton from "$store/components/wishlist/WishlistButton.tsx";
import ColorSelector from "$store/islands/ColorSelectorSimilar.tsx";
import type { ProductCardProps } from "./types.ts";
import { calculateDiscountPercentage } from "./utils.ts";

const ProductCard = ({
    // page,
    similar,
    index,
    displayImage,
    getProperties,
    price,
    listPrice,
    colorVariants,
    selectedVariant,
    productUrl,
    onImageHover,
    onImageLeave,
    onColorClick,
    onColorHover,
    onColorLeave,
}: ProductCardProps) => {
    const hasDiscount = price < listPrice;
    const discountPercentage = hasDiscount
        ? calculateDiscountPercentage(price, listPrice)
        : 0;

    return (
        <Slider.Item
            index={index}
            className="carousel-item w-full flex-col justify-end"
        >
            <a href={productUrl || similar.url} className="card bg-base-100">
                <figure
                    className="relative mb-[10px] pt-4 max-lg:max-h-full rounded-[20px]"
                    style={{ aspectRatio: "306 / 170" }}
                    onMouseEnter={onImageHover}
                    onMouseLeave={onImageLeave}
                >
                    <img
                        src={displayImage}
                        alt={similar.value}
                        width={210}
                        height={210}
                        className="w-full"
                        loading="lazy"
                    />
                    {hasDiscount && (
                        <div className="badge badge-secondary absolute top-2 right-2">
                            {discountPercentage}% OFF
                        </div>
                    )}
                </figure>

                {
                    /* {page && (
                    <div className="absolute top-0 left-0 z-30">
                        <WishlistButton
                            productID={similar.IdProduct}
                            customer={page}
                        />
                    </div>
                )} */
                }

                <div className="card-body p-4">
                    <h4 className="text-black text-base leading-none h-[33px]">
                        {similar.value}
                    </h4>

                    <div className="min-h-[25px] my-[10px]">
                        {getProperties[index]?.length > 0 && (
                            <p className="text-xs font-normal leading-none text-base-200 line-clamp-3">
                                {getProperties[index].map((
                                    property: string,
                                    propIndex: number,
                                ) => (
                                    <span key={propIndex}>
                                        {property}
                                        {propIndex <
                                                getProperties[index].length - 1
                                            ? " / "
                                            : ""}
                                    </span>
                                ))}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-2 items-center max-lg:ml-5">
                        {hasDiscount && (
                            <span className="line-through text-[#6F6F6F]">
                                {formatPrice(listPrice, "BRL")}
                            </span>
                        )}
                        <span className="text-lg font-bold text-blue-200">
                            {formatPrice(price, "BRL")}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <ColorSelector
                            colorVariants={colorVariants}
                            selectedVariant={selectedVariant}
                            onColorClick={onColorClick}
                            onColorHover={onColorHover}
                            onColorLeave={onColorLeave}
                            similar={similar}
                        />

                        <button className="border-[1px] border-black hover:border-slot-primary-500 text-grayscale-700 hover:text-slot-primary-500 py-[5px] max-lg:py-1 px-4 max-lg:px-3 rounded-[17px] text-center">
                            <a
                                href={similar.url}
                                className="w-full font-semibold flex justify-end hover:underline text-sm max-lg:text-xs"
                            >
                                Experimentar
                            </a>
                        </button>
                    </div>
                </div>
            </a>
        </Slider.Item>
    );
};

export default ProductCard;
