import { Props as TestimonialProps } from "$store/packs/loaders/testimonials.ts";
import { StoreProps } from "$store/apps/site.ts";
import { GetProductProps } from "../types.ts";
import { stringfyDynamicFilters } from "./utils.ts";
import { Props as NewsletterProps } from "$store/packs/loaders/newsletter.ts";
import { ProductListingPageProps } from "site/packs/v2/loaders/productListingPage.ts";

interface GetDynamicFilterProps {
  IdCategoria: number;
  IdSubCategoria?: number;
}

const paths = ({ token, publicUrl }: StoreProps) => {
  const base = `${publicUrl}Api`;
  const baseV2 = `${publicUrl}/api/v1`;

  const href = (path: string, extraParams?: object, v2: boolean = false) => {
    if (extraParams) {
      path =
        path +
        "&" +
        new URLSearchParams({
          ...Object.fromEntries(
            Object.entries(extraParams).filter(
              ([_, value]) => value !== undefined && value !== 0
            )
          ),
        });
    }
    return new URL(path, v2 ? baseV2 : base).href;
  };

  return {
    session: {
      initSession: () => href(`${base}/InicioSessao?token=${token}`),
    },
    product: {
      getProduct: (props: GetProductProps) => {
        const dynamicFiltersString = stringfyDynamicFilters(
          props.filtrosDinamicos
        );

        return href(`${base}/Produtos?token=${token}${dynamicFiltersString}`, {
          ...props,
          filtrosDinamicos: undefined,
        });
      },
    },
    category: {
      getCategory: (categoryUrl: string) =>
        href(`${base}/Categorias?token=${token}`),
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
        }
      ) => href(`${base}/Depoimentos?token=${token}`, props),
    },
    newsletter: {
      getNewsletter: (props: NewsletterProps) =>
        href(`${base}/AddNewsletter?token=${token}`, props),
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

    // new api
    v2: {
      navigation: {
        withFilters: (
          props: ProductListingPageProps,
          CategoryTree: string,
          filtersQuery?: string
        ) =>
          href(
            `${baseV2}/navigation${CategoryTree}?${filtersQuery}`,
            { ...props },
            true
          ),
      },

      product: {
        details: (slug: string) => {
          return href(`${baseV2}/product/${slug}?`, {}, true);
        },

        highlight: (id: string) => {
          return href(`${baseV2}/highlight/?Id=${id}`, {}, true);
        },

        medias: (slug: string) => {
          return href(`${baseV2}/product/${slug}/medias?`, {}, true);
        },

        search: (
          term: string,
          orderBy: string,
          page: number,
          pageSize: number,
          filtersQuery?: string
        ) => {
          return href(
            `${baseV2}/search?Term=${term}&OrderBy=${orderBy}&Page=${page}&PageSize=${pageSize}${
              filtersQuery ? `&${filtersQuery}` : ""
            }`,
            {},
            true
          );
        },
      },
    },
  };
};

export default paths;
