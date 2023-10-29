import type { AppContext } from "deco-sites/otica-isabela/apps/site.ts";
import paths from "$store/packs/utils/paths.ts";
import { fetchAPI } from "apps/utils/fetch.ts";
import { APIAddNewsletter } from "$store/packs/types.ts";

export interface Props {
  /**
   * @title Email
   */
  email: string;

  /**
   * @title Telefone
   */
  celular: string;

  /**
   * @title Nome
   */
  nome?: string;
}

/**
 * @title Otica Isabela Dias - Adicionar  Newsletter
 */

const loader = async (
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<APIAddNewsletter> => {
  const config = { token: ctx.token, publicUrl: ctx.publicUrl };
  const path = paths(config!);

  if (!props.email || !props.celular) {
    return { wasShopperInserted: false };
  }

  const wasShopperInserted = await fetchAPI<boolean>(
    path.newsletter.getNewsletter({ ...props }),
    {
      method: "POST",
    },
  );

  return { wasShopperInserted };
};

export default loader;
