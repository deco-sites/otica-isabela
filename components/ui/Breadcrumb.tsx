import type { BreadcrumbList } from "apps/commerce/types.ts";
interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  return (
    <ul class="text-left">
      <li class="inline align-middle text-left leading-[21px]">
        <a
          class="inline-block align-middle font-outfit text-grayscale-700 text-xs capitalize hover:underline"
          href="/"
        >
          <span class="inline-block align-middle">
            Ótica Isabela Dias
          </span>
        </a>
        <span class="my-0 mx-[10px] text-sm text-grayscale-700 inline align-middle">
          ›
        </span>
      </li>
      {itemListElement
        .filter(({ name, item }) => name && item)
        .map(({ name, item }, index) => (
          <li class="inline align-middle text-left leading-[21px]">
            <a
              class="font-outfit text-grayscale-700 text-xs capitalize hover:underline"
              href={item}
            >
              {name?.toLocaleLowerCase().trim()}
            </a>
            {index < itemListElement.length - 1 && (
              <span class="my-0 mx-[10px] text-sm text-grayscale-700 inline align-middle">
                ›
              </span>
            )}
          </li>
        ))}
    </ul>
  );
}

export default Breadcrumb;
