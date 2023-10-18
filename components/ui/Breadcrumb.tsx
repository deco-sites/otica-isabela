import type { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Ótica Isabela Dias", item: "/" }, ...itemListElement];

  return (
    <ul class="flex">
      {items
        .filter(({ name, item }) => name && item)
        .map(({ name, item }, index) => (
          <li>
            <a
              class="font-roboto text-[#222] text-[15px] capitalize hover:underline"
              href={item}
            >
              {name?.toLocaleLowerCase()}
            </a>
            {index < items.length - 1 && (
              <span class="my-0 mx-[10px] text-sm text-[#212529]">›</span>
            )}
          </li>
        ))}
    </ul>
  );
}

export default Breadcrumb;
