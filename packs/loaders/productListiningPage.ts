import { Context } from "$store/packs/accounts/configStore.ts";
import {
  APIDynamicFilters,
  Category,
  DynamicFilter,
  GetProductProps,
  ProductData,
} from "$store/packs/types.ts";
import paths from "$store/packs/utils/paths.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";
import { toProductListingPage } from "$store/packs/utils/transform.ts";

interface UrlDynamicFilters {
  key: string;
  value: string;
}

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

  const dynamicFilters = await fetchAPI<APIDynamicFilters[]>(
    path.dynamicFilter.getDynamicFilters(
      secondaryCategory ?? primaryCategory,
    ),
    { method: "POST" },
  );

  const filtrosDinamicos = dynamicFilters.length > 0
    ? matchDynamicFilters(url, dynamicFilters)
    : undefined;

  const products = await fetchAPI<ProductData>(
    path.product.getProduct({
      offset: 32,
      IdCategoria: primaryCategory,
      IdSubCategoria: secondaryCategory,
      filtrosDinamicos,
      ...getSearchParams(url),
    }),
    { method: "POST" },
  );

  if (products.produtos.length == 0) return null;

  return toProductListingPage(dynamicFilters, products, category, url, filtrosDinamicos);
};

const getSearchParams = (
  url: URL,
): Omit<GetProductProps, "offset"> => {
  const allowedProducts: string[] = [
    "none",
    "mais-vendidos",
    "ofertas",
    "menor-preco",
    "nome",
  ];

  const ordenacao =
    allowedProducts.find((value) => value == url.searchParams.get("sort")) ??
      "nome";
  const page = url.searchParams.get("page") ?? 1;

  return {
    ordenacao: ordenacao as GetProductProps["ordenacao"],
    page: Number(page),
  };
};

const matchDynamicFilters = (
  url: URL,
  dynamicFiltersAPI: APIDynamicFilters[],
): DynamicFilter[] | undefined => {
  const urlDynamicFilters: UrlDynamicFilters[] = [];

  url.searchParams.forEach((value, key) => {
    if (!key.startsWith("filter.")) return;
    urlDynamicFilters.push({
      key: key.substring(7),
      value: value,
    });
  });

  if (urlDynamicFilters.length == 0) return undefined;

  return urlDynamicFilters.map((
    { key, value },
  ) => {
    const filterID = dynamicFiltersAPI.find((value) => value.NomeTipo == key)
      ?.IdTipo!;

    return {
      filterID,
      filterValue: value,
    };
  }).filter(({ filterID, filterValue }) =>
    filterID !== undefined && filterValue !== undefined
  );
};

export default loaders;
