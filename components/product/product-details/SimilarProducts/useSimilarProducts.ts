// useSimilarProducts.ts
import { useState } from "preact/hooks";
import type { ColorVariant, VariantState, HoverState } from "./types.ts";
import { getUniqueImages } from "./utils.ts";

export const useSimilarProducts = () => {
  const [selectedVariants, setSelectedVariants] = useState<
    Record<number, VariantState>
  >({});
  const [hoverStates, setHoverStates] = useState<Record<number, HoverState>>(
    {}
  );
  const [lastDisplayedImage, setLastDisplayedImage] = useState<
    Record<number, string>
  >({});

  const getActiveImages = (index: number, similar: any): string[] => {
    let images =
      selectedVariants[index]?.variant?.images ||
      similar?.image?.map((img: any) => img.url).filter(Boolean) ||
      [];

    return getUniqueImages(images);
  };

  const getDisplayImage = (index: number, similar: any): string => {
    let imageToDisplay: string;

    if (hoverStates[index]?.hoverImage) {
      imageToDisplay = hoverStates[index].hoverImage!;
    } else {
      const selectedVariant = selectedVariants[index];
      if (selectedVariant?.variant?.images.length > 0) {
        imageToDisplay =
          selectedVariant.variant.images[selectedVariant.currentImageIndex] ||
          selectedVariant.variant.images[0];
      } else if (similar?.image?.[0]) {
        imageToDisplay = similar.image[0].url || "";
      } else {
        imageToDisplay = "";
      }
    }

    const lastImage = lastDisplayedImage[index];
    if (lastImage !== imageToDisplay) {
      setLastDisplayedImage((prev) => ({
        ...prev,
        [index]: imageToDisplay,
      }));
    }

    return imageToDisplay;
  };

  const handleImageHover = (index: number, similar: any) => {
    const activeImages = getActiveImages(index, similar);

    if (activeImages.length > 1) {
      const currentIndex = selectedVariants[index]?.currentImageIndex || 0;
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
        setHoverStates((prev) => ({
          ...prev,
          [index]: { hoverImage: activeImages[nextIndex] },
        }));
      }
    }
  };

  const handleImageLeave = (index: number) => {
    setHoverStates((prev) => ({
      ...prev,
      [index]: { hoverImage: null },
    }));
  };

  const handleColorClick = (index: number, color: ColorVariant) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [index]: { variant: color, currentImageIndex: 0 },
    }));
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

      let imageToShow =
        color.images.find((img) => img !== currentDisplayedImage) ||
        color.images[0];

      if (imageToShow) {
        setHoverStates((prev) => ({
          ...prev,
          [index]: { hoverImage: imageToShow },
        }));
      }
    }
  };

  const handleColorLeave = (index: number) => {
    setHoverStates((prev) => ({
      ...prev,
      [index]: { hoverImage: null },
    }));
  };

  return {
    selectedVariants,
    getDisplayImage,
    handleImageHover,
    handleImageLeave,
    handleColorClick,
    handleColorHover,
    handleColorLeave,
  };
};
