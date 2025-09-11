import { HeaderTitle } from "../../components/ui/HeaderTitle.tsx";
import type { Props as HeaderProps } from "../../components/ui/HeaderTitle.tsx";
import Section from "../../components/ui/Section.tsx";
import ProductShelf from "$store/components/product/ProductShelf.tsx";
import type { AppContext } from "$store/apps/site.ts";
import type { SectionProps } from "$live/mod.ts";
import { getCookies } from "std/http/mod.ts";
import { visitedProductsCookie } from "$store/components/constants.ts";
import { AuthData } from "$store/packs/types.ts";
import type { LoaderReturnType } from "$live/types.ts";
import { Product } from "site/packs/v2/types.ts";

export interface Props {
  header?: HeaderProps;
  isStopwatchEnabled?: boolean;
  customer: LoaderReturnType<AuthData>;
}

// TODO: Need endpoint to fetch products by ids

export async function loader(
  { ...props }: Props,
  req: Request,
  ctx: AppContext,
) {
  const products = [] as Product[];
  return { ...props, products };

  // const cookies = getCookies(req.headers);
  // const currentIds: string | undefined = cookies?.[visitedProductsCookie];
  // const splitedIds = currentIds?.split(":");

  // if (!splitedIds?.length) {
  //   return { ...props, products: [] };
  // }

  // const products = await ctx.invoke(
  //   "site/loaders/product/highlight.ts",
  //   { id: splitedIds, ordenacao: "none" },
  // );

  // if (!products) {
  //   return { ...props, products: [] };
  // }

  // return {
  //   ...props,
  //   products: splitedIds
  //     .reverse()
  //     .map((v) => products.find((p) => p.productID == v ?? null))
  //     .filter((item) => item !== null && item !== undefined) as Product[],
  // };
}

function VisitedProductShelf({
  products,
  header,
  isStopwatchEnabled,
  customer,
}: SectionProps<typeof loader>) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full flex flex-col gap-12 lg:gap-16 my-14">
      {header ? <HeaderTitle {...header} /> : null}
      <ProductShelf
        itemsPerPage={{ desktop: 3, mobile: 1.2 }}
        products={products}
        itemListName="Produtos Visitados"
        isStopwatchEnabled={isStopwatchEnabled}
        customer={customer}
      />
    </div>
  );
}

export default VisitedProductShelf;

export const LoadingFallback = () => <Section.Placeholder height="600px" />;
