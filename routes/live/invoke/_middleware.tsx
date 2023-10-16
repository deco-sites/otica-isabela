import { MiddlewareHandlerContext } from "$fresh/server.ts";
import {
  ISABELA_DIAS_CLIENT_COOKIE,
  ISABELA_DIAS_SESSION_COOKIE,
} from "$store/packs/constants.ts";
import { DecoState } from "deco/types.ts";
import { getCookies } from "std/http/mod.ts";
import { Manifest } from "deco-sites/otica-isabela/manifest.gen.ts";

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
export const handler = async (
  req: Request,
  ctx: MiddlewareHandlerContext<
    DecoState<
      Record<string | number | symbol, never>,
      Record<string | number | symbol, never>,
      //@ts-ignore Um erro bizarro acontecendo quando remove o ts-ignore
      Manifest
    >
  >,
) => {
  const res = await ctx.next();
  const cookies = getCookies(req.headers);

  if (cookies[ISABELA_DIAS_CLIENT_COOKIE]) return res;

  const sessionToken = cookies[ISABELA_DIAS_SESSION_COOKIE] ??
    (
      await ctx.state.invoke(
        "deco-sites/otica-isabela/loaders/store/session.ts",
      )
    )?.SessionKey;

  if (!sessionToken) return res;

  const customerToken = await ctx.state.invoke(
    "deco-sites/otica-isabela/loaders/store/session.ts",
    { sessionToken },
  );

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
