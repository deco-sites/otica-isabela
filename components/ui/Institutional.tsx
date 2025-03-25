import SideMenuNavigation, {
  Navigation,
} from "$store/components/ui/SideMenuNavigation/SideMenuNavigation.tsx";
import { FnContext, SectionProps } from "deco/mod.ts";
import Icon from "$store/components/ui/Icon.tsx";

interface Style {
  /**
   * @format color
   * @default #000000
   */
  color: string;
  /**
   * @format color
   * @default #d6a35a
   */
  activeColor: string;
}

interface Breadcrumb {
  /**
   * @description If not provided, the header field will be used
   */
  label?: string;
  href: string;
}

interface Props {
  header: string;
  breadcrumb: Breadcrumb;
  navigations: Navigation[];
  style: Style;
}

function findNavigationAndParents(
  navigations: Navigation[],
  pathname: string,
): null | { navigation: Navigation; hrefs: string[] } {
  for (const navigation of navigations) {
    if (navigation.href === pathname) {
      return {
        navigation: navigation,
        hrefs: [navigation.href],
      };
    }

    if (navigation.navigations) {
      const found = findNavigationAndParents(navigation.navigations, pathname);
      if (found) {
        return {
          navigation: found.navigation,
          hrefs: [navigation.href, ...found.hrefs],
        };
      }
    }
  }

  return null;
}

export function loader(props: Props, req: Request, ctx: FnContext) {
  return { ...props, url: req.url, isMobile: ctx.device !== "desktop" };
}

export default function Institutional({
  header = "Instutional",
  breadcrumb = { href: "/", label: "Institutional" },
  navigations = [
    { content: [], href: "/", label: "Home" },
    { content: [], href: "/", label: "Home" },
    { content: [], href: "/", label: "Home" },
  ],
  url = "/",
  style = { activeColor: "#d6a35a", color: "#000000" },
  isMobile = false,
}: SectionProps<typeof loader>) {
  const path = new URL(url).pathname;
  const { hrefs, navigation } = findNavigationAndParents(navigations, path) ?? {
    navigation: navigations[0],
    hrefs: [navigations[0].href],
  };

  const { color, activeColor } = style;
  const { label = header, href } = breadcrumb;

  return (
    <div>
      <div class="bg-[#efefef] lg:bg-transparent py-5">
        <ul class="flex items-center gap-1 container text-xs px-3 sm:px-0">
          <li>
            <a href="/">Home</a>
          </li>
          <Icon id="ChevronRight" size={12} strokeWidth={2} />
          <li href={href}>{label}</li>
          <Icon id="ChevronRight" size={12} strokeWidth={2} />
          <li>{navigation.breadcrumbLabel ?? navigation.label}</li>
        </ul>
        {isMobile && (
          <>
            <div class="mt-4 grid grid-rows-[auto_0fr] [&:has(>#menu:checked)]:grid-rows-[auto_1fr] transition-[grid-template-rows] duration-200 overflow-hidden relative bg-white">
              <input type="checkbox" id="menu" class="hidden peer" />
              <label
                htmlFor="menu"
                class="cursor-pointer col-start-1 row-start-1 z-10"
              />
              <div class="container w-full h-fit min-h-14 col-start-1 row-start-1 cursor-pointer flex gap-3 items-center p-4 sm:p-0 justify-between peer-checked:[--icon-rotate:90deg]">
                <h2 class="font-bold">{header}</h2>
                <Icon
                  id="ChevronRight"
                  size={24}
                  strokeWidth={3}
                  class="transition-all"
                  style={{ rotate: "var(--icon-rotate, 0deg)" }}
                />
              </div>
              <div
                style={{ "--color-active": activeColor, "--color": color }}
                class="invisible col-start-1 row-start-2 min-h-0 peer-checked:visible peer-checked:min-h-fit transition-all container px-4 peer-checked:pb-4"
              >
                <SideMenuNavigation
                  activeNavigations={hrefs}
                  navigation={navigations}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div
        class="flex container gap-10 py-10 px-3 md:px-0"
        style={{ "--color-active": activeColor, "--color": color }}
      >
        {!isMobile && (
          <div class="max-w-48 w-full h-full">
            <h2 class="text-lg font-semibold mb-2">{header}</h2>
            <hr />
            <SideMenuNavigation
              activeNavigations={hrefs}
              navigation={navigations}
            />
          </div>
        )}
        <div class="w-full">
          {navigation?.content.map((section) => (
            <section.Component {...section.props} />
          ))}
        </div>
      </div>
    </div>
  );
}
