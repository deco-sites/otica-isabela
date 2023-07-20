import Image from "deco-sites/std/components/Image.tsx";

export interface NavItemProps {
  label: string;
  href: string;
  children?: NavItemProps[];
  image?: { src?: string; alt?: string };
}

interface Props {
  items?: NavItemProps[];
}

export const NavItem = ({ items }: Props) => {
  if (!items?.length) {
    return null;
  }

  return (
    <div class="hidden lg:flex flex-row justify-center items-center">
      {items?.map(({ href, label, children, image }) => {
        return (
          <li class="group flex items-center">
            <a href={href} class="px-4 py-3">
              <span class="text-white hover:text-primary  text-16 font-semibold text-lg font-sans ">
                {label}
              </span>
            </a>

            {children && children.length > 0 &&
              (
                <div
                  class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 w-screen"
                  style={{ top: "0px", left: "0px", marginTop: "180px" }}
                >
                  {image?.src && (
                    <Image
                      class="p-6"
                      src={image.src}
                      alt={image.alt}
                      width={300}
                      height={332}
                      loading="lazy"
                    />
                  )}
                  <ul class="flex items-start justify-center gap-6">
                    {children.map((node) => (
                      <li class="p-6">
                        <a class="hover:underline" href={node.href}>
                          <span>{node.label}</span>
                        </a>

                        <ul class="flex flex-col gap-1 mt-4">
                          {node.children?.map((leaf) => (
                            <li>
                              <a class="hover:underline" href={leaf.href}>
                                <span class="text-xs">{leaf.label}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </li>
        );
      })}
    </div>
  );
};

export default NavItem;
