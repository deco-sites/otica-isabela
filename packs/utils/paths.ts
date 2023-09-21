import { Account } from "$store/packs/accounts/configStore.ts";
import { GetProductProps } from "../types.ts";
import { stringfyDynamicFilters } from "./utils.ts";

interface APIDynamicFiltersURL {
  primaryCategory?: number;
  secondaryCategory?: number;
}

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
    dynamicFillter: {
      getDynamicFillters: (category: number) =>
        href(`${base}/FiltrosDinamicos?token=${token}`, {
          idCategoria: category,
        }),
    },
  };
};

export default paths;
