import { CategoryMatcher } from "$store/components/search/SearchResult.tsx";

export interface Props {
  categories: CategoryMatcher[];
  url: string;
}

function CategoryMenu({ categories, url }: Props) {
  const categoryList = categories.find(({ label }) =>
    new URLPattern({ pathname: label }).test(url)
  );

  function capitalizeWords(text: string) {
    return text
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  if (!categoryList?.categoryItems || categoryList?.categoryItems.length === 0) {
    return null;
  }

  return (
    <div class="flex max-lg:flex-wrap gap-3.5 lg:items-center">
      {categoryList?.categoryItems?.map(({ label, link }) => (
        <div class="border-[1px] border-black hover:border-slot-primary-500 text-grayscale-700 hover:text-slot-primary-500 py-[5px] max-lg:py-1 px-4 max-lg:px-3 rounded-[17px] text-center">
          <a
            class="font-bold hover:underline text-sm max-lg:text-xs"
            href={link}
          >
            {capitalizeWords(label)}
          </a>
        </div>
      ))}
    </div>
  );
}

export default CategoryMenu;
