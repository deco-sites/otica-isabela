import { Context } from "$store/packs/accounts/configStore.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";
import paths from "$store/packs/utils/paths.ts";
import { Session } from "$store/packs/types.ts";

const loader = async (
  _props: null,
  _req: Request,
  ctx: Context,
): Promise<Session> => {
  const { configStore: config } = ctx;
  const path = paths(config!);

  const session = await fetchAPI<Session>(
    path.session.initSession(),
    {
      method: "POST",
    },
  );

  return session;
};

export default loader;
