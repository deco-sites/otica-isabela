import type { LinksSection } from "./Footer.tsx";

export default function FooterLinks(
  { links }: { links: LinksSection[] },
) {
  return (
    <>
      {links.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            class={`hidden md:flex flex-row gap-6 lg:gap-10`}
          >
            {links.map(({ items, title }) => (
              <li>
                <div class="flex flex-col gap-2">
                  <span class="font-medium text-lg">
                    {title}
                  </span>
                  <ul class={`flex flex-col gap-2 flex-wrap text-sm`}>
                    {items?.map((item) => (
                      <li>
                        <a href={item.href} class="block py-1 link link-hover">
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
