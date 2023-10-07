import { Context } from "$store/packs/accounts/configStore.ts";
import paths from "$store/packs/utils/paths.ts";
import {
  APIGetTestimonials,
  ProductData,
  Review,
} from "deco-sites/otica-isabela/packs/types.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";
import { toReview } from "deco-sites/otica-isabela/packs/utils/transform.ts";
import type { RequestURLParam } from "deco-sites/std/functions/requestToParam.ts";

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
}

/**
 * @title Otica Isabela Dias - Testimonials
 * @description This loader gets testimonials from store customers. It can be used to get testimonials from a specific product or all testimonials
 */

const loader = async (
  props: Props,
  req: Request,
  ctx: Context,
): Promise<Review[] | null> => {
  const { configStore: config } = ctx;
  const path = paths(config!);
  const { slug, ordenacao, offset } = props;
  const url = new URL(req.url);

  const idproduto = await getProductIdBySlug(
    path.product.getProduct({ offset: 1, ordenacao: "none", url: slug }),
  );

  if (slug && !idproduto) return null;

  const testimonials = await fetchAPI<APIGetTestimonials[]>(
    path.testimonials.getTestimonials({
      ordenacao: ordenacao ?? "ultimosAdicionados",
      offset: offset ?? 9,
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
