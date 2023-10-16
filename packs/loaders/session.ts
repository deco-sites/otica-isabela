import type { AppContext } from "deco-sites/otica-isabela/apps/site.ts";
import paths from "$store/packs/utils/paths.ts";
import { ISABELA_DIAS_SESSION_COOKIE } from "$store/packs/constants.ts";
import {
  Session,
  SessionCustomer,
} from "deco-sites/otica-isabela/packs/types.ts";

interface Props {
  /**
   * @title Session Token
   */
  sessionToken?: string;
}

/**
@title Otica Isabela Dias - Session Start
@description This loader starts the session of the client, returning a token for the cart releatable requisitions.
**/

const loader = async (
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<SessionCustomer | null> => {
  const config = { token: ctx.token, publicUrl: ctx.publicUrl };
  const path = paths(config!);
  const sessionToken = props.sessionToken;

  const sessionAPI = await fetch(
    path.session.initSession(),
    {
      method: "POST",
      headers: {
        cookie: sessionToken
          ? `${ISABELA_DIAS_SESSION_COOKIE}=` + sessionToken
          : "",
      },
    },
  ).then((data) => {
    if (data.status === 500) {
      const dataHeadersCookie = data.headers.get("set-cookie");

      const SessionKey = dataHeadersCookie
        ? dataHeadersCookie.match(/IsabelaDias_SessionCustomerKey=([^;]+)/)![1]
          .trim()
        : undefined;
      return {
        SessionCustomer: {
          SessionKey,
        },
      } as Session;
    }
    return data.json() as Promise<Session>;
  });

  return sessionAPI.SessionCustomer;
};

export default loader;
