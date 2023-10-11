import { ISABELA_DIAS_CLIENT_COOKIE } from "$store/packs/constants.ts";
import paths from "$store/packs/utils/paths.ts";
import type { AppContext } from "deco-sites/otica-isabela/apps/site.ts";
import {
  OrderForm,
  ProductsCart,
} from "deco-sites/otica-isabela/packs/types.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";
import { getCookies } from "std/http/mod.ts";

/**
@title Otica Isabela Dias - Get Cart
@description This loader get the client cart from his ID
**/
const loader = async (
  _props: null,
  req: Request,
  ctx: AppContext,
): Promise<OrderForm> => {
  const config = { token: ctx.token, publicUrl: ctx.publicUrl };
  const path = paths(config!);
  const customerToken = Number(
    getCookies(req.headers)[ISABELA_DIAS_CLIENT_COOKIE],
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
    },
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
