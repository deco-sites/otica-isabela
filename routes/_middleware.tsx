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
  const sessionToken = cookies[ISABELA_DIAS_COOKIE] ?? false;
  const IdCustomer = false; // fake data to finish component functionality

  // console.log("Retorno da api", authApiResponse);

  if (!sessionToken) {
    // Aguardando a correção da API de session para chamar a API.

    // const authApiResponse = await ctx.state.invoke(
    //   "deco-sites/otica-isabela/loaders/store/session.ts",
    // );

    // console.log("eae", authApiResponse);

    setCookie(
      "9af13ceec92746088dfa0880d25a7c6e",
      res,
      IdCustomer ? new Date().setFullYear(new Date().getFullYear() + 1) : null,
    );
  }

  return res;
};
