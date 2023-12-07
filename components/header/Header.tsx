import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { BasicImageAndLinkProps } from "$store/components/ui/BasicImageAndLink.tsx";
import { BasicImageAndLink } from "$store/components/ui/BasicImageAndLink.tsx";
import PromotionalBar from "$store/islands/PromotionalBar.tsx";
import type { IconLoginLinkProps } from "./IconLoginLink.tsx";
import type { IconNavigation as IconNavigationType } from "./IconNavigation.tsx";
import type { NavItemProps } from "./NavItem.tsx";
import Navbar from "./Navbar.tsx";
import type { GiftValueReachInfosProps } from "./PromotionalBar.tsx";

export interface Props {
  /**
   * @title Logo da loja
   * @description Logo utilizada no topo da loja
   */
  storeLogo?: BasicImageAndLinkProps;
  /**
   * @title Melhorar espaçamentos do header?
   */
  navBarSpace?: boolean;
  /** @title Barra de Pesquisa */
  searchbar?: SearchbarProps;
  /**
   * @title Itens de navegação
   * @description Itens de navegação dos menus desktop e mobile
   */
  navItems?: NavItemProps[];
  /**
   * @title Link de Login
   */
  loginLink?: IconLoginLinkProps;
  /**
   * @title  Ícones de Navegação
   * @description Navegação com ícones
   */
  IconNavigation?: IconNavigationType[];
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
  storeLogo,
  searchbar,
  navItems,
  IconNavigation,
  giftValueReachInfos,
  loginLink,
  promotionalTopBanner,
  navBarSpace,
}: Props) {
  const { activate, image } = promotionalTopBanner ?? {};

  return (
    <>
      <header class="bg-black">
        <div
          id="overlayHeader"
          class="hidden fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 transition duration-500 z-30"
        >
        </div>
        {activate && (
          <div class="flex items-center justify-center">
            <BasicImageAndLink
              {...image}
              height={{ desktop: 32, mobile: 32 }}
              width={{ desktop: 0, mobile: 0 }}
            />
          </div>
        )}
        <Navbar
          IconNavigationItems={IconNavigation}
          storeLogo={storeLogo}
          items={navItems}
          searchbar={searchbar}
          loginLink={loginLink}
          navBarSpace={navBarSpace}
        />

        <PromotionalBar giftValueReachInfos={giftValueReachInfos} />
      </header>
    </>
  );
}

export default Header;
