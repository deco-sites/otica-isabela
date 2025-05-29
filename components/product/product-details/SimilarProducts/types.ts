// types.ts
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { type LoaderReturnType } from "@deco/deco";

export interface Props {
  /** @title Configurações do Loader */
  page: LoaderReturnType<ProductDetailsPage | null>;
}

export interface ColorVariant {
  name: string;
  colorCode: string[];
  images: string[];
  productUrl: string;
}

export interface VariantState {
  variant: ColorVariant | null;
  currentImageIndex: number;
}

export interface HoverState {
  hoverImage: string | null;
}

export interface ProductCardProps {
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
}

export interface ColorSelectorProps {
  colorVariants: ColorVariant[];
  selectedVariant: ColorVariant | null;
  onColorClick: (color: ColorVariant) => void;
  onColorHover: (color: ColorVariant) => void;
  onColorLeave: () => void;
  similar: any;
}
