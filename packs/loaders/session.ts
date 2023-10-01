import { Context } from "$store/packs/accounts/configStore.ts";
import paths from "$store/packs/utils/paths.ts";
import { getCookies } from "std/http/mod.ts";
import { ISABELA_DIAS_SESSION_COOKIE } from "$store/packs/constants.ts";

/**
@title Otica Isabela Dias session starter
@description This loader starts the session of the client, returning a token for the cart releatable requisitions.
**/

const loader = async (
  _props: null,
  req: Request,
  ctx: Context,
): Promise<Response> => {
  const { configStore: config } = ctx;
  const path = paths(config!);
  const sessionToken = getCookies(req.headers)[ISABELA_DIAS_SESSION_COOKIE];

  const session = await fetch(
    path.session.initSession(),
    {
      method: "POST",
      headers: {
        cookie: sessionToken ? `${ISABELA_DIAS_SESSION_COOKIE}=` + sessionToken : "",
      },
    },
    //data.json() type will be aways 'Session'
  ).then((data) => data)
    .catch((err: Response) => err);

  return session;
};

export default loader;
