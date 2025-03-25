import { CategoryMenuItem } from "$store/components/search/SearchResult.tsx";

export interface Props {
  categories: CategoryMenuItem[];
}

function CategoryMenu({ categories }: Props) {
  if (!categories) {
    return null;
  }

  return (
    <div class="container px-8 my-8">
      <div class="flex flex-col gap-3 lg:flex-row lg:justify-evenly lg:gap-0">
        {categories?.map(({ label, link }) => (
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

export default CategoryMenu;
