import { NavItemProps } from "./NavItem.tsx";
// import { ModalOverlay } from "../ui/ModalOverlay.tsx";
import { useId } from "../../sdk/useId.ts";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import type { Props as AjudaProps } from "./Ajuda.tsx";
import Image from "apps/website/components/Image.tsx";
export interface Props {
  items: NavItemProps[];
  closeMenu?: () => void;
  ajuda?: AjudaProps;
}

function Menu({ items, closeMenu, ajuda }: Props) {
  return (
    <div className="fixed top-0 left-0 w-full bg-grayscale-0 max-w-[330px] z-50">
      <div className="px-4 py-2 flex items-center justify-between h-14 shadow-[0_4px_4px_rgba(0,0,0,0.1)]">
        <button
          onClick={closeMenu}
          className="cursor-pointer"
        >
          <Icon id="x" width={24} height={24} className="text-grayscale-700" />
        </button>

        <a
          href="/identificacao"
          className="flex justify-center items-center bg-slot-primary-500 rounded-2xl text-grayscale-0 text-sm font-bold h-full px-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
        >
          Logar | Cadastrar
        </a>
      </div>

      <div className="flex flex-col min-h-[555px] max-h-[650px] overflow-auto">
        {items.map((item) => {
          const { href = "/", label, navbarItems, mobileMenuImage } = item;
          const { src, alt } = mobileMenuImage || {};
          const id = useId();

          return (
            <div className="flex flex-col">
              {navbarItems && navbarItems.length > 0 && (
                <input id={id} type="checkbox" className="peer hidden" />
              )}

              <div className="flex border-b border-b-grayscale-50 group relative">
                <div className="h-full w-1 bg-slot-primary-500 rounded-r-2xl absolute left-0 top-0 opacity-0 pointer-events-none peer-checked:group-[]:opacity-100 peer-checked:group-[]:pointer-events-auto transition-opacity" />

                <a
                  href={href}
                  className="text-grayscale-700 py-3 px-4 w-[85%] flex items-center gap-x-4"
                >
                  {/* {src && <img width={55} height={29} src={src} alt={alt} />} */}
                  <span>{label}</span>
                </a>

                {navbarItems && navbarItems.length > 0 && (
                  <label
                    htmlFor={id}
                    className="flex justify-center items-center py-3 w-[15%]"
                  >
                    <Icon
                      id="chevron-right"
                      width={20}
                      height={20}
                      className="text-grayscale-700 rotate-90 peer-checked:group-[]:-rotate-90 transition-all"
                    />
                  </label>
                )}
              </div>

              {navbarItems && navbarItems.length > 0 && (
                <div className="grid grid-rows-[0fr] peer-checked:grid-rows-[1fr] transition-all">
                  <div className="overflow-hidden flex flex-col">
                    {navbarItems.map((subItem) => {
                      const { label, href } = subItem;

                      return (
                        <a
                          href={href}
                          className="text-grayscale-500 pl-10 py-2 hover:underline underline-offset-2"
                        >
                          {label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div class="flex flex-col">
          <input id="help" type="checkbox" class="peer hidden" />

          <div class="flex border-b border-b-grayscale-50 group relative">
            <div class="h-full w-1 bg-slot-primary-500 rounded-r-2xl absolute left-0 top-0 opacity-0 pointer-events-none peer-checked:group-[]:opacity-100 peer-checked:group-[]:pointer-events-auto transition-opacity">
            </div>

            <label
              for="help"
              class="flex justify-between items-center px-4 py-3 w-full"
            >
              <div class="flex items-center gap-2">
                Ajuda
                <Icon
                  id="info"
                  width={24}
                  height={24}
                  class="text-slot-primary-600"
                />
              </div>
              <Icon
                id="chevron-right"
                width={20}
                height={20}
                class="text-grayscale-700 rotate-90 peer-checked:group-[]:-rotate-90 transition-all"
              />
            </label>
          </div>

          <div class="grid grid-rows-[0fr] peer-checked:grid-rows-[1fr] transition-all">
            <div class="overflow-hidden flex flex-col">
              <div class="flex flex-col divide-y divide-grayscale-200">
                {ajuda.centralDeAjuda.map(({ icon, text, url }) => {
                  const Component = url ? "a" : "span";
                  const props = url ? { href: url } : {};

                  return (
                    <Component
                      {...props}
                      class="text-grayscale-500 hover:text-slot-primary-500 transition-colors flex items-center gap-2 py-3 px-4"
                      key={text}
                    >
                      <Image src={icon} alt={text} width={24} height={24} />
                      {text}
                    </Component>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="h-14 bg-[#D9D9D9] p-4 flex items-center gap-1">
        <a
          href="/ajuda-e-suporte"
          class="text-slot-primary-500 underline underline-offset-2 flex items-center gap-1.5"
        >
          Atendimento ao cliente
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_3288_21804)">
              <path
                d="M9.74692 19.6908C8.9568 20.2004 8.01525 20.4226 7.0806 20.3199C6.14597 20.217 5.27522 19.7956 4.6148 19.1262L4.03743 18.5617C3.7843 18.3027 3.64258 17.9551 3.64258 17.593C3.64258 17.231 3.7843 16.8832 4.03743 16.6244L6.48802 14.1994C6.74476 13.9471 7.09032 13.8057 7.4503 13.8057C7.81026 13.8057 8.15583 13.9471 8.41257 14.1994C8.67147 14.4525 9.01918 14.5942 9.38126 14.5942C9.74334 14.5942 10.091 14.4525 10.3499 14.1994L14.199 10.3503C14.3274 10.2238 14.4294 10.073 14.499 9.90666C14.5686 9.74037 14.6044 9.56188 14.6044 9.38161C14.6044 9.20133 14.5686 9.02286 14.499 8.85655C14.4294 8.69026 14.3274 8.53946 14.199 8.41292C13.9467 8.15619 13.8054 7.81061 13.8054 7.45065C13.8054 7.09068 13.9467 6.74511 14.199 6.48837L16.6368 4.05061C16.8957 3.79749 17.2434 3.65576 17.6054 3.65576C17.9676 3.65576 18.3153 3.79749 18.5742 4.05061L19.1388 4.62798C19.808 5.2884 20.2294 6.15915 20.3323 7.09379C20.4352 8.02844 20.213 8.96998 19.7032 9.7601C17.0473 13.6743 13.6679 17.0449 9.74692 19.6908Z"
                stroke="#00A7F5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_3288_21804">
                <rect
                  width="18"
                  height="18"
                  fill="white"
                  transform="translate(3 3)"
                />
              </clipPath>
            </defs>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default Menu;
