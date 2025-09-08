import { PLPResponseDTO } from "$store/packs/v2/loaders/productListingPage.ts";
import type {
  ProductDetailsPage,
  ProductListingPage,
  Product,
  ProductGroup,
  ListItem,
  BreadcrumbList,
} from "apps/commerce/types.ts";
import { Product as IsabelaProduct } from "./types.ts";
import { SORT_OPTIONS } from "$store/packs/constants.ts";

export const toProductListingPage = ({
  dto,
  baseURL,
  pageType,
  pageParams,
}: {
  dto: PLPResponseDTO;
  baseURL: URL;
  pageType: "category" | "search";
  pageParams: { orderBy: string; page: number };
}): ProductListingPage => {
  const { data: produtos } = dto;

  const itemListElement: ListItem[] = [];

  // const { filters, seo } =
  //   pageType == "category"
  //     ? categoryPageProps({
  //         baseURL,
  //         category: props.category!,
  //         filtersApi: props.filtersApi!,
  //         filtersUrl: props.filtersUrl,
  //       })
  //     : searchPageProps(baseURL, props.term);

  return {
    "@type": "ProductListingPage",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement,
      numberOfItems: itemListElement.length,
    },
    filters: [],
    products: produtos.map((product) => toProduct(product)),
    pageInfo: toPageInfo(
      {
        pageSize: dto.pageSize,
        pageCount: dto.pageCount,
        totalCount: dto.totalCount,
        page: pageParams.page,
      },
      baseURL.searchParams
    ),
    sortOptions: SORT_OPTIONS,
    seo: null,
  };
};

export function toProduct(product: IsabelaProduct): Product {
  const isVariantOf = product.relatedProducts
    ? toVariantProduct(product, product.relatedProducts)
    : undefined;

  const productRatingProperty = product.productRating
    ? {
        "@type": "PropertyValue" as const,
        name: "rating",
        value: product.productRating.toString(),
      }
    : null;

  const properties =
    product.attributes?.map((attr) => ({
      "@type": "PropertyValue" as const,
      name: attr.type,
      value: attr.value,
      ...(attr.color ? { color: attr.color } : {}),
    })) || [];

  const finalProperties = productRatingProperty
    ? [productRatingProperty, ...properties!]
    : properties;

  return {
    "@type": "Product",
    productID: `${product.id}`,
    url: toUrl(product.slug),
    name: product.name.trim(),
    category: toCategory([
      product.category.parent?.name.trim() || "",
      product.category.name.trim(),
    ]),
    sku: `${product.id}`,
    description: "## Product Description ##",
    image: product.medias.map((media) => ({
      "@type": "ImageObject" as const,
      alternateName: product.name.trim(),
      url: media.url,
      additionalType: media.isVideo ? "video" : "image",
    })),
    additionalProperty: finalProperties || [],
    isVariantOf,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "BRL",
      highPrice: product.price || 0,
      lowPrice: product.priceWithDiscount || 0,
      offerCount: 1,
      offers: [
        {
          "@type": "Offer",
          price: product.priceWithDiscount || 0,
          availability: product.isAvailable
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          inventoryLevel: { value: undefined },
          priceSpecification: [
            {
              "@type": "UnitPriceSpecification",
              priceType: "https://schema.org/ListPrice",
              price: product.price || 0,
            },
            {
              "@type": "UnitPriceSpecification",
              priceType: "https://schema.org/SalePrice",
              price: product.priceWithDiscount || 0,
            },
          ],
        },
      ],
    },
  };
}

const toCategory = (category: Array<string>) =>
  category
    .map((word) => (word.endsWith(" ") ? word.slice(0, -1) : word))
    .join(">");

const toUrl = (UrlFriendlyColor: string) => `/produto/${UrlFriendlyColor}`;

const toVariantProduct = (
  master: IsabelaProduct,
  variants: IsabelaProduct["relatedProducts"]
): ProductGroup => ({
  "@type": "ProductGroup" as const,
  productGroupID: `${master.id}`,
  hasVariant: variants!.map((variant) => {
    const productRatingProperty = variant.productRating
      ? {
          "@type": "PropertyValue" as const,
          name: "rating",
          value: variant.productRating.toString(),
        }
      : null;

    const properties =
      variant.attributes?.map((attr) => ({
        "@type": "PropertyValue" as const,
        name: attr.type,
        value: attr.value,
        ...(attr.color ? { color: attr.color } : {}),
      })) || [];

    const finalProperties = productRatingProperty
      ? [productRatingProperty, ...properties!]
      : properties;

    return {
      "@type": "Product" as const,
      category: master.category.parent?.name
        ? toCategory([
            master.category.parent.name.trim(),
            master.category.name.trim(),
          ])
        : toCategory([master.category.name.trim()]),
      productID: `${variant.id}`,
      url: toUrl(variant.slug!),
      name: variant.name?.trim(),
      sku: `${variant.id}`,
      additionalProperty: finalProperties || [],
      image: variant.medias?.map((media) => ({
        "@type": "ImageObject" as const,
        alternateName: variant.name?.trim(),
        url: media.url,
        additionalType: media.isVideo ? "video" : "image",
      })),
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "BRL",
        highPrice: variant.price || 0,
        lowPrice: variant.priceWithDiscount || 0,
        offerCount: 1,
        offers: [
          {
            "@type": "Offer",
            price: variant.priceWithDiscount || 0,
            availability: variant.isAvailable
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            inventoryLevel: { value: undefined },
            priceSpecification: [
              {
                "@type": "UnitPriceSpecification",
                priceType: "https://schema.org/ListPrice",
                price: variant.price || 0,
              },
              {
                "@type": "UnitPriceSpecification",
                priceType: "https://schema.org/SalePrice",
                price: variant.priceWithDiscount || 0,
              },
            ],
          },
        ],
      },
    };
  }),
  url: toUrl(master.slug),
  name: master.name,
  additionalProperty: [],
  model: `${master.id}`,
});

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
): ProductDetailsPage {
  return {
    "@type": "ProductDetailsPage",
    breadcrumbList: toBreadcrumbList(product, baseURL),
    product: toProduct(product),
    seo: {
      title: `${product.name}`,
      description: `## Product Description Seo ##`,
      canonical: `${baseURL}/produto/${product.slug}`,
    },
  };
}
