import { ComponentChildren } from "preact";
import { type Section } from "@deco/deco/blocks";
export interface Navigation {
  label: string;
  href: string;
  /**
   * @description If not provided, the label field will be used
   */
  breadcrumbLabel?: string;
  navigations?: Navigation[];
  content: Section[];
}
export interface Props {
  navigation: Navigation[];
  activeNavigations: string[];
  level?: number;
}
function Wrapper({ children, level }: {
  children: ComponentChildren;
  level: number;
}) {
  if (level === 0) {
    return <aside class="text-sm">{children}</aside>;
  }
  return <>{children}</>;
}
export default function SideMenuNavigation(
  { navigation, activeNavigations, level = 0 }: Props,
) {
  return (
    <Wrapper level={level}>
      <ul style={{ paddingLeft: `${20 * level}px` }}>
        {navigation.map((nav) => {
          const hasActiveChild = activeNavigations.includes(nav.href);
          const isActive = activeNavigations.at(-1) === nav.href;
          return (
            <li class="mt-2">
              <a
                class={"hover:text-[var(--color-active)] hover:underline" +
                  (isActive
                    ? " text-[var(--color-active)]"
                    : " text-[var(--color)]")}
                href={nav.href}
              >
                {nav.label}
              </a>
              {nav.navigations && hasActiveChild && (
                <SideMenuNavigation
                  navigation={nav.navigations}
                  activeNavigations={activeNavigations}
                  level={level + 1}
                />
              )}
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
}
