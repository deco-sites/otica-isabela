import { Context } from "$store/packs/accounts/configStore.ts";
import { GetProductProps as Props, ProductData } from "$store/packs/types.ts";
import paths from "$store/packs/utils/paths.ts";
import { toProduct } from "$store/packs/utils/transform.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";

/**
 * @title Otica Isabela Products List
 */
const loader = async (
  props: Omit<Props, "url">,
  _req: Request,
  ctx: Context,
): Promise<Product[] | null> => {
  const { configStore: config } = ctx;
  const path = paths(config!);
  const {
    nome,
    idColecaoProdutos,
    somenteCronometrosAtivos,
    id,
  } = props;

  const productsData = await fetchAPI<ProductData>(
    `${
      path.product.getProduct({
        ...props,
        nome: nome ?? "",
        idColecaoProdutos: idColecaoProdutos ?? 0,
        somenteCronometrosAtivos: somenteCronometrosAtivos ?? false,
        id: id?.length === 0 ? undefined : id,
      })
    }`,
    {
      method: "POST",
    },
  );

  return productsData.produtos.map((product) => toProduct(product));
};

export default loader;
