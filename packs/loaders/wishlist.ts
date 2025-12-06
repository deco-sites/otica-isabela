import { ISABELA_DIAS_CLIENT_COOKIE } from "$store/packs/constants.ts";
import paths from "$store/packs/utils/paths.ts";
import type { AppContext } from "$store/apps/site.ts";
import { WishlistItem } from "$store/packs/types.ts";
import { fetchAPI } from "apps/utils/fetch.ts";
import { getCookies } from "std/http/mod.ts";

/**
@title NOT WORKING Otica Isabela Dias - Get Wishlist
@description This loader will get the client wishlist from his ID. Under development from the OTICA team
**/
const loader = async (
  _props: null,
  req: Request,
  ctx: AppContext,
): Promise<WishlistItem[]> => {
  const config = { token: ctx.token?.get?.() ?? "", publicUrl: ctx.publicUrl };
  const path = paths(config!);
  const customerToken = Number(
    getCookies(req.headers)[ISABELA_DIAS_CLIENT_COOKIE],
  );

  if (!customerToken) {
    return [];
  }

  const wishlist = await fetchAPI<WishlistItem[]>(
    path.wishlist.getWishlist(Number(customerToken)),
    { method: "POST" },
  );

  return wishlist;
};

export default loader;
