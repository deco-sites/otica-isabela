import { Context } from "$store/packs/accounts/configStore.ts";
import paths from "$store/packs/utils/paths.ts";
import { getCookies } from "std/http/mod.ts";
import { ISABELA_DIAS_CLIENT_COOKIE } from "$store/packs/constants.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";
import {
  OrderForm,
  ProductsCart,
} from "deco-sites/otica-isabela/packs/types.ts";

/**
@title Otica Isabela Dias - Get Cart
@description This loader get the client cart from his ID
**/

const loader = async (
  _props: null,
  req: Request,
  ctx: Context,
): Promise<OrderForm> => {
  const { configStore: config } = ctx;
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
