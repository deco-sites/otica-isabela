import {
  APIDynamicFilters,
  Category,
  ColorVariants,
  Image,
  Product as IsabelaProduct,
  ProductData as IsabelaProductData,
  ProductInfo,
} from "$store/packs/types.ts";
import type {
  AggregateOffer,
  BreadcrumbList,
  FilterToggleValue,
  ImageObject,
  Offer,
  Product,
  ProductDetailsPage,
  ProductGroup,
  ProductListingPage,
  PropertyValue,
} from "deco-sites/std/commerce/types.ts";
import { SORT_OPTIONS } from "deco-sites/otica-isabela/packs/constants.ts";

export function toProduct(product: IsabelaProduct): Product {
  const {
    IdProduct,
    UrlFriendlyColor,
    Nome,
    Imagens,
    ValorDesconto,
    ValorOriginal,
    Classificacoes,
    ProdutosMaisCores,
    ImagemExperimentador,
    NomeCategoriaPai,
    NomeCategoria,
    QtdeEstoque,
    OfertaTermina,
  } = product;

  const productImages = Imagens.map((image: Image) => image.Imagem);

  const productsInfo = Classificacoes.map((productInfo) => productInfo);

  const isVariantOf = product.ProdutosMaisCores
    ? toVariantProduct(product, product.ProdutosMaisCores)
    : undefined;

  return {
    "@type": "Product",
    productID: `${IdProduct}`,
    url: toUrl(UrlFriendlyColor),
    name: Nome.trim(),
    category: toCategory([NomeCategoriaPai, NomeCategoria]),
    sku: `${IdProduct}`,
    image: productImages.map((image): ImageObject => ({
      "@type": "ImageObject" as const,
      alternateName: Nome,
      url: image,
    })),
    additionalProperty: toAdditionalProperties(
      productsInfo,
      ProdutosMaisCores,
      ImagemExperimentador,
    ),
    isVariantOf,
    offers: toAggregateOffer(
      ValorOriginal,
      ValorDesconto,
      OfertaTermina,
      QtdeEstoque,
    ),
  };
}

export function toProductPage(
  product: IsabelaProduct,
  baseURL: string,
): ProductDetailsPage {
  return {
    "@type": "ProductDetailsPage",
    breadcrumbList: toBreadcrumbList(product, baseURL),
    product: toProduct(product),
    seo: {
      title: `${product.TituloSeo}`,
      description: `${product.DescricaoSeo}`,
      canonical: "",
    },
  };
}

const toCategory = (category: Array<string>) =>
  category
    .map((word) => word.endsWith(" ") ? word.slice(0, -1) : word)
    .join(">");

const toUrl = (UrlFriendlyColor: string) =>
  new URL(UrlFriendlyColor, "https://www.oticaisabeladias.com.br/produto/")
    .href;

const toAdditionalProperties = (
  properties: ProductInfo[],
  variants: ColorVariants[],
  experimentador: string,
): PropertyValue[] => {
  const additionalProperties: PropertyValue[] = [];

  if (variants.length > 0) {
    additionalProperties.push(
      ...toProductColorAdditionalProperties(properties, variants),
    );
  }

  additionalProperties.push(
    ...properties.map((item) => ({
      "@type": "PropertyValue" as const,
      "name": item.Nome,
      "value": item.Tipo,
    })),
    {
      "@type": "PropertyValue" as const,
      "name": "Experimentador",
      "propertyID": "experimentador",
      "value": experimentador,
    },
  );

  return additionalProperties;
};

const toProductColorAdditionalProperties = (
  properties: ProductInfo[],
  variants: ColorVariants[],
): PropertyValue[] => {
  const colorName =
    Object.values(properties).filter((value) =>
      value.IdTipo === 14 || value.Tipo === "Cor"
    )[0].Nome;
  return Object.values(variants).filter((variant) =>
    variant.NomeColor === colorName
  ).flatMap((variant) => toColorPropertyValue(variant));
};

const toColorPropertyValue = (variant: ColorVariants): PropertyValue[] =>
  Object.keys(variant).filter((prop) =>
    prop.startsWith("Color") && variant[prop as keyof object]
  ).map((color) => ({
    "@type": "PropertyValue" as const,
    "name": "Cor",
    "value": variant["NomeColor" as keyof object],
    "propertyID": "color",
    "unitCode": variant[color as keyof object],
  }));

const toVariantProduct = (
  master: IsabelaProduct,
  variants: ColorVariants[],
): ProductGroup => ({
  "@type": "ProductGroup" as const,
  productGroupID: `${master.IdProduct}`,
  hasVariant: variants.map((variant) => {
    return {
      "@type": "Product" as const,
      category: toCategory([master.NomeCategoriaPai, master.NomeCategoria]),
      productID: `${variant.IdProduct}`,
      url: toUrl(variant.UrlFriendlyColor),
      name: variant.Nome.trim(),
      sku: `${variant.IdProduct}`,
      additionalProperty: toColorPropertyValue(variant),
      Imagem: variant.Imagem,
      offers: toAggregateOffer(
        variant.ValorOriginal,
        variant.ValorDesconto,
        variant.OfertaTermina,
        master.QtdeEstoque,
      ),
    };
  }),
  url: toUrl(master.UrlFriendlyColor),
  name: master.Nome,
  additionalProperty: [],
  model: `${master.IdProduct}`,
} ?? []);

const toAggregateOffer = (
  originalValue: number,
  discountedValue: number,
  priceValidUntil: string,
  stock: number,
): AggregateOffer => ({
  "@type": "AggregateOffer",
  highPrice: originalValue,
  lowPrice: discountedValue,
  offerCount: 1,
  priceCurrency: "BRL",
  offers: [{ ...toOffer(originalValue, priceValidUntil, stock) }],
});

const toOffer = (
  originalValue: number,
  priceValidUntil: string,
  stock: number,
): Offer => ({
  "@type": "Offer",
  availability: stock > 0
    ? "https://schema.org/InStock"
    : "https://schema.org/OutOfStock",
  inventoryLevel: { value: undefined },
  price: originalValue,
  priceSpecification: [],
  priceValidUntil,
});

const toBreadcrumbList = (
  { NomeCategoriaPai, NomeCategoria, Nome, UrlFriendlyColor }: IsabelaProduct,
  baseURL: string,
): BreadcrumbList => {
  const categories = toCategory([NomeCategoriaPai, NomeCategoria]).split(/[>]/);

  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      ...categories.map((name, index) => ({
        "@type": "ListItem" as const,
        name,
        item: new URL(
          `/${
            categories
              .slice(0, index + 1)
              .join("/")
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/\s+/g, "-")
          }`,
          baseURL,
        ).href,
        position: index + 1,
      })),
      {
        "@type": "ListItem",
        name: Nome,
        item: toProductCanonicalUrl(baseURL, UrlFriendlyColor).href,
        position: categories.length + 1,
      },
    ],
    numberOfItems: categories.length + 1,
  };
};

const toProductCanonicalUrl = (
  baseURL: string,
  productSlug: string,
): URL => new URL(`/produto/${productSlug}`, baseURL);

export const toProductListingPage = (
  filters: APIDynamicFilters[],
  productsData: IsabelaProductData,
  category: Category,
  baseURL: URL,
): ProductListingPage => {
  const { produtos } = productsData;
  const itemListElement = toPageBreadcrumbList(baseURL, category.Nome);
  return {
    "@type": "ProductListingPage",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement,
      numberOfItems: itemListElement.length,
    },
    filters: groupPageFilters(filters).map((f) => ({
      "@type": "FilterToggle",
      key: `${f[0].IdTipo}`,
      label: f[0].NomeTipo,
      quantity: countPageFiltersQuantity(produtos, "typeId", f[0].IdTipo),
      values: f.map((individualFilter) =>
        toPageFilterValues(individualFilter, produtos)
      ),
    })),
    products: produtos.map((product) => toProduct(product)),
    pageInfo: toPageInfo(productsData),
    sortOptions: SORT_OPTIONS,
    seo: {
      title: category.Title_SEO,
      description: category.PageDescription_SEO ?? category.Description_SEO,
      canonical: "",
    },
  };
};

const groupPageFilters = (
  filters: APIDynamicFilters[],
): APIDynamicFilters[][] => {
  const orderedFilters: APIDynamicFilters[][] = [];

  filters.forEach((filter) => {
    const { IdTipo } = filter;
    orderedFilters[IdTipo] = orderedFilters[IdTipo] ?? [];
    orderedFilters[IdTipo].push(filter);
  });

  return orderedFilters.filter((item) => item.length > 0);
};

const toPageFilterValues = (
  filter: APIDynamicFilters,
  products: IsabelaProduct[],
): FilterToggleValue => ({
  quantity: countPageFiltersQuantity(
    products,
    "typeValue",
    filter.IdTipo,
    filter.Nome,
  ),
  label: filter.Nome,
  value: filter.Nome,
  selected: false,
  url: "",
});

const toPageInfo = ({ Total, Pagina, Offset }: IsabelaProductData) => {
  const totalPages = Math.ceil(Total / Offset);
  const nextPage = totalPages > Pagina ? `?page=${Pagina + 1}` : undefined;
  const previousPage = Pagina > 1 ? `?page=${Pagina + 1}` : undefined;
  return {
    nextPage,
    previousPage,
    currentPage: Pagina - 1,
    records: Total,
    recordPerPage: Offset,
  };
};

//TODO: API isn't returning the name of the primary category. When fixed, refactor this function
const toPageBreadcrumbList = (url: URL, name: string) => {
  const categoriesSlug = url.pathname.split("/").filter((p) => p != "");
  return categoriesSlug.map((_c, i) => ({
    "@type": "ListItem" as const,
    name,
    item: new URL(
      `/${
        categoriesSlug
          .slice(0, i + 1)
          .join("/")
      }`,
      url.origin,
    ).href,
    position: i + 1,
  }));
};

const countPageFiltersQuantity = (
  products: IsabelaProduct[],
  match: "typeId" | "typeValue",
  typeId: number,
  typeValue?: string,
) =>
  products
    .filter((product) =>
      product.Classificacoes.some((item) => {
        if (match == "typeId") return item.IdTipo === typeId;
        return item.Nome === typeValue && item.IdTipo === typeId;
      })
    )
    .length;
