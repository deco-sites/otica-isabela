import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { LiveConfig, LiveState } from "$live/types.ts";
import { getCookies } from "std/http/mod.ts";
import { ISABELA_DIAS_COOKIE } from "$store/packs/constants.ts";
import { Manifest } from "$store/live.gen.ts";

const setCookie = (
  sessionKey: string,
  res: Response,
  expireToken?: number | null,
) => {
  res?.headers.set(
    "Set-Cookie",
    `IsabelaDias_SessionCustomerKey=${sessionKey}; ${
      expireToken && "Expires=${expireToken}"
    }; Secure; HttpOnly`,
  );
};

export const handler = async (
  req: Request,
  ctx: MiddlewareHandlerContext<LiveConfig<unknown, LiveState, Manifest>>,
) => {
  const res = await ctx.next();
  const cookies = getCookies(req.headers);
   // const sessionToken = cookies[ISABELA_DIAS_COOKIE] ?? false;

  // if (!sessionToken) {
  //   const authApiResponse = await ctx.state.invoke(
  //     "deco-sites/otica-isabela/loaders/store/session.ts",
  //   );

  //   const { SessionCustomer: { SessionKey, IdCustomer } } = authApiResponse;

  //   setCookie(
  //     SessionKey,
  //     res,
  //     IdCustomer !== null
  //       ? new Date().setFullYear(new Date().getFullYear() + 1)
  //       : null,
  //   );
  // }

  return res;
};
