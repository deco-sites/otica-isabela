import type { Props as SearchbarProps } from "$store/islands/Search.tsx";
import type { BasicImageAndLinkProps } from "$store/components/ui/BasicImageAndLink.tsx";
import { BasicImageAndLink } from "$store/components/ui/BasicImageAndLink.tsx";
import PromotionalBar from "$store/islands/PromotionalBar.tsx";
import Alertas from "site/islands/Alertas.tsx";
import type { IconLoginLinkProps } from "./IconLoginLink.tsx";
// import type { IconNavigation as IconNavigationType } from "./IconNavigation.tsx";
import type { NavItemProps } from "./NavItem.tsx";
import type { Props as AjudaProps } from "./Ajuda.tsx";
import Navbar from "./Navbar.tsx";
import type { GiftValueReachInfosProps } from "./PromotionalBar.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import { AppContext } from "site/apps/site.ts";
import type { SectionProps } from "deco/mod.ts";

interface AlertText {
  /**
   * @format html
   * @title Texto
   */
  text: string;
  /**
   * @format html
   * @title Texto Mobile
   */
  textMobile: string;
  /**
   * @title ‎
   * @description Ícone da esquerda
   */
  leftImage?: ImageWidget;
  /**
   * @title ‎
   * @description Ícone da direita
   */
  rightImage?: ImageWidget;
}

interface AlertMessages {
  /**
   * @title Alert background color
   * @format color
   * @default #C0C0C0
   */
  backgroundHex?: string;
  texts: AlertText[];
  interval: number;
}

export interface Props {
  /**
   * @title Alert Messages
   */
  alertMessages?: AlertMessages;
  /**
   * @title Header background color
   * @format color
   * @default #C0C0C0
   */
  backgroundHex?: string;
  /**
   * @title Melhorar espaçamentos do header?
   */
  navBarSpace?: boolean;
  /** @title Barra de Pesquisa */
  searchbar?: SearchbarProps;
  /** @title Popup central de ajuda */
  ajuda?: AjudaProps;
  /**
   * @title Itens de navegação
   * @description Itens de navegação dos menus desktop e mobile
   */
  navItems?: NavItemProps[];
  /**
   * @title Link de Login
   */
  loginLink?: IconLoginLinkProps;
  // /**
  //  * @title  Ícones de Navegação
  //  * @description Navegação com ícones
  //  */
  // IconNavigation?: IconNavigationType[];
  /**
   * @title  Informações de valor da barra de presente
   * @description Configure o valor base para comparação e os textos a serem apresentados
   */
  giftValueReachInfos?: GiftValueReachInfosProps;
  /**
   * @title Top Banner Promocional
   */

  promotionalTopBanner?: {
    activate?: boolean;
    image?: BasicImageAndLinkProps;
  };
}

function Header({
  alertMessages,
  backgroundHex,
  searchbar,
  ajuda,
  navItems,
  // IconNavigation,
  giftValueReachInfos,
  loginLink,
  promotionalTopBanner,
  navBarSpace,
  // isMobile,
}: SectionProps<typeof loader>) {
  const { activate, image } = promotionalTopBanner ?? {};

  return (
    <>
      <header style={{ background: `${backgroundHex}` }} class="bg-black">
        <div class="hidden fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 transition duration-500 z-30" />
        {alertMessages && (
          <Alertas
            texts={alertMessages.texts}
            interval={alertMessages.interval}
            isMobile={false}
          />
        )}
        {activate && (
          <div class="flex items-center justify-center">
            <BasicImageAndLink
              {...image}
              height={{ desktop: 45, mobile: 51 }}
              width={{ desktop: 1275, mobile: 425 }}
            />
          </div>
        )}
        <Navbar
          // IconNavigationItems={IconNavigation}
          items={navItems}
          searchbar={searchbar}
          loginLink={loginLink}
          navBarSpace={navBarSpace}
          backgroundHex={backgroundHex}
          ajuda={ajuda}
        />
        <PromotionalBar
          giftValueReachInfos={giftValueReachInfos}
        />
      </header>
    </>
  );
}

export default Header;

export function loader(props: Props, _req: Request, ctx: AppContext) {
  return {
    ...props,
    isMobile: ctx.device !== "desktop",
  };
}
