import { IconTitle } from "$store/components/ui/IconTitle.tsx";
import ProductShelf from "$store/components/product/ProductShelf.tsx";
import { useId } from "preact/hooks";
import type { Context } from "deco-sites/std/packs/vtex/accounts/vtex.ts";
import type { SectionProps } from "$live/mod.ts";
import { getCookies } from "std/http/mod.ts";

export interface Props {
  /**
   * @title Visited product shelf title
   * @description Utilize /n para diferenciar os textos. ex: Produtos /n VISITADOS
   */

  label?: string;
}

export async function loader(
  { ...props }: Props,
  req: Request,
  ctx: Context,
) {
  const cookies = getCookies(req.headers);
  const currentIds: string | undefined = cookies?.["visited_products"];
  const splitedIds = currentIds.split(":");

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
  label,
}: SectionProps<typeof loader>) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full flex flex-col gap-12 lg:gap-16 ">
      <IconTitle label={label} />
      <ProductShelf
        itemsPerPage={{ desktop: { 0: 3 }, mobile: { 0: 1.6 } }}
        products={products}
        itemListName="Produtos Visitados"
      />
    </div>
  );
}

export default VisitedProductShelf;
