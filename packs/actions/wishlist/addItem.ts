import { WishlistItem } from "$store/packs/types.ts";
import type { AppContext } from "deco-sites/otica-isabela/apps/site.ts";
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
  const clientToken = getCookies(req.headers)[ISABELA_DIAS_CLIENT_COOKIE];

  if (!clientToken) {
    return [];
  }

  const { idProduct } = props;

  const wishlistWithProduct = await fetchAPI<boolean>(
    path.wishlist.addWishlist(idProduct, Number(clientToken)),
    { method: "POST" },
  );

  return [{
    tempProp: wishlistWithProduct,
  }];
}
