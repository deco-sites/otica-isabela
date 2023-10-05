import { Account } from "$store/packs/accounts/configStore.ts";
import { GetProductProps, TestimonialProps } from "../types.ts";
import { stringfyDynamicFilters } from "./utils.ts";

const paths = ({ token, publicUrl }: Account) => {
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
      getDynamicFilters: (category: number) =>
        href(`${base}/FiltrosDinamicos?token=${token}`, {
          idCategoria: category,
        }),
    },
    cart: {
      getCart: (clientId: number) =>
        href(`${base}/DadosCarrinho?token=${token}`, {
          idClienteSessao: clientId,
        }),
    },
    testimonials: {
      getTestimonials: (
        props: Omit<TestimonialProps, "slug"> & { idproduto?: number },
      ) => href(`${base}/Depoimentos?token=${token}`, props),
    },
  };
};

export default paths;
