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

interface PLPPageParams {
  productApiProps: Partial<
    Omit<
      GetProductProps,
      | "url"
      | "page"
      | "offset"
      | "ordenacao"
    >
  >;
  plpProps: Omit<ProductListiningPageProps, "productsData" | "baseURL">;
}

type Props = Omit<
  GetProductProps,
  "IdCategoria" | "IdSubCategoria" | "url" | "page"
>;

/**
 * @title Otica Isabela Dias - Product Listining Page
 * @description Works on routes /busca using the querystring "termo" to search the products OR in categories pages on routes /$category.
 */
const loaders = async (
  props: Props,
  req: Request,
  ctx: Context,
): Promise<ProductListingPage | null> => {
  const { configStore: config } = ctx;
  const url = new URL(req.url);
  const path = paths(config!);

  const { offset, ordenacao, filtrosDinamicos, ...searchPageProps } = props;

  const hasSearchParam = url.pathname.includes("busca");

  const isCategoryPage = !hasSearchParam &&
    Object.values(searchPageProps).every((val) =>
      !val || val.toString().length === 0
    );

  const pageParams = isCategoryPage
    ? await getCategoryPageParams(url, config!, props).then((data) => data)
    : getSearchPageParams(url, props, filtrosDinamicos);

  if (!pageParams) return null;

  const products = await fetchAPI<ProductData>(
    path.product.getProduct({
      offset: offset,
      ...pageParams.productApiProps,
      ...getSearchParams(url, ordenacao),
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

const getSearchPageParams = (
  url: URL,
  extraParams: Props,
  filtrosDinamicos?: DynamicFilter[],
): PLPPageParams => {
  const {
    nome,
    id,
    idColecaoProdutos,
    somenteCronometrosAtivos,
  } = extraParams;

  return {
    productApiProps: {
      nome: url.searchParams.get("termo") ?? nome ?? "",
      id: id?.length ? id : undefined,
      idColecaoProdutos,
      filtrosDinamicos,
      somenteCronometrosAtivos,
    },
    plpProps: {
      term: url.searchParams.get("termo") ?? nome ?? "",
      pageType: "search",
    },
  };
};

const getCategoryPageParams = async (
  url: URL,
  config: Account,
  extraParams: Props,
): Promise<PLPPageParams | null> => {
  const path = paths(config!);
  const lastCategorySlug = url.pathname.split("/").slice(-1)[0];
  if (!lastCategorySlug) return null;

  const {
    nome,
    id,
    idColecaoProdutos,
    somenteCronometrosAtivos,
  } = extraParams;

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
    ? matchDynamicFilters(url, filtersApi, extraParams.filtrosDinamicos)
    : undefined;

  return {
    productApiProps: {
      nome,
      id: id?.length ? id : undefined,
      idColecaoProdutos: idColecaoProdutos,
      filtrosDinamicos,
      IdCategoria: primaryCategory,
      IdSubCategoria: secondaryCategory,
      somenteCronometrosAtivos,
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
  sortBy?: GetProductProps["ordenacao"],
): Omit<GetProductProps, "offset"> => {
  const ordenacao =
    SORT_OPTIONS.find(({ value }) => value == url.searchParams.get("sort"))
      ?.value ??
      sortBy ??
      "nome";
  const page = url.searchParams.get("page") ?? 1;

  return {
    ordenacao: ordenacao as GetProductProps["ordenacao"],
    page: Number(page),
  };
};

const matchDynamicFilters = (
  url: URL,
  filtersAPI: APIDynamicFilters[],
  loaderFilters?: DynamicFilter[],
): DynamicFilter[] => {
  const filtersFromUrl = Array.from(url.searchParams).map(([key, value]) => {
    if (!key.startsWith("filter.")) return null;

    const filterID = getFilterId(filtersAPI, key.substring(7));

    if (!filterID) return null;
    return {
      filterID,
      filterValue: value,
    } as DynamicFilter;
  })
    .filter((item) => !!item) as DynamicFilter[];

  const filtersFromLoader =
    loaderFilters?.filter(({ filterID }) =>
      filtersAPI.find(({ IdTipo }) => IdTipo === filterID)
    ) ?? [];

  return [...filtersFromUrl, ...filtersFromLoader];
};

const getFilterId = (
  filtersAPI: APIDynamicFilters[],
  value: string,
): number | undefined =>
  filtersAPI.find(({ NomeTipo }) => NomeTipo == value)
    ?.IdTipo;

export default loaders;
