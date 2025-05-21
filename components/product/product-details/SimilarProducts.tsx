import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { formatPrice } from "$store/sdk/format.ts";
import Icon from "site/components/ui/Icon.tsx";
import { useState } from "preact/hooks";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { type LoaderReturnType } from "@deco/deco";
import type { SectionProps } from "deco/types.ts";
import WishlistButton from "$store/components/wishlist/WishlistButton.tsx";

interface Props {
    /** @title Configurações do Loader */
    page: LoaderReturnType<ProductDetailsPage | null>;
}

interface ColorVariant {
    name: string;
    colorCode: string[];
    images: string[];
    productUrl: string;
}

interface VariantState {
    variant: ColorVariant | null;
    currentImageIndex: number;
}

interface HoverState {
    hoverImage: string | null;
}

const ColorSelector = ({
    colorVariants,
    selectedVariant,
    onColorClick,
    onColorHover,
    onColorLeave,
    similar,
}: {
    colorVariants: ColorVariant[];
    selectedVariant: ColorVariant | null;
    onColorClick: (color: ColorVariant) => void;
    onColorHover: (color: ColorVariant) => void;
    onColorLeave: () => void;
    similar: any;
}) => {
    return (
        <div className="flex gap-1 mt-2 max-lg:ml-5">
            {colorVariants.map((color) => {
                const isSelected = selectedVariant?.name === color.name;
                const wasCurrentColor = color.name === similar.value &&
                    !selectedVariant;
                const gradientColors = color.colorCode
                    .filter((code) => code.unitCode)
                    .map((code) => code.unitCode);

                return (
                    <div
                        className={`group cursor-pointer ${
                            isSelected || wasCurrentColor
                                ? "ring-1 ring-offset-2 ring-[#aaa] rounded-full mr-1"
                                : ""
                        }`}
                        onClick={(e) => {
                            e.preventDefault();
                            onColorClick(color);
                        }}
                        onMouseEnter={() => {
                            onColorHover(color);
                        }}
                        onMouseLeave={() => {
                            if (!isSelected) onColorLeave();
                        }}
                        title={color.name}
                    >
                        <div
                            style={{
                                background: gradientColors.length > 1
                                    ? `linear-gradient(${
                                        gradientColors.join(", ")
                                    })`
                                    : gradientColors[0],
                            }}
                            class="mask mask-circle h-4 w-4 bg-secondary hover:scale-125 transition-transform"
                        />
                    </div>
                );
            })}
        </div>
    );
};

const ProductCard = ({
    page,
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
}: {
    page: any;
    similar: any;
    getProperties: any;
    index: number;
    displayImage: string;
    price: number;
    listPrice: number;
    colorVariants: ColorVariant[];
    selectedVariant: ColorVariant | null;
    productUrl: string;
    onImageHover: () => void;
    onImageLeave: () => void;
    onColorClick: (color: ColorVariant) => void;
    onColorHover: (color: ColorVariant) => void;
    onColorLeave: () => void;
}) => {
    return (
        <Slider.Item
            index={index}
            className="carousel-item w-full flex-col justify-end"
            key={index}
        >
            <a href={productUrl || similar.url} className="card bg-base-100">
                <figure
                    className="relative mb-[10px] pt-4 max-lg:max-h-full rounded-[20px]"
                    style={{ aspectRatio: "306 / 170" }}
                    onMouseEnter={() => {
                        onImageHover();
                    }}
                    onMouseLeave={() => {
                        onImageLeave();
                    }}
                >
                    <img
                        src={displayImage}
                        alt={similar.value}
                        width={210}
                        height={210}
                        className="w-full"
                        loading="lazy"
                    />
                    {price < listPrice && (
                        <div className="badge badge-secondary absolute top-2 right-2">
                            {Math.round(100 - (price / listPrice * 100))}% OFF
                        </div>
                    )}
                </figure>

                        {page && (
          <div class="absolute top-0 left-0 z-30">
            <WishlistButton productID={similar.IdProduct} customer={page} />
          </div>
        )}

                <div className="card-body p-4">
                    <h4 className="text-black text-base leading-none h-[33px]">
                        {similar.value}
                    </h4>

                    <div class="min-h-[25px] my-[10px]">
                        {getProperties[0]?.length > 0 && (
                            <p class="text-xs font-normal leading-none text-base-200 line-clamp-3">
                                {getProperties[0].map((property, index) => (
                                    <span key={index}>
                                        {property}
                                        {index < getProperties[0].length - 1
                                            ? " / "
                                            : ""}
                                    </span>
                                ))}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-2 items-center max-lg:ml-5">
                        {price < listPrice && (
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

function SimilarProducts({ page }: SectionProps<typeof loader>) {
    const id = `similar-products-${useId()}`;
    const product = page?.product;

    const [selectedVariants, setSelectedVariants] = useState<
        Record<number, VariantState>
    >({});
    const [hoverStates, setHoverStates] = useState<Record<number, HoverState>>(
        {},
    );

    const [lastDisplayedImage, setLastDisplayedImage] = useState<
        Record<number, string>
    >({});

    const similarProducts = product?.additionalProperty?.filter(
        (prop) => prop.name === "Produto Similar",
    ) || [];

    if (similarProducts.length === 0) return null;

    const getColorVariants = (similar): ColorVariant[] => {
        const variants = similar.additionalProperty
            ?.filter((p) => p.propertyID?.includes("colorVariation"))
            .map((color) => {
                const colorCodeProp = color.additionalProperty?.filter(
                    (prop) => prop.unitCode,
                );

                let variantImages = color.image?.map((img) =>
                    img.url
                ).filter(Boolean) || [];
                let uniqueImages = [...new Set(variantImages)];

                if (uniqueImages.length === 0) {
                    uniqueImages = [
                        ...new Set(
                            similar.image?.map((img) => img.url).filter(
                                Boolean,
                            ) || [],
                        ),
                    ];
                }

                const variant = {
                    name: color.value || "Sem nome",
                    colorCode: colorCodeProp,
                    images: uniqueImages,
                    productUrl: color.url || similar.url || "",
                };

                return variant;
            }) || [];

        return variants;
    };

    const getActiveImages = (index: number, similar) => {
        let images = selectedVariants[index]?.variant?.images ||
            (similar?.image?.map((img) => img.url).filter(Boolean) || []);

        const uniqueImages = [...new Set(images)];

        if (uniqueImages.length !== images.length) {
            images = uniqueImages;
        }

        return images;
    };

    const getDisplayImage = (index: number, similar) => {
        let imageToDisplay;

        if (hoverStates[index]?.hoverImage) {
            imageToDisplay = hoverStates[index].hoverImage;
        } else {
            const selectedVariant = selectedVariants[index];
            if (selectedVariant?.variant?.images.length > 0) {
                imageToDisplay = selectedVariant.variant
                    .images[selectedVariant.currentImageIndex] ||
                    selectedVariant.variant.images[0];
            } else if (similar && similar.image && similar.image[0]) {
                imageToDisplay = similar.image[0].url || "";
            } else {
                imageToDisplay = "";
            }
        }

        const lastImage = lastDisplayedImage[index];
        if (lastImage === imageToDisplay) {
            console.log(
                "",
            );
        } else {
            setLastDisplayedImage((prev) => ({
                ...prev,
                [index]: imageToDisplay,
            }));
        }

        return imageToDisplay;
    };

    // Handlers
    const handleImageHover = (index: number, similar) => {
        const activeImages = getActiveImages(index, similar);

        if (activeImages.length > 1) {
            const currentIndex = selectedVariants[index]?.currentImageIndex ||
                0;
            const currentImage = activeImages[currentIndex];

            let nextIndex = (currentIndex + 1) % activeImages.length;
            let attempts = 0;

            while (
                activeImages[nextIndex] === currentImage &&
                attempts < activeImages.length
            ) {
                nextIndex = (nextIndex + 1) % activeImages.length;
                attempts++;
            }

            if (
                activeImages[nextIndex] !== currentImage ||
                attempts >= activeImages.length
            ) {
                setHoverStates((prev) => {
                    const newState = {
                        ...prev,
                        [index]: { hoverImage: activeImages[nextIndex] },
                    };
                    return newState;
                });
            } else {
                console.log("Could not find a different image for hover");
            }
        } else {
            console.log("Not enough images for hover effect");
        }
    };

    const handleImageLeave = (index: number) => {
        setHoverStates((prev) => {
            const newState = {
                ...prev,
                [index]: { hoverImage: null },
            };
            return newState;
        });
    };

    const handleColorClick = (index: number, color: ColorVariant) => {
        setSelectedVariants((prev) => {
            const newState = {
                ...prev,
                [index]: { variant: color, currentImageIndex: 0 },
            };
            return newState;
        });
        setHoverStates((prev) => ({
            ...prev,
            [index]: { hoverImage: null },
        }));
    };

    const handleColorHover = (index: number, color: ColorVariant) => {
        if (
            !selectedVariants[index] ||
            selectedVariants[index].variant?.name !== color.name
        ) {
            const currentDisplayedImage = getDisplayImage(index, null);

            let foundDifferentImage = false;
            let imageToShow = null;

            for (const img of color.images) {
                if (img !== currentDisplayedImage) {
                    imageToShow = img;
                    foundDifferentImage = true;
                    break;
                }
            }

            if (!foundDifferentImage && color.images.length > 0) {
                imageToShow = color.images[0];
            }

            if (imageToShow) {
                setHoverStates((prev) => {
                    const newState = {
                        ...prev,
                        [index]: { hoverImage: imageToShow },
                    };
                    return newState;
                });
            }
        } else {
            console.log("Color already selected, not changing hover state");
        }
    };

    const handleColorLeave = (index: number) => {
        setHoverStates((prev) => {
            const newState = {
                ...prev,
                [index]: { hoverImage: null },
            };
            return newState;
        });
    };
    const propertyOrder = [
        "Altura da Lente",
        "Largura da Lente",
        "Largura da Ponte",
        "Hastes",
        "Frente Total",
        "Aro",
    ];

    const propertyNameMap = {
        "Altura da Lente": "Altura",
        "Largura da Lente": "Largura",
        "Largura da Ponte": "Ponte",
        "Frente Total": "Frente",
    };

    const getProperties = similarProducts.map((similar) => {
        if (!similar.additionalProperty) return null;

        const filteredProps = similar.additionalProperty
            .filter((prop) => propertyOrder.includes(prop?.value))
            .sort((a, b) =>
                propertyOrder.indexOf(a.value) - propertyOrder.indexOf(b.value)
            );

        return filteredProps.map((property) => {
            const displayName = propertyNameMap[property.value] ||
                property.value;
            return `${displayName}: ${property?.name}mm`;
        });
    }).filter(Boolean);

    return (
        <div className="mt-10">
            <h3 className="text-2xl font-bold text-center mb-6">
                Produtos Similares
            </h3>
            <div className="w-full flex flex-col gap-0 md:gap-12 lg:gap-16">
                <div
                    id={id}
                    className="container flex flex-col px-0 sm:px-5 relative"
                >
                    <Slider className="carousel carousel-center sm:carousel-end gap-4 md:gap-6 col-span-full sm:px-0 px-2.5">
                        {similarProducts.map((similar, index) => {
                            const price = parseFloat(
                                similar.additionalProperty?.find((p) =>
                                    p.propertyID === "discountPrice"
                                )?.value || "0",
                            );
                            const listPrice = parseFloat(
                                similar.additionalProperty?.find((p) =>
                                    p.propertyID === "originalPrice"
                                )?.value || price.toString(),
                            );
                            const colorVariants = getColorVariants(similar);
                            const displayImage = getDisplayImage(
                                index,
                                similar,
                            );
                            const selectedVariant = selectedVariants[index]
                                ?.variant;
                            const productUrl = selectedVariant?.productUrl ||
                                similar.url;

                            return (
                                <ProductCard
                                    key={index}
                                    similar={similar}
                                    index={index}
                                    displayImage={displayImage}
                                    price={price}
                                    listPrice={listPrice}
                                    colorVariants={colorVariants}
                                    selectedVariant={selectedVariant}
                                    productUrl={productUrl}
                                    page={page}
                                    getProperties={getProperties}
                                    onImageHover={() => {
                                        handleImageHover(index, similar);
                                    }}
                                    onImageLeave={() => {
                                        handleImageLeave(index);
                                    }}
                                    onColorClick={(color) => {
                                        handleColorClick(index, color);
                                    }}
                                    onColorHover={(color) => {
                                        handleColorHover(index, color);
                                    }}
                                    onColorLeave={() => {
                                        handleColorLeave(index);
                                    }}
                                />
                            );
                        })}
                    </Slider>

                    <div className="flex items-center justify-between left-0 absolute top-1/2 -translate-y-1/2 w-full pointer-events-none">
                        <Slider.PrevButton className="size-8 rounded bg-grayscale-0 group flex justify-center items-center disabled:opacity-0 duration-200 shadow pointer-events-auto">
                            <Icon
                                id="chevron-right"
                                className="rotate-180 text-slot-primary-500 transition-colors"
                            />
                        </Slider.PrevButton>
                        <Slider.NextButton className="size-8 rounded bg-grayscale-0 group flex justify-center items-center disabled:opacity-0 duration-200 shadow pointer-events-auto">
                            <Icon
                                id="chevron-right"
                                className="text-slot-primary-500 transition-colors"
                            />
                        </Slider.NextButton>
                    </div>
                </div>
            </div>
            <SliderJS
                itemsPerPage={{
                    desktop: { 0: 3 },
                    mobile: { 0: 1 },
                }}
                rootId={id}
            />
        </div>
    );
}

export const loader = ({ page }: Props) => {
    return { page };
};

export default SimilarProducts;
