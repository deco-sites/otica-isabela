import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | ActionIcons
  | ListAndFilterIcons
  | CommunicationIcons
  | LocationIcons
  | RatingIcons
  | UtilityIcons
  | ResourceIcons
  | GlassesIcons
  | NavigationIcons
  | PaymentIcons
  | SocialMediaIcons;

/**
 * @title Icones de ações
 * @description Tipos para ícones de ações
 */
export type ActionIcons =
  | "Play"
  | "Copy"
  | "Minus"
  | "Plus"
  | "Return"
  | "Trash"
  | "XMark"
  | "CheckMarkCircle"
  | "Zoom";

/**
 * @title Icones de listas e filtros
 * @description Tipos para ícones de listas e filtros
 */
export type ListAndFilterIcons = "Bars3" | "FilterList" | "Ruler";

/**
 * @title Icones de comunicação
 * @description Tipos para ícones de comunicação
 */
export type CommunicationIcons = "Message" | "Phone" | "ShareButton";

/**
 * @title Icones de localização
 * @description Tipos para ícones de localização
 */
export type LocationIcons = "MapPin" | "Locale";

/**
 * @title Icones de avaliação
 * @description Tipos para ícones de avaliação
 */
export type RatingIcons =
  | "Heart"
  | "AddedHeart"
  | "Star"
  | "RatingStar"
  | "UnfilledRatings"
  | "Ratings";

/**
 * @title Icones de utilitários
 * @description Tipos para ícones de utilitários
 */
export type UtilityIcons =
  | "QuestionMarkCircle"
  | "QuestionBox"
  | "MagnifyingGlass"
  | "Magnifier"
  | "Camera"
  | "Stopwatch"
  | "Discount"
  | "Cloud"
  | "Balloons"
  | "BalloonsDoubt";

/**
 * @title Icones de recursos
 * @description Tipos para ícones de recursos
 */
export type ResourceIcons =
  | "Bulb"
  | "Truck"
  | "Logo"
  | "User"
  | "Filter"
  | "Order"
  | "ShoppingCart"
  | "WishListHeart"
  | "SuportePremium"
  | "GarantiaDoProduto"
  | "RecebaComLentes"
  | "ProvadorOnline"
  | "Home";

/**
 * @title Icones de óculos
 * @description Tipos para ícones de óculos
 */
export type GlassesIcons =
  | "MenGlassesLg"
  | "MenGlasses"
  | "GlassesAroClosed"
  | "CatGlasses";

/**
 * @title Icones de navegação
 * @description Tipos para ícones de navegação
 */
export type NavigationIcons =
  | "ArrowsPointingOut"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "ChevronDown"
  | "Close"
  | "ArrowDown";

/**
 * @title Icones de pagamento
 * @description Tipos para ícones de pagamento
 */
export type PaymentIcons =
  | "CreditCard"
  | "Diners"
  | "Elo"
  | "Mastercard"
  | "Pix"
  | "Visa";

/**
 * @title Icones de redes sociais
 * @description Tipos para ícones de redes sociais
 */
export type SocialMediaIcons =
  | "Facebook"
  | "Instagram"
  | "Linkedin"
  | "Twitter"
  | "WhatsApp"
  | "Tiktok"
  | "Discord"
  | "YouTube";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon({
  id,
  strokeWidth = 16,
  size,
  width,
  height,
  ...otherProps
}: Props) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
