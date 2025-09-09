import { PropertyValue } from "apps/commerce/types.ts";
import type { Product } from "apps/commerce/types.ts";

interface Color {
  name: string;
  url: string;
  unitCodes: string[];
}

interface PropertyValueWithColor extends PropertyValue {
  color?: string;
}

export const getAvailableColors = (product: Product): Array<Color> => {
  const availableColors: Array<Color> = [];

  if (product.isVariantOf) {
    const { isVariantOf } = product;
    const variants = isVariantOf?.hasVariant;

    if (variants) {
      variants.forEach((variant) => {
        const colorProp = variant.additionalProperty?.filter(
          (prop) => prop.name === "Cor"
        );

        if (!colorProp || colorProp.length === 0) {
          return;
        }

        const validColorCodes = colorProp
          .map((prop: PropertyValueWithColor) => prop.color)
          .filter((color): color is string => typeof color === "string");

        availableColors.push({
          name: variant.name!,
          url: variant.url?.split("/produto")[1]!,
          unitCodes: validColorCodes,
        });
      });
    }
  }

  return availableColors;
};
