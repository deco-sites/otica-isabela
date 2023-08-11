import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { LiveConfig, LiveState } from "$live/types.ts";
import { getCookies } from "std/http/mod.ts";

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
  ctx: MiddlewareHandlerContext<LiveConfig<LiveState>>,
) => {
  const res = await ctx.next();
  const cookies = getCookies(req.headers);
  const sessionToken = cookies["IsabelaDias_SessionCustomerKey"] ?? false;
  const IdCustomer = false; // fake data to finish component functionality
  const date = new Date();
  const expirationDate = date.setFullYear(date.getFullYear() + 1);

  // Aguardando a correção da API de session para chamar a API.

  // const authApiResponse = await ctx.state.invoke(
  //   "$store/loaders/store/session.ts",
  //   {},
  // );

  // console.log("Retorno da api", authApiResponse);

  if (!sessionToken) {
    setCookie(
      "9af13ceec92746088dfa0880d25a7c6e",
      res,
      IdCustomer ? expirationDate : null,
    );
  }

  return res;
};
