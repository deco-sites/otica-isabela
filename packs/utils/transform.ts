import {
  Image,
  Product as IsabelaProduct,
  ProductInfo,
} from "$store/packs/types.ts";
import type {
  ImageObject,
  Product,
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
  } = product;

  const productImages = Imagens.map((image: Image) => image.Imagem);

  const productsInfo = Classificacoes.map((productInfo) => productInfo);

  function handleNewProperties(properties: ProductInfo[]) {
    const additionalProperties: PropertyValue[] = [];

    if (ProdutosMaisCores) {
      const coresProperties = ProdutosMaisCores.map((cores) => ({
        "@type": "PropertyValue" as const,
        "name": "Cor",
        "value": cores.NomeColor,
        "propertyID": "color",
        "unitCode": `${cores.Color1} / ${cores.Color2}`,
      }));
      additionalProperties.push(...coresProperties);
    }

    const typeProperties = properties.map((item) => ({
      "@type": "PropertyValue" as const,
      "name": item.Nome,
      "value": item.Tipo,
    }));

    additionalProperties.push(...typeProperties);

    return additionalProperties;
  }

  return {
    "@type": "Product",
    productID: `${IdProduct}`,
    url:
      new URL(UrlFriendlyColor, "https://www.oticaisabeladias.com.br/produto/")
        .href,
    name: Nome.trim(),
    sku: `${IdProduct}`,
    image: productImages.map((image): ImageObject => ({
      "@type": "ImageObject" as const,
      alternateName: Nome,
      url: image,
    })),
    additionalProperty: handleNewProperties(productsInfo),
    offers: {
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
    },
  };
}
