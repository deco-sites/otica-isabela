import { Context } from "$store/packs/accounts/configStore.ts";
import { GetProductProps, ProductData } from "$store/packs/types.ts";
import paths from "$store/packs/utils/paths.ts";
import { toProduct } from "$store/packs/utils/transform.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";
import { getCookies } from "std/http/cookie.ts";

/**
 * @title Otica Isabela Products List
 * @description If you're using this loader to make a visitedItens shelf, please turn on the option "isVisitedShelf"
 */

type Props = Omit<GetProductProps, "url" | "page"> & {
  isVisitedShelf?: boolean;
};

const loader = async (
  props: Omit<Props, "url" | "page">,
  req: Request,
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

  const isVisitedShelf = props.isVisitedShelf;
  const cookies = getCookies(req.headers);
  const visitedProducts = cookies["visited_products"];

  if (isVisitedShelf && !visitedProducts) {
    return null;
  }

  const productsData = await fetchAPI<ProductData>(
    path.product.getProduct({
      ...props,
      nome: nome ?? "",
      idColecaoProdutos: idColecaoProdutos ?? 0,
      somenteCronometrosAtivos: somenteCronometrosAtivos ?? false,
      id: isVisitedShelf ? visitedProducts.split(":") : id,
    }),
    {
      method: "POST",
    },
  );

  return productsData.produtos.map((product) => toProduct(product));
};

export default loader;
