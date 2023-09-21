import { PropertyValue } from "deco-sites/std/commerce/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

interface Color {
  name: string;
  url: string;
  unitCodes: string[];
}

const getColors = (
  properties: PropertyValue[],
): string[] => {
  return properties
    .filter((property) => property.propertyID === "color")
    .map((property) => property.unitCode!);
};

export const getAvailableColors = (product: Product): Array<Color> => {
  const availableColors: Array<Color> = [];

  if (product.isVariantOf) {
    const { isVariantOf: variant } = product;
    const variantColors = getColors(variant.additionalProperty!);

    variantColors.length && availableColors.push({
      name: variant.name!,
      url: variant.url?.split("/produto")[1]!,
      unitCodes: variantColors,
    });

    if (variant.hasVariant) {
      const { hasVariant } = variant;

      hasVariant.forEach((variant) => {
        const variantColors = getColors(variant.additionalProperty!);

        variantColors.length && availableColors.push({
          name: variant.name!,
          url: variant.url?.split("/produto")[1]!,
          unitCodes: variantColors,
        });
      });
    }
  }

  return availableColors;
};
