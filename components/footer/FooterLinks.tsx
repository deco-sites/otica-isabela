import type { LinksSection } from "./Footer.tsx";

export default function FooterLinks(
  { links }: { links: LinksSection[] },
) {
  return (
    <div class="w-full border-b-[1px] border-b-white">
      {links.length > 0 && (
        <ul
          class={`container flex flex-col md:flex-row justify-between w-full bg-black pt-10  pb-5  `}
        >
          {links.map(({ items, title }) => (
            <li class="flex flex-col gap-2">
              <span class="font-bold text-base text-blue-200 uppercase">
                {title}
              </span>
              <ul class={`flex flex-col gap-1 flex-wrap text-sm`}>
                {items?.map((item) => (
                  <li>
                    <a
                      href={item.href}
                      class="block py-1 link no-underline   text-white hover:text-white"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
