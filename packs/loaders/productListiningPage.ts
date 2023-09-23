import { Context } from "$store/packs/accounts/configStore.ts";
import {
  APIDynamicFilters,
  Category,
  GetProductProps,
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
): Promise<ProductListingPage | null> => {
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
    : [IdCategoriaPai, Id];

  console.log(getSearchParams(url));

  const products = await fetchAPI<ProductData>(
    path.product.getProduct({
      offset: 32,
      IdCategoria: primaryCategory,
      IdSubCategoria: secondaryCategory,
      ...getSearchParams(url),
    }),
    { method: "POST" },
  );

  const dynamicFilters = await fetchAPI<APIDynamicFilters[]>(
    path.dynamicFillter.getDynamicFillters(
      secondaryCategory ?? primaryCategory,
    ),
    { method: "POST" },
  );

  return toProductListingPage(dynamicFilters, products, category, url);
};

const getSearchParams = (url: URL): Omit<GetProductProps, "offset"> => {
  const allowedProducts: Array<string> = [
    "none",
    "mais-vendidos",
    "ofertas",
    "menor-preco",
    "nome",
  ];

  const ordenacao =
    allowedProducts.find((value) => value == url.searchParams.get("sort")) ??
      "nome";
  const page = 1;
  return {
    ordenacao: ordenacao as GetProductProps["ordenacao"],
    page,
  };
};

export default loaders;
