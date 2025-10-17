import { Product } from "site/packs/v2/types.ts";

interface Color {
  name: string;
  slug: string;
  unitCodes: string[];
}

export const getAvailableColors = (product: Product): Array<Color> => {
  const availableColors: Array<Color> = [];
  const variants = product.relatedProducts;

  if (variants) {
    variants.forEach((variant) => {
      const colorProp = variant.attributes?.filter(
        (prop) => prop.type === "Cor"
      );

      if (!colorProp || colorProp.length === 0) {
        return;
      }

      const validColorCodes = colorProp
        .map((prop) => prop.color)
        .filter((color): color is string => typeof color === "string");

      availableColors.push({
        name: variant.name,
        slug: variant.slug,
        unitCodes: validColorCodes,
      });
    });
  }

  return availableColors;
};
