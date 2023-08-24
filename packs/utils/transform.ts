import {
  Image,
  Product as IsabelaProduct,
  ProductInfo,
} from "$store/packs/types.ts";
import type { ImageObject, Product } from "deco-sites/std/commerce/types.ts";

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
    return properties.map((item) => {
      const additionalProps = {
        "@type": "PropertyValue" as const,
        name: item.Nome,
        value: item.Tipo,
        cores: ProdutosMaisCores.map((cores) => {
          return {
            propertyID: "color",
            unitCode: cores.Color1,
            value: cores.NomeColor,
          };
        }),
      };
      return additionalProps;
    });
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
