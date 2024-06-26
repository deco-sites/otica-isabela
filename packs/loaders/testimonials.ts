import type { AppContext } from "deco-sites/otica-isabela/apps/site.ts";
import paths from "$store/packs/utils/paths.ts";
import {
  APIGetTestimonials,
  ProductData,
  Review,
} from "deco-sites/otica-isabela/packs/types.ts";
import { fetchAPI } from "apps/utils/fetch.ts";
import { toReview } from "deco-sites/otica-isabela/packs/utils/transform.ts";
import type { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { DECO_CACHE_OPTION } from "$store/packs/constants.ts";

export interface Props {
  slug?: RequestURLParam;
  /**
   * @title Ordenação
   */
  ordenacao?: "ultimosAdicionados" | "none";

  /**
   * @title Contagem
   * @description Limite de itens a serem retornados
   * @default 9 */
  offset?: number;

  /**
   * @title ApenasDepoimentosComFoto
   */
  somenteFoto?: boolean;
  tipo?: "" | "home" | "produto";
}

// export const cache = "stale-while-revalidate";

/**
 * @title Otica Isabela Dias - Depoimentos
 * @description Esse loader retorna depoimentos dos clientes. Pode ser usado tanto para depoimentos de produtos no geral quanto para depoimentos de produtos específicos.
 */
const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<Review[] | null> => {
  const config = { token: ctx.token, publicUrl: ctx.publicUrl };
  const path = paths(config!);
  const { slug, ordenacao, offset, somenteFoto, tipo } = props;
  const url = new URL(req.url);

  const idproduto = slug
    ? await getProductIdBySlug(
      path.product.getProduct({
        offset: 1,
        ordenacao: "none",
        url: slug,
        tipoRetorno: "simples",
      }),
    )
    : undefined;

  if (slug && !idproduto) return null;

  const testimonials = await fetchAPI<APIGetTestimonials[]>(
    path.testimonials.getTestimonials({
      ordenacao: ordenacao ?? "ultimosAdicionados",
      offset: offset ?? 9,
      somenteFoto: somenteFoto ?? false,
      idproduto,
      tipo: tipo ?? idproduto ? "produto" : "home",
    }),
    {
      method: "POST",
      // deco: { cache: DECO_CACHE_OPTION },
    },
  );

  if (!testimonials.length) return null;

  return testimonials.map((testimonial) => toReview(testimonial, url));
};

const getProductIdBySlug = async (
  path: string,
): Promise<number | undefined> => {
  const product = await fetchAPI<ProductData>(path, {
    method: "POST",
  });

  return product.Total ? product.produtos[0].IdProduct : undefined;
};

export default loader;
