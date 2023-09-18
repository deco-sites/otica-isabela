import { Context } from "$store/packs/accounts/configStore.ts";
import { Category } from "$store/packs/types.ts";
import paths from "$store/packs/utils/paths.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";
import type { RequestURLParam } from "deco-sites/std/functions/requestToParam.ts";

export interface Props {
  slug: RequestURLParam;
}

/**
 * @title Otica Isabela Products Listining Page
 */
const loader = async (
  _props: Props,
  req: Request,
  ctx: Context,
): Promise<ProductListingPage | null> => {
  const { configStore: config } = ctx;
  const { url: baseUrl } = req;
  const url = new URL(baseUrl);
  const path = paths(config!);

  const categoriesSlug = url.pathname.split("/");
  const lastCategorySlug = categoriesSlug[categoriesSlug.length - 1];

  const category = await getCategory(path.category(lastCategorySlug), lastCategorySlug);

  if (!category) return null;

  console.log(category);

  return null;
};

export default loader;

const getCategory = async (path: string, slug: string) => {
  const categories = await fetchAPI<Category[]>(
    path,
    {
      method: "POST",
    },
  );
  return categories.filter(({ UrlFriendly }) => UrlFriendly === slug)[0] ??
    null;
};
