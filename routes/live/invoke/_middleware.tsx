import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { LiveConfig, LiveState } from "$live/types.ts";
import { getCookies } from "std/http/mod.ts";
import {
  ISABELA_DIAS_SESSION_COOKIE,
  ISABELA_DIAS_CLIENT_COOKIE,
} from "$store/packs/constants.ts";
import { Manifest } from "$store/live.gen.ts";
import { Session } from "$store/packs/types.ts";
import paths from "deco-sites/otica-isabela/packs/utils/paths.ts";
import { Account } from "deco-sites/otica-isabela/packs/accounts/configStore.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";

export interface GlobalMiddleware {
  configStore?: Account;
  [key: string]: unknown;
}

/* const setTokenCookie = (
  res: Response,
  tokenName: string,
  tokenValue: string
) => {
  const cookie = `${tokenName}=${tokenValue}; Expires=${new Date().setFullYear(
    new Date().getFullYear() + 1
  )}; Path=/; Secure; HttpOnly`;
  res.headers.set("Set-Cookie", cookie);
};

const getSetSessionToken = async (
  state: LiveConfig<unknown, LiveState, Manifest>,
  res: Response
): Promise<string> => {
  const authApiResponse = await state.invoke(
    "deco-sites/otica-isabela/loaders/store/session.ts"
  );

  const sessionToken =
    authApiResponse.headers
      .get("set-cookie")!
      .match(/IsabelaDias_SessionCustomerKey=([^;]+)/)![1]
      .trim() ??
    (await authApiResponse
      .json()
      .then(({ SessionCustomer }: Session) => SessionCustomer.SessionKey));

  await setTokenCookie(res, ISABELA_DIAS_SESSION_COOKIE, sessionToken);

  return sessionToken;
}; */

export const handler = async (
  req: Request,
  ctx: MiddlewareHandlerContext<LiveConfig<unknown, LiveState, Manifest>>
) => {
  const res = await ctx.next();
  const { state } = ctx;
  const cookies = getCookies(req.headers);

  const customerToken = cookies[ISABELA_DIAS_CLIENT_COOKIE];

  /* if (!customerToken) {
    const sessionToken =
      cookies[ISABELA_DIAS_SESSION_COOKIE] ??
      (await getSetSessionToken(state, res));

    const global = state.global as GlobalMiddleware;
    const config = global.configStore;
    const path = paths(config!);

    const { SessionCustomer } = await fetchAPI<Session>(
      path.session.initSession(),
      {
        method: "POST",
        headers: {
          cookie: `${ISABELA_DIAS_SESSION_COOKIE}=${sessionToken}`,
        },
      }
    );

    setTokenCookie(
      res,
      ISABELA_DIAS_CLIENT_COOKIE,
      String(SessionCustomer.IdSessionCustomer)
    );
  } */

  return res;
};
