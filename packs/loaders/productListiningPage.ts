import {
  APIDynamicFilters,
  Category,
  DynamicFilter,
  GetProductProps,
  ProductData,
  ProductListiningPageProps,
} from "$store/packs/types.ts";
import paths from "$store/packs/utils/paths.ts";
import { toProductListingPage } from "$store/packs/utils/transform.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import type {
  AppContext,
  StoreProps,
} from "deco-sites/otica-isabela/apps/site.ts";
import { SORT_OPTIONS } from "deco-sites/otica-isabela/packs/constants.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";

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
  ctx: AppContext,
): Promise<ProductListingPage | null> => {
  const config = { token: ctx.token, publicUrl: ctx.publicUrl };
  const path = paths(config!);
  const url = new URL(req.url);

  const isCategoryPage = !url.pathname.includes("busca");

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

  if (!products.produtos.length) return null;

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
  config: StoreProps,
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
): DynamicFilter[] =>
  Array.from(url.searchParams).map(([key, value]) => {
    if (!key.startsWith("filter.")) return null;

    const filterID = dynamicFiltersAPI.find((v) =>
      v.NomeTipo == key.substring(7)
    )
      ?.IdTipo;

    if (!filterID) return null;

    return {
      filterID,
      filterValue: value,
    } as DynamicFilter;
  })
    .filter((item) => !!item) as DynamicFilter[];

export default loaders;
