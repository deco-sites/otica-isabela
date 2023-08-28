import { Context } from "$store/packs/accounts/configStore.ts";
import { ProductData } from "$store/packs/types.ts";
import { paths } from "$store/packs/utils/path.ts";
import type { Review } from "deco-sites/std/commerce/types.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";

const loader = async (
  _props: string,
  _req: Request,
  ctx: Context,
): Promise<Review> => {
  const { configStore: config } = ctx;
  const path = paths(config!);

  const data = await fetchAPI<ProductData>(
    `${path.reviewAndRating.getTestimonails("1464")}`,
    {
      method: "POST",
    },
  );

  const testimonails = data;

  return {
    ...testimonails,
    "@type": "Review",
  };
};
export default loader;
