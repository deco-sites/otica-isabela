export interface Category {
  id: number;
  name: string;
  slug: string;
  parent?: Category | null;
}

export interface ProductMedia {
  url: string;
  isVideo: boolean;
}

export interface ProductAttribute {
  id: number;
  type: string;
  value: string;
  color?: string;
}

export interface ProductDescription {
  title: string;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  code: string;
  slug: string;
  category: Category;
  productGrouperCode: string;
  price: number;
  priceWithDiscount: number;
  productRating: number;
  hasDiscount: boolean;
  isAvailable: boolean;
  medias: ProductMedia[];
  attributes: ProductAttribute[];
  relatedProducts?: Partial<Product>[];
  descriptions?: ProductDescription[];
}

export type FacetValues = Record<string, number>;
