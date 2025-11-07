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
      const colorProp = variant.attributes?.find((prop) => prop.type === "Cor");

      if (!colorProp) {
        return;
      }

      const validColorCodes = colorProp.value
        .split(":")[1]
        .trim()
        .split("|")
        .filter((code) => code.trim() !== "");

      availableColors.push({
        name: variant.name,
        slug: variant.slug,
        unitCodes: validColorCodes,
      });
    });
  }

  return availableColors;
};
