import { Props as TestimonialProps } from "$store/packs/loaders/testimonials.ts";
import { StoreProps } from "deco-sites/otica-isabela/apps/site.ts";
import { GetProductProps } from "../types.ts";
import { stringfyDynamicFilters } from "./utils.ts";
import { Props as NewsletterProps } from "$store/packs/loaders/newsletter.ts";

interface GetDynamicFilterProps {
  IdCategoria: number;
  IdSubCategoria?: number;
}

const paths = ({ token, publicUrl }: StoreProps) => {
  const base = `${publicUrl}Api`;
  const href = (path: string, extraParams?: object) => {
    if (extraParams) {
      path = path + "&" + new URLSearchParams({
        ...Object.fromEntries(
          Object.entries(extraParams).filter(([_, value]) =>
            value !== undefined && value !== 0
          ),
        ),
      });
    }
    return new URL(path, base).href;
  };

  return {
    session: {
      initSession: () => href(`${base}/InicioSessao?token=${token}`),
    },
    product: {
      getProduct: (props: GetProductProps) => {
        const dynamicFiltersString = stringfyDynamicFilters(
          props.filtrosDinamicos,
        );

        return href(
          `${base}/Produtos?token=${token}${dynamicFiltersString}`,
          { ...props, filtrosDinamicos: undefined },
        );
      },
    },
    category: {
      getCategory: (categoryUrl: string) =>
        href(`${base}/Categorias?token=${token}`, { url: categoryUrl }),
    },
    dynamicFilter: {
      getDynamicFilters: (props: GetDynamicFilterProps) =>
        href(`${base}/FiltrosDinamicos?token=${token}`, {
          ...props,
        }),
    },
    cart: {
      getCart: (clientId: number) =>
        href(`${base}/DadosCarrinho?token=${token}`, {
          idClienteSessao: clientId,
        }),
      addCart: (idProduct: number, sku: number, clientSession: number) =>
        href(`${base}/AddCarrinho?token=${token}`, {
          idProduto: idProduct,
          idOptionValue: sku,
          idClienteSessao: clientSession,
        }),
    },
    testimonials: {
      getTestimonials: (
        props: Omit<TestimonialProps, "slug"> & {
          idproduto?: number;
        },
      ) => href(`${base}/Depoimentos?token=${token}`, props),
    },
    newsletter: {
      getNewsletter: (
        props: NewsletterProps,
      ) => href(`${base}/AddNewsletter?token=${token}`, props),
    },
    wishlist: {
      addWishlist: (idProduct: number, clientSession: number) =>
        href(`${base}/AddFavoritoProduto?token=${token}`, {
          idProduto: idProduct,
          idClienteSessao: clientSession,
        }),
      removeWishlist: (idProduct: number, clientSession: number) =>
        href(`${base}/RemoveFavoritoProduto?token=${token}`, {
          idProduto: idProduct,
          idClienteSessao: clientSession,
        }),
      getWishlist: (clientSession: number) =>
        href(`${base}/DadosFavoritoProduto?token=${token}`, {
          idClienteSessao: clientSession,
        }),
    },
  };
};

export default paths;
