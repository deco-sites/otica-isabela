import type { AppContext } from "deco-sites/otica-isabela/apps/site.ts";
import paths from "$store/packs/utils/paths.ts";
import {
  APIGetTestimonials,
  ProductData,
  Review,
} from "deco-sites/otica-isabela/packs/types.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";
import { toReview } from "deco-sites/otica-isabela/packs/utils/transform.ts";
import type { RequestURLParam } from "apps/website/functions/requestToParam.ts"

export interface Props {
  slug?: RequestURLParam;
  /**
   * @title Sort
   * @description search sort parameter */
  ordenacao?: "ultimosAdicionados" | "none";

  /**
   * @title Offset
   * @default 9 */
  offset?: number;

  /**
   * @title Only With Photos
   */
  somenteFoto?: boolean;
}

/**
 * @title Otica Isabela Dias - Testimonials
 * @description This loader gets testimonials from store customers. It can be used to get testimonials from a specific product or all testimonials
 */

const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<Review[] | null> => {
  const config = { token: ctx.token, publicUrl: ctx.publicUrl };
  const path = paths(config!);
  const { slug, ordenacao, offset, somenteFoto } = props;
  const url = new URL(req.url);

  const idproduto = slug
    ? await getProductIdBySlug(
      path.product.getProduct({ offset: 1, ordenacao: "none", url: slug }),
    )
    : undefined;

  if (slug && !idproduto) return null;

  const testimonials = await fetchAPI<APIGetTestimonials[]>(
    path.testimonials.getTestimonials({
      ordenacao: ordenacao ?? "ultimosAdicionados",
      offset: offset ?? 9,
      somenteFoto: somenteFoto ?? false,
      idproduto,
    }),
    {
      method: "POST",
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
