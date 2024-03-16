import { IImage } from "../../../sdk/types.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { ComponentChildren } from "preact";

/**
 * @title With Color
 */
export interface IBackgroundColor {
  /**
   * @format color
   */
  color: string;
}

/**
 * @title With Image
 */
export interface IBackgroundImage {
  desktop: IImage;
  mobile: IImage;
}

const isBackgroundImage = (
  backgroud: IBackgroundColor | IBackgroundImage,
): backgroud is IBackgroundImage => {
  return !("color" in backgroud);
};

export default function Background({
  props,
  class: className,
  children,
  style,
  id,
}: {
  id?: string;
  style?: Record<string, string | number | undefined>;
  props: IBackgroundColor | IBackgroundImage | null;
  class?: string;
  children: ComponentChildren;
}) {
  if (!props) {
    return (
      <div style={style} id={id} class={className}>
        {children}
      </div>
    );
  }

  if (isBackgroundImage(props)) {
    const preload = props.desktop.preload || props.mobile.preload;
    const fetchPriority = preload ? "high" : "low";
    const loading = preload ? "eager" : "lazy";
    const { mobile, desktop } = props;

    return (
      <div id={id} style={style} class={"relative z-0" + ` ${className ?? ""}`}>
        <Picture preload={preload} class="absolute inset-0 -z-[1]">
          <Source
            src={mobile.src}
            width={mobile.width}
            height={mobile.height}
            alt={mobile.alt}
            fetchPriority={fetchPriority}
            loading={loading}
            media="(max-width: 767px)"
          />
          <Source
            src={desktop.src}
            width={desktop.width}
            height={desktop.height}
            alt={desktop.alt}
            fetchPriority={fetchPriority}
            loading={loading}
            media="(min-width: 768px)"
          />
          <img
            src={mobile.src}
            class="w-full object-cover h-full"
            loading={loading}
          />
        </Picture>
        {children}
      </div>
    );
  }

  return (
    <div
      id={id}
      class={className}
      style={{ backgroundColor: props.color, ...style }}
    >
      {children}
    </div>
  );
}
