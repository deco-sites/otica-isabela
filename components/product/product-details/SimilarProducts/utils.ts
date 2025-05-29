// utils.ts
import type { ColorVariant } from "./types.ts";
import { PROPERTY_ORDER, PROPERTY_NAME_MAP } from "./constants.ts";

export const getColorVariants = (similar: any): ColorVariant[] => {
  const variants =
    similar.additionalProperty
      ?.filter((p: any) => p.propertyID?.includes("colorVariation"))
      .map((color: any) => {
        const colorCodeProp = color.additionalProperty?.filter(
          (prop: any) => prop.unitCode
        );

        let variantImages =
          color.image?.map((img: any) => img.url).filter(Boolean) || [];
        let uniqueImages = [...new Set(variantImages)];

        if (uniqueImages.length === 0) {
          uniqueImages = [
            ...new Set(
              similar.image?.map((img: any) => img.url).filter(Boolean) || []
            ),
          ];
        }

        return {
          name: color.value || "Sem nome",
          colorCode: colorCodeProp,
          images: uniqueImages,
          productUrl: color.url || similar.url || "",
        };
      }) || [];

  return variants;
};

export const getFormattedProperties = (similarProducts: any[]) => {
  return similarProducts
    .map((similar) => {
      if (!similar.additionalProperty) return null;

      const filteredProps = similar.additionalProperty
        .filter((prop: any) => PROPERTY_ORDER.includes(prop?.value))
        .sort(
          (a: any, b: any) =>
            PROPERTY_ORDER.indexOf(a.value) - PROPERTY_ORDER.indexOf(b.value)
        );

      return filteredProps.map((property: any) => {
        const displayName =
          PROPERTY_NAME_MAP[property.value as keyof typeof PROPERTY_NAME_MAP] ||
          property.value;
        return `${displayName}: ${property?.name}mm`;
      });
    })
    .filter(Boolean);
};

export const getPriceInfo = (similar: any) => {
  const price = parseFloat(
    similar.additionalProperty?.find(
      (p: any) => p.propertyID === "discountPrice"
    )?.value || "0"
  );
  const listPrice = parseFloat(
    similar.additionalProperty?.find(
      (p: any) => p.propertyID === "originalPrice"
    )?.value || price.toString()
  );

  return { price, listPrice };
};

export const calculateDiscountPercentage = (
  price: number,
  listPrice: number
): number => {
  return Math.round(100 - (price / listPrice) * 100);
};

export const getUniqueImages = (images: string[]): string[] => {
  const uniqueImages = [...new Set(images)];
  return uniqueImages.length !== images.length ? uniqueImages : images;
};
