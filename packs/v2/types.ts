import { ProductDetailsPage, ProductListingPage } from "apps/commerce/types.ts";

export interface IsabelaProductListingPage
  extends Omit<ProductListingPage, "products" | "filters"> {
  products: Product[];
  filters: Facets;
}

export interface IsabelaProductDetailsPage
  extends Omit<ProductDetailsPage, "product"> {
  product: Product;
}
export interface Media {
  url: string;
  isVideo: boolean;
  tryOn: boolean;
  isModelMeasurements?: boolean;
}

export interface CategoryInfo {
  id: number;
  name: string;
  slug: string;
  parent?: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface ProductDescription {
  title: string;
  description: string;
}

export interface LensAttributes {
  isAllowedToAddLens: boolean;
  isLensWithoutPrescription: boolean;
  lensQuantityDescription: string;
}

export interface ProductInstallment {
  installmentText: string;
  installmentValue: number;
  installmentNumber: number;
}

export interface ProductPromotion {
  isDayOffer: boolean;
  allowsCountdown: boolean;
  countdown?: {
    start: string;
    end: string;
  };
}

export interface Product {
  id: number;
  skuId: number;
  name: string;
  code: string;
  slug: string;
  medias: Media[];
  category: CategoryInfo;
  productGrouperCode?: string;
  price: number;
  priceWithDiscount: number;
  hasDiscount: boolean;
  canBuyWithPrescriptionLenses?: boolean;
  tryOn?: boolean;
  isAvailable: boolean;
  installments?: ProductInstallment[];
  attributes: ProductAttribute[];
  lensAttributes?: LensAttributes[];
  relatedProducts?: RelatedProduct[];
  descriptions?: ProductDescription[];
  productRating?: number;
  promotion?: ProductPromotion;
}

export interface ProductAttribute {
  id: number;
  type: string;
  value: string;
  color?: string;
}

export interface RelatedProduct {
  id: number;
  name: string;
  code: string;
  slug: string;
  attributes: ProductAttribute[];
  isAvailable?: boolean;
  medias?: Media[];
}

export interface Facets {
  isAvailable?: Record<string, boolean>;
  hasDiscount?: Record<string, boolean>;
  categoryName?: Record<string, number>;
  subCategoryName?: Record<string, number>;
  productPriceWithDiscount?: Record<string, number>;
  brandName?: Record<string, number>;
  facet_attribute_formato?: Record<string, number>;
  facet_attribute_estilo?: Record<string, number>;
  facet_attribute_material?: Record<string, number>;
  facet_attribute_tipo?: Record<string, number>;
  "facet_attribute_cor/attributeValue"?: Record<string, number>;
  facet_attribute_tamanho?: Record<string, number>;
  facet_attribute_idade?: Record<string, number>;
  facet_attribute_lentes?: Record<string, number>;
  facet_attribute_descarte?: Record<string, number>;
  facet_attribute_marca_da_lente?: Record<string, number>;
  facet_attribute_indicacao_de_uso?: Record<string, number>;
}

export interface Category {
  id?: number;
  name: string;
  slug: string;
  href: string;
  subcategories?: SubCategory[];
}

export interface SubCategory {
  id?: number;
  name: string;
  slug: string;
  href: string;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface PriceRange {
  range: string;
  count: number;
  order: number;
}

export interface Filter {
  key: string;
  operator: "eq" | "between" | "in" | "contains" | "range";
  value: string | number;
  label: string;
}
