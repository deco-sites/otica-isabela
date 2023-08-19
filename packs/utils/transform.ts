import { Product as IsabelaProduct } from "$store/packs/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

export function toProduct(product: IsabelaProduct): Product {
  const {
    IdProduct,
    UrlFriendlyColor,
    Nome,
    Imagem,
    ValorDesconto,
    ValorOriginal,
    Altura,
    Largura,
    Ponte,
    Hastes,
    FrenteTotal,
    Aro,
  } = product;

  function newPropertyValue(properties: Record<string, string>) {
    const result = [];

    for (const propertyName in properties) {
      const propertyValue = properties[propertyName];
      const propertyObject = {
        "@type": "PropertyValue" as const,
        name: propertyName,
        value: propertyValue,
      };
      result.push(propertyObject);
    }

    return result;
  }

  const additionalProperty = newPropertyValue({
    Altura,
    Largura,
    Ponte,
    Hastes,
    FrenteTotal,
    Aro,
  });

  return {
    "@type": "Product",
    productID: `${IdProduct}`,
    url:
      new URL(UrlFriendlyColor, "https://www.oticaisabeladias.com.br/produto/")
        .href,
    name: Nome,
    sku: `${IdProduct}`,
    image: [{
      "@type": "ImageObject" as const,
      alternateName: Nome,
      url: Imagem,
    }],
    additionalProperty,
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
