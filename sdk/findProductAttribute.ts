import { Product } from "site/packs/v2/types.ts";

export const findProductAttribute = (type: string, product: Product) => {
  return product.attributes?.find((prop) => prop.type === type);
};
