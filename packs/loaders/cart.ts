import { ISABELA_DIAS_CLIENT_COOKIE } from "$store/packs/constants.ts";
import paths from "$store/packs/utils/paths.ts";
import type { AppContext } from "$store/apps/site.ts";
import { OrderForm, ProductsCart } from "$store/packs/types.ts";
import { fetchAPI } from "apps/utils/fetch.ts";
import { getCookies } from "std/http/mod.ts";

/**
@title Otica Isabela Dias - Dados do carrinho
@description Esse loader pega os dados do carrinho a partir do ID do cliente.
**/
const loader = async (
  _props: null,
  req: Request,
  ctx: AppContext
): Promise<OrderForm> => {
  const config = { token: ctx.token, publicUrl: ctx.publicUrl };
  const path = paths(config!);
  const customerToken = Number(
    getCookies(req.headers)[ISABELA_DIAS_CLIENT_COOKIE]
  );

  if (!customerToken) {
    return {
      products: [],
    };
  }

  const productsCart = await fetchAPI<ProductsCart[]>(
    path.cart.getCart(customerToken),
    {
      method: "POST",
    }
  );

  if (productsCart.length === 0) {
    return {
      products: [],
    };
  }

  return {
    products: productsCart,
  };
};

export default loader;
