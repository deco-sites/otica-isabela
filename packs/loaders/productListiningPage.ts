import { Context } from "$store/packs/accounts/configStore.ts";
import {
  Category,
  GetDynamicFilters,
  ProductData,
} from "$store/packs/types.ts";
import paths from "$store/packs/utils/paths.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";
import { toProductListingPage } from "$store/packs/utils/transform.ts";

/**
 * @title Otica Isabela Products Listining Page
 */
const loaders = async (
  _props: null,
  req: Request,
  ctx: Context,
): Promise<Omit<ProductListingPage, "breadcrumb"> | null> => {
  const { configStore: config } = ctx;
  const url = new URL(req.url);
  const path = paths(config!);

  const lastCategorySlug = url.pathname.split("/").slice(-1)[0];

  const category = await fetchAPI<Category[]>(
    path.category.getCategory(lastCategorySlug),
    { method: "POST" },
  ).then((categories) =>
    categories.filter(({ UrlFriendly }) =>
      UrlFriendly === lastCategorySlug
    )[0] ?? null
  );

  if (!category) return null;

  const { IdCategoriaPai, Id } = category;
  const isPrimary = IdCategoriaPai === 0;
  const [primaryCategory, secondaryCategory] = isPrimary
    ? [Id, undefined]
    : [undefined, Id];

  const products = await fetchAPI<ProductData>(
    path.product.getProduct({
      ordenacao: "none",
      offset: 50,
      page: 1,
      IdCategoria: primaryCategory,
      IdSubCategoria: secondaryCategory,
    }),
    { method: "POST" },
  );

  const dynamicFilters = await fetchAPI<GetDynamicFilters[]>(
    path.dynamicFillter.getDynamicFillters(
      primaryCategory ?? secondaryCategory,
    ),
    { method: "POST" },
  );

  return toProductListingPage(dynamicFilters, products, category);
};

export default loaders;
