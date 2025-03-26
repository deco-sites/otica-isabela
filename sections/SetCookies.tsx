import {
  ISABELA_DIAS_CLIENT_COOKIE,
  ISABELA_DIAS_SESSION_COOKIE,
  ISABELA_DIAS_WISHLIST_IDS,
} from "$store/packs/constants.ts";
import { getCookies } from "std/http/mod.ts";
import { AppContext } from "deco-sites/otica-isabela/apps/site.ts";
export interface Tokens {
  tokenName: string;
  tokenValue: string;
}
const setCookies = (headers: any, tokens: Tokens[]) => {
  tokens.forEach(({ tokenName, tokenValue }) => {
    headers.append(
      "Set-Cookie",
      `${tokenName}=${tokenValue}; Expires=${
        new Date().setFullYear(
          new Date().getFullYear() + 1,
        )
      }; Path=/; Secure; HttpOnly`,
    );
  });
};

export const loader = async (
  _props: unknown,
  req: Request,
  ctx: AppContext,
) => {
  const cookies = getCookies(req.headers);
  if (cookies[ISABELA_DIAS_CLIENT_COOKIE]) {
    const customerWishlist = await ctx.invoke(
      "site/loaders/product/wishlist.ts",
    );
    const wishlistIds = customerWishlist?.map((product) =>
      String(product.IdProduct)
    );
    setCookies(ctx.response.headers, [
      {
        tokenName: ISABELA_DIAS_WISHLIST_IDS,
        tokenValue: String(wishlistIds),
      },
    ]);
    return;
  }
  const customerToken = await ctx.invoke(
    "site/loaders/store/session.ts",
    { sessionToken: cookies[ISABELA_DIAS_SESSION_COOKIE] },
  );

  setCookies(ctx.response.headers, [
    {
      tokenName: ISABELA_DIAS_CLIENT_COOKIE,
      tokenValue: String(customerToken.SessionCustomer.IdSessionCustomer),
    },
    {
      tokenName: ISABELA_DIAS_SESSION_COOKIE,
      tokenValue: customerToken.SessionCustomer.SessionKey,
    },
  ]);
};

function SetCookies() {
  return <div />;
}

export default SetCookies;
