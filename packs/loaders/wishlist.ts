/* import { ISABELA_DIAS_CLIENT_COOKIE } from "$store/packs/constants.ts";
import paths from "$store/packs/utils/paths.ts"; */
import type { AppContext } from "deco-sites/otica-isabela/apps/site.ts";
import { WishlistItem } from "deco-sites/otica-isabela/packs/types.ts";
/* import { fetchAPI } from "apps/utils/fetch.ts";
import { getCookies } from "std/http/mod.ts"; */

/**
@title NOT WORKING Otica Isabela Dias - Get Wishlist
@description This loader will get the client wishlist from his ID. Under development from the OTICA team
**/
const loader = async (
  _props: null,
  _req: Request,
  _ctx: AppContext,
): Promise<WishlistItem[]> => {
  /* const config = { token: ctx.token, publicUrl: ctx.publicUrl };
  const path = paths(config!);
  const customerToken = Number(
    getCookies(req.headers)[ISABELA_DIAS_CLIENT_COOKIE],
  );

  if (!customerToken) {
    return [];
  } */

  await 0;
  return [
    {
      tempProp: true,
    },
  ];
};

export default loader;
