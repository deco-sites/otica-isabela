import { getCookies } from "std/http/mod.ts";
import { ISABELA_DIAS_NAME_COOKIE } from "$store/packs/constants.ts";
import { AuthData } from "$store/packs/types.ts";
/**
@title Otica Isabela Dias - Customer
@description Esse loader apenas checa se o usuário está autenticado ou não.
**/

const loader = (_props: unknown, req: Request, _ctx: unknown): AuthData => {
  const cookies = getCookies(req.headers);
  return { customerName: cookies[ISABELA_DIAS_NAME_COOKIE] };
};

export default loader;
