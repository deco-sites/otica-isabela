import Image from "deco-sites/std/components/Image.tsx";
import type { NewNavItem } from "deco-sites/otica-isabela/components/header/Header.tsx";

function NavItem({ item }: { item: NewNavItem }) {
  const { href, label, children } = item;

  return (
    <li class="group flex items-center">
      <a href={href} class="px-4 py-3">
        <span class="group-hover:underline text-white">
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed rounded-xl hidden border- hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 "
            style={{ top: "0px", left: "0px", marginTop: "200px" }}
          >
            {children.map(({ href, label, image }) => {
              <a>
                <div>
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
                </div>
              </a>;
            })}
          </div>
        )}
    </li>
  );
}

export default NavItem;
