import { IconTitle } from "$store/components/ui/IconTitle.tsx";
import type { IconTitleProps } from "$store/components/ui/IconTitle.tsx";
import ProductShelf from "$store/components/product/ProductShelf.tsx";
import { Context } from "$store/packs/accounts/configStore.ts";
import type { SectionProps } from "$live/mod.ts";
import { getCookies } from "std/http/mod.ts";
import { visitedProductsCookie } from "$store/components/constants.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

export interface Props {
  header?: IconTitleProps;
  isStopwatchEnabled?: boolean;
}

export async function loader({ ...props }: Props, req: Request, ctx: Context) {
  const cookies = getCookies(req.headers);
  const currentIds: string | undefined = cookies?.[visitedProductsCookie];
  const splitedIds = currentIds?.split(":");

  if (!splitedIds?.length) {
    return { ...props, products: [] };
  }

  const products = await ctx.invoke(
    "deco-sites/otica-isabela/loaders/product/productList.ts",
    { id: splitedIds, ordenacao: "none" },
  );

  if (!products) {
    return { ...props, products: [] };
  }

  return {
    ...props,
    products: splitedIds
      .reverse()
      .map((v) => products.find((p) => p.productID == v ?? null))
      .filter((item) => item !== null && item !== undefined) as Product[],
  };
}

function VisitedProductShelf({
  products,
  header,
  isStopwatchEnabled,
}: SectionProps<typeof loader>) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full flex flex-col gap-12 lg:gap-16 ">
      <IconTitle {...header} />
      <ProductShelf
        itemsPerPage={{ desktop: 3, mobile: 1.5 }}
        products={products}
        itemListName="Produtos Visitados"
        isStopwatchEnabled={isStopwatchEnabled}
      />
    </div>
  );
}

export default VisitedProductShelf;
