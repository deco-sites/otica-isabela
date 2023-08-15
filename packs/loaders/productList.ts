import { Context } from "$store/packs/accounts/configStore.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";
import { paths } from "$store/packs/utils/path.ts";
import { Product as IsabelaProduct, Products } from "$store/packs/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

const toProduct = (product: IsabelaProduct): Product => {
  const {
    IdProduct,
    UrlFriendlyColor,
    Nome,
    Imagem,
    ValorDesconto,
    ValorOriginal,
  } = product;

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
    offers: {
      "@type": "AggregateOffer",
      highPrice: ValorOriginal,
      lowPrice: ValorDesconto,
      offerCount: 1,
      offers: [],
    },
  };
};

/**
 * @title Oticaisabeladias Products
 * @description Use it in Shelves
 */

const loader = async (
  _props: null,
  _req: Request,
  ctx: Context,
): Promise<Product[]> => {
  const { configStore: config } = ctx;
  const path = paths(config!);

  const productsData = await fetchAPI<Products>(
    path.product.getProduct(),
    {
      method: "POST",
    },
  );

  const products = productsData.map((product) => toProduct(product));

  console.log("Products", products);

  return products;
};

export default loader;
