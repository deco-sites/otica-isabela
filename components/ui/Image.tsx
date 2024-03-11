import { Picture, Source } from "apps/website/components/Picture.tsx";
import Icon, {
  AvailableIcons,
} from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import { IImage } from "deco-sites/otica-isabela/sdk/types.ts";

interface ITab {
  label: string;
  icon: AvailableIcons;
  iconSize: number;
  /**
   * @format color
   */
  iconColor: string;
  /**
   * @format color
   */
  textColor: string;
  /**
   * @format color
   */
  backgroundColor: string;
  /**
   * @format color
   */
  activeBackgroundColor: string;
}

/**
 * @title Add tabbed image
 */
interface ITabbedImage {
  desktop: IImage;
  mobile: IImage;
  firstTab: ITab;
  secondTab: ITab;
  desktopMaxWidth?: string;
  mobileMaxWidth?: string;
}

/**
 * @title Remove tabbed image
 */
type RemoveTabbedImage = null;

interface Props {
  desktop: IImage;
  mobile: IImage;
  tab: RemoveTabbedImage | ITabbedImage;
  href?: string;
  container?: boolean;
  maxWidth?: number;
}

export default function ResponsiveImage({
  mobile,
  desktop,
  tab,
  href,
  maxWidth,
  container,
}: Props) {
  const preload = desktop.preload || mobile.preload;
  const fetchPriority = preload ? "high" : "low";
  const loading = preload ? "eager" : "lazy";

  const Component = href ? "a" : "div";
  const props = href ? { href } : {};

  return (
    <Component
      {...props}
      class={"block relative" + (container ? " container" : "")}
      style={{ ...(maxWidth && { maxWidth }) }}
    >
      {tab && (
        <>
          <input
            type="radio"
            name="tab"
            id="show-first-image"
            class="peer/first hidden"
            checked
          />
          <input
            type="radio"
            name="tab"
            id="show-second-image"
            class="peer/second hidden"
          />
        </>
      )}
      <Picture
        preload={preload}
        class={tab ? " peer-checked/second:hidden" : ""}
      >
        <Source
          src={desktop.src}
          width={desktop.width}
          height={desktop.height}
          alt={desktop.alt}
          fetchPriority={fetchPriority}
          loading={loading}
          media="(min-width: 768px)"
        />
        <Source
          src={mobile.src}
          width={mobile.width}
          height={mobile.height}
          alt={mobile.alt}
          fetchPriority={fetchPriority}
          loading={loading}
          media="(max-width: 767px)"
        />
        <img
          class="w-full h-auto object-cover"
          loading={preload ? "eager" : "lazy"}
          src={desktop.src}
          alt={desktop.alt}
        />
      </Picture>
      {tab && (
        <>
          <Picture preload={preload} class="relative peer-checked/first:hidden">
            <Source
              src={tab.desktop.src}
              width={tab.desktop.width}
              height={tab.desktop.height}
              alt={tab.desktop.alt}
              fetchPriority={fetchPriority}
              loading={loading}
              media="(min-width: 768px)"
            />
            <Source
              src={tab.mobile.src}
              width={tab.mobile.width}
              height={tab.mobile.height}
              alt={tab.mobile.alt}
              fetchPriority={fetchPriority}
              loading={loading}
              media="(max-width: 767px)"
            />
            <img
              class="w-full h-auto object-cover"
              loading={preload ? "eager" : "lazy"}
              src={tab.desktop.src}
              alt={tab.desktop.alt}
            />
          </Picture>
          <div
            style={{
              "--m-mw": tab.mobileMaxWidth,
              "--d-mw": tab.desktopMaxWidth ?? "320px",
            }}
            class="flex w-full max-w-[var(--m-mw)] lg:absolute lg:bottom-[5px] lg:left-[5px] lg:max-w-[var(--d-mw)] peer-checked/first:[&>label[for='show-first-image']]:bg-[var(--bg-active)] peer-checked/first:[&>label[for='show-first-image']]:font-bold peer-checked/second:[&>label[for='show-second-image']]:bg-[var(--bg-active)] peer-checked/second:[&>label[for='show-second-image']]:font-bold"
          >
            <label
              for="show-first-image"
              class="cursor-pointer w-1/2 p-2 text-center flex flex-col justify-center items-center bg-[var(--bg)]"
              style={{
                color: tab.firstTab.backgroundColor,
                "--bg": tab.firstTab.backgroundColor,
                "--bg-active": tab.firstTab.activeBackgroundColor,
              }}
            >
              <Icon
                size={tab.firstTab.iconSize}
                style={{ color: tab.firstTab.iconColor }}
                id={tab.firstTab.icon}
                strokeWidth={2}
              />
              <span style={{ color: tab.firstTab.textColor }}>
                {tab.firstTab.label}
              </span>
            </label>
            <label
              for="show-second-image"
              class="cursor-pointer w-1/2 p-2 text-center flex flex-col justify-center items-center bg-[var(--bg)]"
              style={{
                color: tab.secondTab.backgroundColor,
                "--bg": tab.secondTab.backgroundColor,
                "--bg-active": tab.secondTab.activeBackgroundColor,
              }}
            >
              <Icon
                size={tab.secondTab.iconSize}
                style={{ color: tab.secondTab.iconColor }}
                id={tab.secondTab.icon}
                strokeWidth={2}
              />
              <span style={{ color: tab.secondTab.textColor }}>
                {tab.secondTab.label}
              </span>
            </label>
          </div>
        </>
      )}
    </Component>
  );
}
