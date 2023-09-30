import { Context } from "$store/packs/accounts/configStore.ts";
import {
  APIDynamicFilters,
  Category,
  DynamicFilter,
  GetProductProps,
  ProductData,
  ProductListiningPageProps,
} from "$store/packs/types.ts";
import paths from "$store/packs/utils/paths.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";
import { toProductListingPage } from "$store/packs/utils/transform.ts";
import { Account } from "$store/packs/accounts/configStore.ts";
import { SORT_OPTIONS } from "deco-sites/otica-isabela/packs/constants.ts";

interface UrlDynamicFilters {
  key: string;
  value: string;
}

interface PLPPageParams {
  productApiProps: Partial<
    Omit<
      GetProductProps,
      | "id"
      | "idColecaoProdutos"
      | "offset"
      | "somenteCronometrosAtivos"
      | "ordenacao"
      | "url"
      | "page"
    >
  >;
  plpProps: Omit<ProductListiningPageProps, "productsData" | "baseURL">;
}

/**
 * @title Otica Isabela Products Listining Page
 * @description Works on routes /busca using the querystring "termo" to serch the products OR in categories pages on routes /category
 */
const loaders = async (
  _props: null,
  req: Request,
  ctx: Context,
): Promise<ProductListingPage | null> => {
  const { configStore: config } = ctx;
  const url = new URL(req.url);
  const path = paths(config!);

  const isCategoryPage = url.pathname.split("/")[1] != "busca";

  const pageParams: PLPPageParams | null = isCategoryPage
    ? await getCategoryPageParams(url, config!).then((data) => data)
    : {
      productApiProps: {
        nome: url.searchParams.get("termo") ?? "",
      },
      plpProps: {
        term: url.searchParams.get("termo") ?? "",
        pageType: "search",
      },
    };

  if (!pageParams) return null;

  const products = await fetchAPI<ProductData>(
    path.product.getProduct({
      offset: 32,
      ...pageParams.productApiProps,
      ...getSearchParams(url),
    }),
    { method: "POST" },
  );

  if (products.produtos.length == 0) return null;

  return toProductListingPage(
    {
      productsData: products,
      baseURL: url,
      ...pageParams.plpProps,
    },
  );
};

const getCategoryPageParams = async (
  url: URL,
  config: Account,
): Promise<PLPPageParams | null> => {
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

  const filtersApi = await fetchAPI<APIDynamicFilters[]>(
    path.dynamicFilter.getDynamicFilters(
      secondaryCategory ?? primaryCategory,
    ),
    { method: "POST" },
  );

  const filtrosDinamicos = filtersApi.length > 0
    ? matchDynamicFilters(url, filtersApi)
    : undefined;

  return {
    productApiProps: {
      filtrosDinamicos,
      IdCategoria: primaryCategory,
      IdSubCategoria: secondaryCategory,
    },
    plpProps: {
      category,
      filtersApi,
      filtersUrl: filtrosDinamicos,
      pageType: "category",
    },
  };
};

const getSearchParams = (
  url: URL,
): Omit<GetProductProps, "offset"> => {
  const ordenacao =
    SORT_OPTIONS.find(({ value }) => value == url.searchParams.get("sort"))
      ?.value ??
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
    const filterID = dynamicFiltersAPI.find((v) => v.NomeTipo == key)
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
