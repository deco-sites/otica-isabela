import { Context } from "$store/packs/accounts/configStore.ts";
import { ProductData } from "$store/packs/types.ts";
import { paths } from "$store/packs/utils/path.ts";
import { toProduct } from "$store/packs/utils/transform.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";

const loader = async (
  _props: string,
  _req: Request,
  ctx: Context,
): Promise<ProductDetailsPage> => {
  const { configStore: config } = ctx;
  const path = paths(config!);

  const productsData = await fetchAPI<ProductData>(
    `${path.product.getProduct("1464")}`,
    {
      method: "POST",
    },
  );

  const product = productsData.produtos[0];

  return {
    "@type": "ProductDetailsPage",
    // TODO: Find out what's the right breadcrumb on vnda
    breadcrumbList: {
      "@type": "BreadcrumbList",
      itemListElement: [],
      numberOfItems: 0,
    },
    product: toProduct(product),
    seo: {
      canonical: product.UrlFriendlyColor ?? "",
      description: product.DescricaoSeo ?? "",
      title: product.TituloSeo ?? "",
    },
  };
};
export default loader;
