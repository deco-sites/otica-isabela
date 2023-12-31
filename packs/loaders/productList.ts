import type { AppContext } from "deco-sites/otica-isabela/apps/site.ts";
import { GetProductProps, ProductData } from "$store/packs/types.ts";
import paths from "$store/packs/utils/paths.ts";
import { toProduct } from "$store/packs/utils/transform.ts";
import type { Product } from "apps/commerce/types.ts";
import { DecoRequestInit, fetchAPI } from "apps/utils/fetch.ts";
import { DECO_CACHE_OPTION } from "$store/packs/constants.ts";

export const cache = "stale-while-revalidate";

/**
 * @title Otica Isabela Dias - Listagem de Produtos
 */
const loader = async (
  props: Omit<GetProductProps, "url" | "page" | "tipoRetorno">,
  _req: Request,
  ctx: AppContext,
): Promise<Product[] | null> => {
  const config = { token: ctx.token, publicUrl: ctx.publicUrl };
  const path = paths(config!);
  const {
    nome,
    idColecaoProdutos,
    somenteCronometrosAtivos,
    id,
  } = props;

  const deco = somenteCronometrosAtivos
    ? undefined
    : { cache: DECO_CACHE_OPTION } as DecoRequestInit["deco"];

  const productsData = await fetchAPI<ProductData>(
    path.product.getProduct({
      ...props,
      nome: nome ?? "",
      idColecaoProdutos: idColecaoProdutos ?? 0,
      somenteCronometrosAtivos: somenteCronometrosAtivos ?? false,
      id: id,
      tipoRetorno: "simples",
    }),
    {
      method: "POST",
      deco,
    },
  );

  return productsData.produtos.map((product) => toProduct(product));
};

export default loader;
