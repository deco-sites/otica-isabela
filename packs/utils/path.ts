import { Account } from "$store/packs/accounts/configStore.ts";

export interface GetProduct {
  /** @description query to use on search */
  term?: string;

  /** @description Search by collection */
  collection?: number;

  /** @description total number of items to display*/

  count: number;

  /** @description Sort for product whit promotion */
  isStopwatch?: boolean;

  /** @description search sort parameter */
  sort: "none" | "nome";
}

export const paths = ({ token, publicUrl }: Account) => {
  const searchBaseUrl = `${publicUrl}/Api`;

  return {
    session: {
      initSession: () => `${searchBaseUrl}/InicioSessao?token=${token}`,
    },
    product: {
      getProduct: (
        { term, collection, count, isStopwatch, sort }: GetProduct,
      ) =>
        `${searchBaseUrl}/Produtos?token=${token}&nome=${term}&idColecaoProdutos=${collection}&offset=${count}&somenteCronometrosAtivos=${isStopwatch}&ordenacao=${sort}`,
    },
  };
};
