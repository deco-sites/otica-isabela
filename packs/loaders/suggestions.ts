import type { AppContext } from "deco-sites/otica-isabela/apps/site.ts";
import { ProductData } from "$store/packs/types.ts";
import type { Suggestion } from "apps/commerce/types.ts";
import paths from "$store/packs/utils/paths.ts";
import { toProduct } from "$store/packs/utils/transform.ts";
import { fetchAPI } from "apps/utils/fetch.ts";
import { DECO_CACHE_OPTION } from "$store/packs/constants.ts"

export interface Props {
  /**
   * @title Termo
   * @description Termo para ser usado na busca */
  nome?: string;
  /**
   * @title Contagem
   * @description Limite de itens a serem retornados
   * @default 8
   */
  offset: number;
}

/**
 * @title Otica Isabela Dias - Busca de Produtos
 */

const loader = async (
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<Suggestion | null> => {
  const config = { token: ctx.token, publicUrl: ctx.publicUrl };
  const path = paths(config!);
  const {
    nome,
    offset,
  } = props;

  const productSearch = await fetchAPI<ProductData>(
    `${
      path.product.getProduct({
        nome,
        offset,
        ordenacao: "none",
      })
    }`,
    {
      method: "POST",
      deco: { cache: DECO_CACHE_OPTION },
    },
  );

  const { produtos, Total } = productSearch;

  if (Total == 0) return null;

  return {
    searches: [],
    products: produtos.map((p) => toProduct(p)),
  };
};

export default loader;
