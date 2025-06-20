import { OrderForm, ProductsCart } from "../../types.ts";
import type { AppContext } from "../../../apps/site.ts";
import { getCookies } from "std/http/mod.ts";
import { ISABELA_DIAS_CLIENT_COOKIE } from "../../constants.ts";
import paths from "../../utils/paths.ts";
import { fetchAPI } from "apps/utils/fetch.ts";

export interface Props {
  idProduct: number;
  sku: number;
}

/**
 * @title Otica Isabela Dias - Adicionar item ao carrinho
 */
export default async function loader(
  props: Props,
  req: Request,
  ctx: AppContext
): Promise<OrderForm> {
  const config = { token: ctx.token, publicUrl: ctx.publicUrl };
  const path = paths(config!);
  const clientToken = getCookies(req.headers)[ISABELA_DIAS_CLIENT_COOKIE];
  const { idProduct, sku } = props;

  const cartWithProduct = await fetchAPI<ProductsCart[]>(
    path.cart.addCart(idProduct, sku, Number(clientToken)),
    { method: "POST" }
  );

  return {
    products: cartWithProduct,
  };
}
