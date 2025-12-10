import type { AppContext } from "$store/apps/site.ts";
import paths from "$store/packs/utils/paths.ts";
import { ISABELA_DIAS_SESSION_COOKIE } from "$store/packs/constants.ts";
import { Session } from "$store/packs/types.ts";
import { fetchAPI } from "apps/utils/fetch.ts";

interface Props {
  /**
   * @title Session Token
   */
  sessionToken?: string;
}

/**
@title Otica Isabela Dias - Início de Sessão
@description Esse loader inicia a sessão do cliente, retornando um token para as requisições relacionadas ao cart.
**/
const loader = async (
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<Session> => {
  const config = { token: ctx.token.get?.() ?? "", publicUrl: ctx.publicUrl };
  const path = paths(config!);
  const sessionToken = props.sessionToken;

  const sessionAPI = await fetchAPI<Session>(path.session.initSession(), {
    method: "POST",
    headers: {
      cookie: sessionToken
        ? `${ISABELA_DIAS_SESSION_COOKIE}=` + sessionToken
        : "",
    },
  });

  return sessionAPI;
};

export default loader;
