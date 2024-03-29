import { getCookies } from "std/http/mod.ts";
import {
  ISABELA_DIAS_IMAGE_COOKIE,
  ISABELA_DIAS_NAME_COOKIE,
  ISABELA_DIAS_WISHLIST_IDS,
} from "$store/packs/constants.ts";
import { AuthData } from "$store/packs/types.ts";
/**
@title Otica Isabela Dias - Customer
@description Esse loader apenas checa se o usuário está autenticado ou não.
**/

const loader = (_props: unknown, req: Request, _ctx: unknown): AuthData => {
  const cookies = getCookies(req.headers);
  return {
    customerName: cookies[ISABELA_DIAS_NAME_COOKIE],
    customerImage: cookies[ISABELA_DIAS_IMAGE_COOKIE],
    customerWishlist: cookies[ISABELA_DIAS_WISHLIST_IDS]?.split(",") ?? [],
  };
};

export default loader;
