import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { LiveConfig, LiveState } from "$live/types.ts";
import { getCookies } from "std/http/mod.ts";
import {
  ISABELA_DIAS_CLIENT_COOKIE,
  ISABELA_DIAS_SESSION_COOKIE,
} from "$store/packs/constants.ts";
import { Manifest } from "$store/live.gen.ts";

import { Account } from "deco-sites/otica-isabela/packs/accounts/configStore.ts";

export interface GlobalMiddleware {
  configStore?: Account;
  [key: string]: unknown;
}

export interface Tokens {
  tokenName: string;
  tokenValue: string;
}

const setCookies = (res: Response, tokens: Tokens[]) => {
  tokens.forEach(({ tokenName, tokenValue }) => {
    res.headers.append(
      "Set-Cookie",
      `${tokenName}=${tokenValue}; Expires=${
        new Date().setFullYear(
          new Date().getFullYear() + 1,
        )
      }; Path=/; Secure; HttpOnly`,
    );
  });
};

const getSessionToken = async (
  state: LiveConfig<unknown, LiveState, Manifest>,
): Promise<string | null> => {
  const sessionToken = await invokeSession(state);
  return sessionToken?.SessionKey ?? null;
};

const invokeSession = async (
  state: LiveConfig<unknown, LiveState, Manifest>,
  sessionToken?: string,
) =>
  await state.invoke("deco-sites/otica-isabela/loaders/store/session.ts", {
    sessionToken,
  });

export const handler = async (
  req: Request,
  ctx: MiddlewareHandlerContext<LiveConfig<unknown, LiveState, Manifest>>,
) => {
  const res = await ctx.next();
  const { state } = ctx;
  const cookies = getCookies(req.headers);

  if (cookies[ISABELA_DIAS_CLIENT_COOKIE]) return res;

  const sessionToken = cookies[ISABELA_DIAS_SESSION_COOKIE] ??
    (await getSessionToken(state));

  if (!sessionToken) return res;

  const customerToken = await invokeSession(state, sessionToken);

  setCookies(res, [
    {
      tokenName: ISABELA_DIAS_CLIENT_COOKIE,
      tokenValue: String(customerToken?.IdSessionCustomer),
    },
    {
      tokenName: ISABELA_DIAS_SESSION_COOKIE,
      tokenValue: sessionToken,
    },
  ]);

  return res;
};
