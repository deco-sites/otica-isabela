import { BreadcrumbItem } from "site/packs/v2/types.ts";

interface Props {
  items: BreadcrumbItem[];
}

function Breadcrumb({ items = [] }: Props) {
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
      {items
        .map((item, index) => (
          <li class="inline align-middle text-left leading-[21px]">
            <a
              class="font-outfit text-grayscale-700 text-xs capitalize hover:underline"
              href={item.href}
            >
              {item.name.toLocaleLowerCase().trim()}
            </a>
            {index < items.length - 1 && (
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
