import { PLPResponseDTO } from "$store/packs/v2/loaders/productListingPage.ts";
import type { ListItem, BreadcrumbList } from "apps/commerce/types.ts";
import {
  Product as IsabelaProduct,
  IsabelaProductDetailsPage,
  IsabelaProductListingPage,
} from "./types.ts";
import { SORT_OPTIONS } from "$store/packs/v2/constants.ts";

export const toProductListingPage = ({
  dto,
  baseURL,
  pageType,
  pageParams,
}: {
  dto: PLPResponseDTO;
  baseURL: URL;
  pageType: "category" | "search";
  pageParams: { OrderBy: string; Page: number };
}): IsabelaProductListingPage => {
  const { data: produtos, facets } = dto;

  const itemListElement: ListItem[] = [];

  return {
    "@type": "ProductListingPage",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement,
      numberOfItems: itemListElement.length,
    },
    filters: facets,
    products: produtos,
    pageInfo: toPageInfo(
      {
        pageSize: dto.pageSize,
        pageCount: dto.pageCount,
        totalCount: dto.totalCount,
        page: pageParams.Page,
      },
      baseURL.searchParams
    ),
    sortOptions: SORT_OPTIONS,
    seo: null,
  };
};

const toPageInfo = (
  {
    pageSize,
    pageCount,
    page,
    totalCount,
  }: {
    pageSize: number;
    pageCount: number;
    totalCount: number;
    page: number;
  },
  params: URLSearchParams
) => {
  const totalPages = pageCount;

  const hasNextPage = totalPages > page;
  const hasPreviousPage = page > 1;
  const nextPage = new URLSearchParams(params);
  const previousPage = new URLSearchParams(params);

  if (hasNextPage) {
    nextPage.set("page", (page + 1).toString());
  }

  if (hasPreviousPage) {
    previousPage.set("page", (page - 1).toString());
  }

  return {
    nextPage: hasNextPage ? `?${nextPage.toString()}` : undefined,
    previousPage: hasPreviousPage ? `?${previousPage.toString()}` : undefined,
    currentPage: page - 1,
    records: totalCount,
    recordPerPage: pageSize,
  };
};

const toBreadcrumbList = (
  { category }: IsabelaProduct,
  baseURL: string
): BreadcrumbList => {
  const categories = !category?.parent?.name
    ? [
        {
          name: category.name.trim(),
          url: category.slug,
        },
      ]
    : [
        {
          name: category.parent.name.trim(),
          url: category.parent.slug,
        },
        {
          name: category.name.trim(),
          url: category.slug,
        },
      ];

  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      ...categories.map(({ name }, index) => ({
        "@type": "ListItem" as const,
        name,
        item: new URL(
          `/${Object.values(categories)
            .slice(0, index + 1)
            .map((c) => c.url!)
            .join("/")}`,
          baseURL
        ).href,
        position: index + 1,
      })),
    ],
    numberOfItems: categories.length,
  };
};

export function toProductPage(
  product: IsabelaProduct,
  baseURL: string,
  slug?: string
): IsabelaProductDetailsPage {
  return {
    "@type": "ProductDetailsPage",
    breadcrumbList: toBreadcrumbList(product, baseURL),
    product,
    seo: {
      title: `${product.name}`,
      description: `## Product Description Seo ##`,
      canonical: `${baseURL}/produto/${product.slug}`,
    },
  };
}
