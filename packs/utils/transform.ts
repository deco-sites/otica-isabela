import { Image, Product as IsabelaProduct } from "$store/packs/types.ts";
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
  } = product;

  const productImages = Imagens.map((image: Image) => image.Imagem);

  const productsInfo = Classificacoes.map((productInfo) => productInfo);

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
    additionalProperty: productsInfo.map((propertieValue): PropertyValue => ({
      "@type": "PropertyValue" as const,
      name: propertieValue.Tipo,
      value: propertieValue.Nome,
    })),
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
