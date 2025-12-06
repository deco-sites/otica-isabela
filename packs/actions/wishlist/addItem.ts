import { WishlistItem } from "$store/packs/types.ts";
import type { AppContext } from "site/apps/site.ts";
import { getCookies } from "std/http/mod.ts";
import { ISABELA_DIAS_CLIENT_COOKIE } from "$store/packs/constants.ts";
import paths from "$store/packs/utils/paths.ts";
import { fetchAPI } from "apps/utils/fetch.ts";

export interface Props {
  idProduct: number;
}

/**
 * @title Otica Isabela Dias - Adicionar item a uma wishlist
 */
export default async function loader(
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<WishlistItem[]> {
  const config = { token: ctx.token, publicUrl: ctx.publicUrl };
  const path = paths(config!);
  const customerToken = getCookies(req.headers)[ISABELA_DIAS_CLIENT_COOKIE];

  
  if (!customerToken) {
    return [];
  }

  const { idProduct } = props;

  const wishlist = await fetchAPI<WishlistItem[]>(
    path.wishlist.addWishlist(idProduct, Number(customerToken)),
    { method: "POST" },
  );

  return wishlist;
}
