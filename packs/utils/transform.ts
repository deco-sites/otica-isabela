import {
  APIDynamicFilters,
  APIGetTestimonials,
  Category,
  ColorVariants,
  DynamicFilter,
  Image,
  Panels,
  PLPPageProps,
  Product as IsabelaProduct,
  ProductData as IsabelaProductData,
  ProductInfo,
  ProductListiningPageProps,
  Review,
} from "$store/packs/types.ts";
import type {
  AggregateOffer,
  BreadcrumbList,
  Filter,
  FilterRange,
  FilterToggle,
  FilterToggleValue,
  ImageObject,
  Offer,
  Product,
  ProductDetailsPage,
  ProductGroup,
  ProductListingPage,
  PropertyValue,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";
import { RANGE_FILTERS, SORT_OPTIONS } from "$store/packs/constants.ts";

type CategoryPageProps = Required<
  Omit<
    ProductListiningPageProps,
    "pageType" | "term" | "filtersUrl" | "productsData"
  >
> & { filtersUrl: DynamicFilter[] | undefined };

interface ToAdditionalPropertiesProps {
  properties: ProductInfo[];
  variants: ColorVariants[];
  experimentador: string;
  rating: number;
  panels?: Panels[];
  flag?: string;
  measurementsImg: string;
  isAllowedToAddLens: boolean;
  isLensWithoutPrescription: boolean;
  lensDescription: string;
}

interface ToOfferProps {
  originalValue: number;
  discountedValue: number;
  priceValidUntil: string;
  stock: number;
  installment?: string;
}

interface ToDefaultPropertiesProps {
  id: string;
  value?: string;
}

interface ToPageFiltersProps {
  filters: APIDynamicFilters[];
  baseURL: URL;
  filtersUrl?: DynamicFilter[];
}

interface ToToggleFilterValuesProps {
  filterApi: APIDynamicFilters;
  filterLabel: string;
  baseURL: URL;
  filtersUrl?: DynamicFilter[];
}

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
    Paineis,
    DescricaoSeo,
    IdSku,
    OfertaFlag,
    ValorParcelamento,
    Avaliacoes,
    ImagemMedidas,
    PodeAdicionarLente,
    LentesContatoSemGrau,
    FraseLentesContato,
  } = product;

  const isVariantOf = product.ProdutosMaisCores
    ? toVariantProduct(product, product.ProdutosMaisCores)
    : undefined;

  return {
    "@type": "Product",
    productID: `${IdProduct}`,
    url: toUrl(UrlFriendlyColor),
    name: Nome.trim(),
    category: toCategory([NomeCategoriaPai.trim(), NomeCategoria.trim()]),
    sku: `${IdSku}`,
    description:
      Paineis?.find((p) => p.IdTipoPainel == 11)?.Descricao ?? DescricaoSeo,
    image: toImage(Imagens, Nome),
    additionalProperty: toAdditionalProperties({
      properties: Classificacoes,
      variants: ProdutosMaisCores,
      experimentador: ImagemExperimentador?.replace("www.", "secure."),
      panels: Paineis,
      flag: OfertaFlag,
      rating: Avaliacoes,
      measurementsImg: ImagemMedidas,
      isAllowedToAddLens: PodeAdicionarLente,
      isLensWithoutPrescription: LentesContatoSemGrau,
      lensDescription: FraseLentesContato,
    }),
    isVariantOf,
    offers: toAggregateOffer({
      originalValue: ValorOriginal,
      discountedValue: ValorDesconto,
      priceValidUntil: OfertaTermina,
      stock: QtdeEstoque,
      installment: ValorParcelamento,
    }),
  };
}

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
      title: `${product.TituloSeo}`,
      description: `${product.DescricaoSeo}`,
      canonical: `${baseURL}/produto/${product.UrlFriendlyColor}`,
    },
  };
}

const toCategory = (category: Array<string>) =>
  category
    .map((word) => (word.endsWith(" ") ? word.slice(0, -1) : word))
    .join(">");

const toUrl = (UrlFriendlyColor: string) => `/produto/${UrlFriendlyColor}`;

const toImage = (
  imagesFromAPI: Image[],
  alternateName: string
): ImageObject[] =>
  imagesFromAPI.map(({ Imagem, Video }) => {
    const [url, additionalType, image] = Video
      ? [
          Video,
          "video",
          [
            {
              "@type": "ImageObject" as const,
              url: new URL(Imagem, "https://secure.oticaisabeladias.com.br/")
                .href,
              alternateName,
              additionalType: "image",
            },
          ],
        ]
      : [Imagem, "image", undefined];
    return {
      "@type": "ImageObject" as const,
      alternateName,
      url,
      additionalType,
      image,
    };
  });

const toAdditionalProperties = (
  props: ToAdditionalPropertiesProps
): PropertyValue[] => {
  const {
    properties,
    panels,
    experimentador,
    flag,
    rating,
    measurementsImg,
    isAllowedToAddLens,
    isLensWithoutPrescription,
    lensDescription,
  } = props;

  return [
    ...toProductColorAdditionalProperties(properties),
    ...properties.map((item) => ({
      "@type": "PropertyValue" as const,
      name: item.Nome,
      value: item.Tipo,
    })),
    ...(panels
      ?.filter(({ IdTipoPainel }) => IdTipoPainel != 11)
      .map((p) => ({
        "@type": "PropertyValue" as const,
        name: p.TipoPainel,
        value: p.Descricao,
        propertyID: "panel",
        unitCode: `${p.IdTipoPainel}`,
      })) ?? []),
    ...toDefaultProperties([
      { id: "experimentador", value: experimentador },
      { id: "rating", value: String(rating.toFixed(1)) },
      { id: "flag", value: flag },
    ]),
    ...toMeasurementsImgAdditionalProperties(measurementsImg),
    ...toIsAllowedToAddLens(isAllowedToAddLens),
    ...toIsLensWithoutPrescription(isLensWithoutPrescription),
    ...toLensDescription(lensDescription),
  ];
};

const toLensDescription = (lensDescription: string): PropertyValue[] => {
  if (!lensDescription) return [];
  return [
    {
      "@type": "PropertyValue" as const,
      name: "Descrição Lentes",
      value: lensDescription,
      propertyID: "lensDescription",
    },
  ];
};

const toIsLensWithoutPrescription = (
  toIsLensWithoutPrescription: boolean
): PropertyValue[] => {
  if (!toIsLensWithoutPrescription) return [];
  return [
    {
      "@type": "PropertyValue" as const,
      name: "Lens sem grau",
      value: String(toIsLensWithoutPrescription),
      propertyID: "isLensWithoutPrescription",
    },
  ];
};

const toIsAllowedToAddLens = (isAllowedToAddLens: boolean): PropertyValue[] => {
  if (!isAllowedToAddLens) return [];
  return [
    {
      "@type": "PropertyValue" as const,
      name: "Pode Adicionar Lentes",
      propertyID: "isAllowedToAddLens",
    },
  ];
};

const toMeasurementsImgAdditionalProperties = (
  imgUrl: string
): PropertyValue[] | [] => {
  return [
    {
      "@type": "PropertyValue" as const,
      name: "Imagem Medidas",
      value: imgUrl,
      propertyID: "measurementsImg",
    },
  ];
};

const toProductColorAdditionalProperties = (
  properties: ProductInfo[]
): PropertyValue[] | [] => {
  const colorName = Object.values(properties).filter(
    (value) => value.IdTipo === 14 || value.Tipo === "Cor"
  );

  if (colorName.length === 0) return [];
  return colorName.map(({ Nome, Cor }) => ({
    "@type": "PropertyValue" as const,
    name: "Cor",
    value: Nome,
    propertyID: "color",
    unitCode: Cor,
  }));
};

const toDefaultProperties = (
  items: ToDefaultPropertiesProps[]
): PropertyValue[] =>
  items
    .filter(({ value }) => !!value)
    .map(({ id, value }) => ({
      "@type": "PropertyValue" as const,
      name: id.replace(/^(.)/, (match) => match.toUpperCase()),
      propertyID: id,
      value: value,
    }));

const toColorPropertyValue = (variant: ColorVariants): PropertyValue[] =>
  Object.keys(variant)
    .filter((prop) => prop.startsWith("Color") && variant[prop as keyof object])
    .map((color) => ({
      "@type": "PropertyValue" as const,
      name: "Cor",
      value: variant["NomeColor" as keyof object],
      propertyID: "color",
      unitCode: variant[color as keyof object],
    }));

const toVariantProduct = (
  master: IsabelaProduct,
  variants: ColorVariants[]
): ProductGroup => ({
  "@type": "ProductGroup" as const,
  productGroupID: `${master.IdProduct}`,
  hasVariant: variants.map((variant) => {
    const { ValorOriginal, ValorDesconto, OfertaTermina } = variant;
    return {
      "@type": "Product" as const,
      category: toCategory([
        master.NomeCategoriaPai.trim(),
        master.NomeCategoria.trim(),
      ]),
      productID: `${variant.IdProduct}`,
      url: toUrl(variant.UrlFriendlyColor),
      name: variant.Nome.trim(),
      sku: `${variant.IdProduct}`,
      additionalProperty: toColorPropertyValue(variant),
      Imagem: variant.Imagem,
      offers: toAggregateOffer({
        originalValue: ValorOriginal,
        discountedValue: ValorDesconto,
        priceValidUntil: OfertaTermina,
        stock: master.QtdeEstoque,
        installment: master.ValorParcelamento,
      }),
    };
  }),
  url: toUrl(master.UrlFriendlyColor),
  name: master.Nome,
  additionalProperty: [],
  model: `${master.IdProduct}`,
});

const toAggregateOffer = (props: ToOfferProps): AggregateOffer => ({
  "@type": "AggregateOffer",
  highPrice: props.originalValue,
  lowPrice: props.discountedValue,
  offerCount: 1,
  priceCurrency: "BRL",
  offers: [
    {
      ...toOffer({ ...props }),
    },
  ],
});

const toOffer = (props: ToOfferProps): Offer => ({
  "@type": "Offer",
  availability:
    props.stock > 0
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock",
  inventoryLevel: { value: undefined },
  price: props.discountedValue || props.originalValue,
  priceSpecification: toPriceSpecification(
    props.discountedValue,
    props.originalValue,
    props.installment
  ),
  priceValidUntil: props.priceValidUntil,
});

const toPriceSpecification = (
  price: number,
  listPrice: number,
  installment?: string
): UnitPriceSpecification[] => {
  const match = installment?.match(/(\d+)x de ([\d,]+)/) ?? null;

  const installments = match ? toInstallments(price, match) : [];

  return [
    {
      "@type": "UnitPriceSpecification",
      priceType: "https://schema.org/ListPrice",
      price: listPrice,
    },
    {
      "@type": "UnitPriceSpecification",
      priceType: "https://schema.org/SalePrice",
      price,
    },
    ...installments,
  ];
};

const toInstallments = (
  price: number,
  match: RegExpMatchArray
): UnitPriceSpecification[] => {
  const installmentsQty = parseInt(match[1], 10);

  const installmentPrices = Array.from({ length: installmentsQty }, (_v, i) =>
    Number((Math.floor((price / (i + 1)) * 100) / 100).toFixed(2))
  );

  return installmentPrices.map((value, i): UnitPriceSpecification => {
    const [description, billingIncrement] = !i
      ? ["À vista", price]
      : [i + 1 + " vezes sem juros", value];
    return {
      "@type": "UnitPriceSpecification",
      priceType: "https://schema.org/SalePrice",
      priceComponentType: "https://schema.org/Installment",
      description,
      billingDuration: i + 1,
      billingIncrement,
      price,
    };
  });
};

const toBreadcrumbList = (
  {
    NomeCategoriaPai,
    NomeCategoria,
    UrlFriendlyCategoriaPai,
    UrlFriendlyCategoria,
  }: IsabelaProduct,
  baseURL: string
): BreadcrumbList => {
  const categories = !NomeCategoriaPai
    ? [
        {
          name: NomeCategoria.trim(),
          url: UrlFriendlyCategoriaPai,
        },
      ]
    : [
        {
          name: NomeCategoriaPai.trim(),
          url: UrlFriendlyCategoriaPai,
        },
        {
          name: NomeCategoria.trim(),
          url: UrlFriendlyCategoria,
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

// <<---- ProductListiningPage ---->>

export const toProductListingPage = (
  props: ProductListiningPageProps
): ProductListingPage => {
  const { productsData, pageType, baseURL } = props;
  const { produtos } = productsData;
  const { itemListElement, filters, seo } =
    pageType == "category"
      ? categoryPageProps({
          baseURL,
          category: props.category!,
          filtersApi: props.filtersApi!,
          filtersUrl: props.filtersUrl,
        })
      : searchPageProps(baseURL, props.term);

  return {
    "@type": "ProductListingPage",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement,
      numberOfItems: itemListElement.length,
    },
    filters,
    products: produtos.map((product) => toProduct(product)),
    pageInfo: toPageInfo(productsData, baseURL.searchParams),
    sortOptions: SORT_OPTIONS,
    seo,
  };
};

const categoryPageProps = (props: CategoryPageProps): PLPPageProps => {
  const { baseURL, category, filtersApi, filtersUrl } = props;
  console.log(baseURL);
  return {
    itemListElement: toPageBreadcrumbList(category, baseURL),
    filters: groupPageFilters(filtersApi).map((f) =>
      toPageFilters({ filters: f, baseURL, filtersUrl })
    ),
    seo: {
      title: category!.Title_SEO,
      description: category!.PageDescription_SEO ?? category!.Description_SEO,
      canonical: baseURL.origin + baseURL.pathname,
    },
  };
};

const toPageFilters = (props: ToPageFiltersProps): Filter => {
  const { filters } = props;
  return RANGE_FILTERS.includes(filters[0].IdTipo)
    ? toRangeFilter(filters)
    : toToggleFilter({ ...props });
};

const toToggleFilter = (props: ToPageFiltersProps): FilterToggle => {
  const { filters, baseURL, filtersUrl } = props;
  return {
    "@type": "FilterToggle",
    key: `${filters[0].IdTipo}`,
    label: filters[0].NomeTipo,
    quantity: 0,
    values: filters.map((individualFilter) =>
      toToggleFilterValues({
        filterApi: individualFilter,
        filterLabel: filters[0].NomeTipo,
        baseURL,
        filtersUrl,
      })
    ),
  };
};

const toRangeFilter = (f: APIDynamicFilters[]): FilterRange => {
  const values = f.map(({ Nome }) => Number(Nome));
  return {
    "@type": "FilterRange",
    key: `${f[0].IdTipo}`,
    label: f[0].NomeTipo,
    values: {
      min: Math.min(...values),
      max: Math.max(...values),
    },
  };
};

const searchPageProps = (url: URL, term?: string): PLPPageProps => {
  const pathsItemList = url.pathname.includes("busca")
    ? [
        {
          "@type": "ListItem" as const,
          name: "BUSCA",
          item: new URL(`/busca`, url.origin).href,
          position: 1,
        },
      ]
    : [];

  const termItemList =
    term && pathsItemList.length
      ? [
          {
            "@type": "ListItem" as const,
            name: term.toUpperCase(),
            item: new URL(`${url.pathname}?termo=${term}`, url.origin).href,
            position: pathsItemList.length + 1,
          },
        ]
      : [];

  return {
    itemListElement: [...pathsItemList, ...termItemList],
    filters: [],
    seo: {
      title: "",
      description: "",
      canonical: "",
    },
  };
};

const groupPageFilters = (
  filtersApi: APIDynamicFilters[]
): APIDynamicFilters[][] => {
  return filtersApi.reduce<APIDynamicFilters[][]>((acc, filter) => {
    const accIndex = acc.findIndex((aux) =>
      aux.some((item) => item.IdTipo === filter.IdTipo)
    );

    if (acc[accIndex]) {
      acc[accIndex].push(filter);
      return acc;
    }

    return [...acc, [filter]];
  }, []);
};

const toToggleFilterValues = (
  props: ToToggleFilterValuesProps
): FilterToggleValue => {
  const { filterApi, filtersUrl, baseURL, filterLabel } = props;
  const selected = !filtersUrl
    ? false
    : filtersUrl.some(
        (filter) =>
          filter.filterID === filterApi.IdTipo &&
          filter.filterValue === filterApi.Nome
      );
  return {
    quantity: 0,
    label: filterApi.Nome,
    value: filterApi.Nome,
    selected,
    url: toPageFilterURL(baseURL, filterLabel, filterApi.Nome, selected).href,
  };
};

const toPageFilterURL = (
  baseURL: URL,
  filter: string,
  filterValue: string,
  selected: boolean
): URL => {
  const modifiedURL = new URL(baseURL.href);
  const defaultParamsToDelete = ["path", "pathTemplate", "deviceHint", "page"];
  const filterParamName = `filter.${filter}`;

  defaultParamsToDelete.forEach((p: string) =>
    modifiedURL.searchParams.delete(p)
  );

  selected
    ? modifiedURL.searchParams.delete(filterParamName, filterValue)
    : modifiedURL.searchParams.append(filterParamName, filterValue);

  return modifiedURL;
};

const toPageInfo = (
  { Total, Pagina, Offset }: IsabelaProductData,
  params: URLSearchParams
) => {
  const totalPages = Math.ceil(Total / Offset);

  const hasNextPage = totalPages > Pagina;
  const hasPreviousPage = Pagina > 1;
  const nextPage = new URLSearchParams(params);
  const previousPage = new URLSearchParams(params);

  if (hasNextPage) {
    nextPage.set("page", (Pagina + 1).toString());
  }

  if (hasPreviousPage) {
    previousPage.set("page", (Pagina - 1).toString());
  }

  return {
    nextPage: hasNextPage ? `?${nextPage.toString()}` : undefined,
    previousPage: hasPreviousPage ? `?${previousPage.toString()}` : undefined,
    currentPage: Pagina - 1,
    records: Total,
    recordPerPage: Offset,
  };
};

const toPageBreadcrumbList = (category: Category, url: URL) => {
  const categories = [category.CategoriaPai ?? null, category].filter(
    (p) => p != null
  );
  const breadcrumbList = categories.map((c, i) => {
    return {
      "@type": "ListItem" as const,
      name: c.Nome,
      item: new URL(
        `/${categories
          .slice(0, i + 1)
          .map(({ UrlFriendly }) => UrlFriendly)
          .join("/")}`,
        url.origin
      ).href,
      position: i + 1,
    };
  });
  return breadcrumbList;
};

export const toReview = (testimonial: APIGetTestimonials, url: URL): Review => {
  const {
    Stars,
    Stars_Quality,
    Stars_Price,
    Stars_Service,
    NameCustomer,
    CommentsPhrase,
    Comments,
    CustomerAddress,
    NameProduct,
    ImagePath,
    UrlFriendly,
    CommentsImgPath,
    StampImagePath,
  } = testimonial;
  const stamp = StampImagePath.split("/").pop() ?? "";
  return {
    ratingValue: Stars,
    ratingQuality: Stars_Quality,
    ratingPrice: Stars_Price,
    ratingService: Stars_Service,
    authorName: NameCustomer,
    reviewPhrase: CommentsPhrase,
    reviewDescription: Comments,
    authorCity: CustomerAddress,
    productName: NameProduct,
    productPhoto: ImagePath,
    productLink: `${url.origin}/produto/${UrlFriendly}`,
    additionalImage: CommentsImgPath,
    memberLevel: stamp === "" ? "default" : stamp.replace(/\.[^.]+$/, ""),
  };
};
