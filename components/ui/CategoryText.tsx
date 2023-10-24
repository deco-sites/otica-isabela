import type { SectionProps } from "$live/types.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { useSignal } from "@preact/signals";

export interface Category {
  /** @description RegExp to enable this text category on the current URL. Use /feminino/* to display this text category on feminino category  */
  matcher: string;
  page: LoaderReturnType<ProductListingPage | null>;

  /**
   * @title Description
   * @format html
   */
  html?: string;
}

function CategoryText({ category }: SectionProps<ReturnType<typeof loader>>) {
  const isExpanded = useSignal(false);

  if (!category) {
    return null;
  }

  const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
  };

  const { html } = category;

  return (
    <div class="container px-8 mb-8">
      {!!html && (
        <>
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            style={{
              overflow: "hidden",
              maxHeight: isExpanded.value ? "none" : 250,
            }}
          />
          <button
            class="bg-black text-white px-[20px] py-[10px] text-xs mt-4 rounded-[5px]"
            onClick={toggleExpand}
          >
            {isExpanded.value ? "Ver menos" : "Ver mais"}
          </button>
        </>
      )}
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
