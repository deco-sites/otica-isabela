import type { ISecondBlock as SecondBlockProps } from "./Footer.tsx";

export const SecondBlock = (
  { links, hideSecondBlock }: SecondBlockProps,
) => {
  if (!links?.length && hideSecondBlock) {
    return null;
  }

  return (
    <div class="w-full border-b-[1px] border-b-slate-400 ">
      <ul
        class={`container flex flex-col lg:flex-row justify-between w-full bg-black pt-10 pb-5 gap-y-4`}
      >
        {links?.map(({ items, label }) => (
          <li class="flex flex-col gap-2 w-full lg:w-1/4 ">
            <span class="font-bold text-center lg:text-start text-base  text-blue-300 uppercase w-full">
              {label ?? ""}
            </span>
            <ul
              class={`flex flex-col gap-1 flex-wrap text-sm pl-6 lg:pl-0`}
            >
              {items?.map((item) => (
                <li>
                  <a
                    href={item.href ?? ""}
                    class="block py-1 link no-underline   text-white hover:text-white"
                  >
                    {item.label ?? ""}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
