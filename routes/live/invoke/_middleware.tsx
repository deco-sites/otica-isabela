import { MiddlewareHandlerContext } from "$fresh/server.ts";
import {
  ISABELA_DIAS_CLIENT_COOKIE,
  ISABELA_DIAS_SESSION_COOKIE,
  ISABELA_DIAS_WISHLIST_IDS,
} from "$store/packs/constants.ts";
import { Manifest } from "site/manifest.gen.ts";
import { DecoState } from "deco/types.ts";
import { getCookies } from "std/http/mod.ts";

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

  // if (cookies[ISABELA_DIAS_WISHLIST_IDS]) return res;

  
  if (cookies[ISABELA_DIAS_CLIENT_COOKIE]) {
    const customerWishlist = await ctx.state.invoke("site/loaders/product/wishlist.ts");
    const wishlistIds = customerWishlist.map(product => String(product.IdProduct));
    setCookies(res, [
      {
        tokenName: ISABELA_DIAS_WISHLIST_IDS,
        tokenValue: String(wishlistIds),
      }
    ])
    return res;
  }

  const customerToken = await ctx.state.invoke(
    "site/loaders/store/session.ts",
    { sessionToken: cookies[ISABELA_DIAS_SESSION_COOKIE] },
  );

  setCookies(res, [
    {
      tokenName: ISABELA_DIAS_CLIENT_COOKIE,
      tokenValue: String(customerToken.SessionCustomer.IdSessionCustomer),
    },
    {
      tokenName: ISABELA_DIAS_SESSION_COOKIE,
      tokenValue: customerToken.SessionCustomer.SessionKey,
    },
  ]);

  return res;
};
