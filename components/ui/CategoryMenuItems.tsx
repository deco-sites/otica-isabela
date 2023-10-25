import type { SectionProps } from "$live/types.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

type CategoryMenuItem = {
  label: string;
  link: string;
};

export interface Category {
  /** @description RegExp to enable this text category on the current URL. Use /feminino/* to display this text category on feminino category  */
  matcher: string;
  page: LoaderReturnType<ProductListingPage | null>;
  categoryItems: CategoryMenuItem[];
}

function CategoryText({ category }: SectionProps<ReturnType<typeof loader>>) {
  const { categoryItems } = category || {};

  if (!category) {
    return null;
  }

  return (
    <div class="container px-8 my-8">
      <div class="flex flex-col gap-3 lg:flex-row lg:justify-evenly lg:gap-0">
        {categoryItems?.map(({ label, link }) => (
          <div class="border-2 border-[#ef9937] py-[5px] px-[50px] rounded-lg text-center">
            <a class="text-[#ef9937] font-bold hover:underline" href={link}>
              {label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export interface Props {
  categories?: Category[];
}

export const loader = ({ categories = [] }: Props, req: Request) => {
  const category = categories.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { category };
};

export default CategoryText;
