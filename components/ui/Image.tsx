import { IImage } from "deco-sites/otica-isabela/sdk/types.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { Fragment } from "preact";

interface Props {
  desktop: IImage;
  mobile: IImage;
  href?: string;
  container?: boolean;
  maxWidth?: number;
}

export default function ResponsiveImage({
  mobile,
  desktop,
  href,
  maxWidth,
  container,
}: Props) {
  const preload = desktop.preload || mobile.preload;
  const fetchPriority = preload ? "high" : "low";
  const loading = preload ? "eager" : "lazy";

  const Component = href ? "a" : Fragment;
  const props = href ? { href } : {};

  return (
    <Component
      {...props}
      class={"block" + (container ? " container" : "")}
      style={{ ...(maxWidth && { maxWidth }) }}
    >
      <Picture preload={preload}>
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
    </Component>
  );
}
