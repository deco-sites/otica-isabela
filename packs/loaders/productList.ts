import { Context } from "$store/packs/accounts/configStore.ts";
import {
  PLPProps as Props,
  Product as IsabelaProduct,
  ProductData,
} from "$store/packs/types.ts";
import paths from "$store/packs/utils/paths.ts";
import { toProduct } from "$store/packs/utils/transform.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";

const loader = async (
  props: Props,
  _req: Request,
  ctx: Context,
): Promise<Product[] | null> => {
  const { configStore: config } = ctx;
  const path = paths(config!);
  const {
    nome,
    idColecaoProdutos,
    offset,
    somenteCronometrosAtivos,
    ordenacao,
    IdCategoria,
    IdSubCategoria,
    filtrosDinamicos,
  } = props;

  const productsData = await fetchAPI<ProductData>(
    `${
      path.product.getProduct({
        nome: nome ?? "",
        idColecaoProdutos: idColecaoProdutos ?? 0,
        offset,
        somenteCronometrosAtivos: somenteCronometrosAtivos ?? false,
        ordenacao,
        IdCategoria,
        IdSubCategoria,
        filtrosDinamicos,
      })
    }`,
    {
      method: "POST",
    },
  );

  const products = productsData.produtos.map((product: IsabelaProduct) =>
    toProduct(product)
  );

  return products;
};

export default loader;
