import { Account } from "$store/packs/accounts/configStore.ts";

export interface GetProduct {
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

export const paths = ({ token, publicUrl }: Account) => {
  const searchBaseUrl = `${publicUrl}/Api`;

  return {
    session: {
      initSession: () => `${searchBaseUrl}/InicioSessao?token=${token}`,
    },
    product: {
      getProduct: (
        {
          term,
          collection,
          count,
          isStopwatch,
          sort,
          category,
          subcategory,
        }: GetProduct,
      ) => {
        return `${searchBaseUrl}/Produtos?token=${token}&nome=${term}&idColecaoProdutos=${collection}&offset=${count}&somenteCronometrosAtivos=${isStopwatch}&ordenacao=${sort}&idCategoria=${category}&idSubCategoria=${subcategory}`;
      },
    },
  };
};
