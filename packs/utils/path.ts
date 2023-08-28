import { Account } from "$store/packs/accounts/configStore.ts";

export interface GetProducts {
  /** @description query to use on search */
  term?: string;

  /** @description Search by collection */
  collection?: number;

  /** @description Search by category */
  category?: number;

  /** @description Search by subcategory */
  subcategory?: number;

  /** @description total number of items to display*/

  count: number;

  /** @description Dinamic filters Example: Aro Fechado,Retangular*/

  dinamicFilters?: dinamicFilter[];

  /** @description Sort for product whit promotion */
  isStopwatch?: boolean;

  /** @description search sort parameter */
  sort: "none" | "nome";
}

export interface dinamicFilter {
  /**
   * @description IdFilter
   */

  filterID: string;

  /**
   * @description Idvalue
   */

  filterValue?: string;
}

export interface GetProduct {
  id: string;
}

export const paths = ({ token, publicUrl }: Account) => {
  const searchBaseUrl = `${publicUrl}/Api`;

  return {
    session: {
      initSession: () => `${searchBaseUrl}/InicioSessao?token=${token}`,
    },
    products: {
      getProducts: (
        {
          term,
          collection,
          count,
          isStopwatch,
          sort,
          category,
          subcategory,
          dinamicFilters,
        }: GetProducts,
      ) => {
        const validFilters = dinamicFilters
          ? dinamicFilters.filter(({ filterID }) => filterID)
          : [];

        const filterIDs = validFilters.map(({ filterID }) => filterID);
        const filterValues = validFilters.map(({ filterValue }) =>
          filterValue !== undefined ? filterValue.replace(/ /g, "%20") : ""
        );

        return `${searchBaseUrl}/Produtos?token=${token}&nome=${term}&idColecaoProdutos=${collection}&offset=${count}&somenteCronometrosAtivos=${isStopwatch}&ordenacao=${sort}&idCategoria=${category}&idSubCategoria=${subcategory}&filtrosDinamicos=${filterIDs}&valorFiltrosDinamicos=${filterValues}`;
      },
    },
    product: {
      getProduct: (id: string) =>
        `${searchBaseUrl}/Produtos?token=${token}&id=${id}`,
    },
    reviewAndRating: {
      getTestimonails: (id: string) =>
        `${searchBaseUrl}/Depoimentos?token=${token}&idProduto=${id}`,
    },
  };
};
