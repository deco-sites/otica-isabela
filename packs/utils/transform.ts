import {
  ColorVariants,
  Image,
  Product as IsabelaProduct,
  ProductInfo,
} from "$store/packs/types.ts";
import type {
  AggregateOffer,
  ImageObject,
  Product,
  ProductGroup,
  PropertyValue,
} from "deco-sites/std/commerce/types.ts";

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
    offers: toOffer(ValorOriginal, ValorDesconto),
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
    const coresProperties = variants.map((variant) => ({
      "@type": "PropertyValue" as const,
      "name": "Cor",
      "value": variant.NomeColor,
      "propertyID": "color",
      "unitCode": `${variant.Color1}${
        variant.Color2.length > 0 ? " / " + variant.Color2 : ""
      }`,
    }));
    additionalProperties.push(...coresProperties);
  }

  const typeProperties = properties.map((item) => ({
    "@type": "PropertyValue" as const,
    "name": item.Nome,
    "value": item.Tipo,
  }));

  additionalProperties.push(...typeProperties, {
    "@type": "PropertyValue" as const,
    "name": "Experimentador",
    "propertyID": "experimentador",
    "value": experimentador,
  });

  return additionalProperties;
};

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
      additionalProperty: [{
        "@type": "PropertyValue" as const,
        "name": "Cor",
        "value": variant.NomeColor,
        "propertyID": "color",
        "unitCode": `${variant.Color1}${
          variant.Color2.length > 0 ? " / " + variant.Color2 : ""
        }`,
      }],
      Imagem: variant.Imagem,
      offers: toOffer(variant.ValorOriginal, variant.ValorDesconto),
    };
  }),
  url: toUrl(master.UrlFriendlyColor),
  name: master.Nome,
  additionalProperty: [],
  model: `${master.IdProduct}`,
} ?? []);

const toOffer = (
  ValorOriginal: number,
  ValorDesconto: number,
): AggregateOffer => ({
  "@type": "AggregateOffer",
  highPrice: ValorOriginal,
  lowPrice: ValorDesconto,
  offerCount: 1,
  offers: [{
    "@type": "Offer",
    price: ValorOriginal,
    availability: "https://schema.org/InStock",
    inventoryLevel: { value: undefined },
    priceSpecification: [],
  }],
});
