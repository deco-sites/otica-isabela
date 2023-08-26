import { IconTitle } from "$store/components/ui/IconTitle.tsx";
import type { IconTitleProps } from "$store/components/ui/IconTitle.tsx";
import ProductShelf from "$store/components/product/ProductShelf.tsx";
import type { Context } from "deco-sites/std/packs/vtex/accounts/vtex.ts";
import type { SectionProps } from "$live/mod.ts";
import { getCookies } from "std/http/mod.ts";
import { visitedProductsCookie } from "$store/components/constants.ts";

export interface Props {
  header?: IconTitleProps;
}

export async function loader(
  { ...props }: Props,
  req: Request,
  ctx: Context,
) {
  const cookies = getCookies(req.headers);
  const currentIds: string | undefined = cookies?.[visitedProductsCookie];
  const splitedIds = currentIds?.split(":");

  if (!splitedIds?.length) {
    return { ...props, products: [] };
  }

  const products = await ctx.invoke(
    "deco-sites/std/loaders/vtex/intelligentSearch/productList.ts",
    { ids: splitedIds },
  );

  return { ...props, products };
}

function VisitedProductShelf({
  products,
  header,
}: SectionProps<typeof loader>) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full flex flex-col gap-12 lg:gap-16 ">
      <IconTitle {...header} />
      <ProductShelf
        itemsPerPage={{ desktop: 3, mobile: 0 }}
        products={products}
        itemListName="Produtos Visitados"
      />
    </div>
  );
}

export default VisitedProductShelf;
