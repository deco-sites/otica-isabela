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

export interface Props {
  header?: HeaderProps;
  isStopwatchEnabled?: boolean;
  customer: LoaderReturnType<AuthData>;
}

export async function loader(
  { ...props }: Props,
  req: Request,
  ctx: AppContext,
) {
  const cookies = getCookies(req.headers);
  const currentSlugs: string | undefined = cookies?.[visitedProductsCookie];
  const splitedSlugs = currentSlugs?.split(":");

  if (!splitedSlugs?.length) {
    return { ...props, products: [] };
  }

  const productResults = await Promise.all(
    splitedSlugs.map(async (slug) => {
      try {
        const page = await ctx.invoke(
          "site/loaders/product/productDetailsV2.ts",
          {
            slug,
          },
        );
        return page?.product;
      } catch {
        return undefined;
      }
    }),
  );

  const products = productResults.filter(
    (product) => product !== undefined,
  );

  if (!products?.length) {
    return { ...props, products: [] };
  }

  return {
    ...props,
    products: products.reverse(), // Reverse to show the last visited first
  };
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

export const LoadingFallback = () => <Section.PlaceholderShelf  class="bg-gray-scale-100" />;
