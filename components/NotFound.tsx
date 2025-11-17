import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import { Section } from "@deco/deco/blocks";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  image: ImageWidget;
  title?: string;
  subtitle?: RichText;
  ctaLabel?: string;
  ctaUrl?: string;
  /** @description Vitrine to be displayed below the not found message */
  vitrine?: Section;
}

export default function NotFound(
  { image, title, subtitle, ctaLabel, ctaUrl, vitrine }:
    Props,
) {
  return (
    <div class={`flex flex-col lg:items-center lg:justify-center gap-4 py-8 bg-[#E5F7FF]`}>
      <div class="flex flex-col px-4 lg:px-0 lg:flex-row items-center justify-center gap-4 vz-container">
        <div>
          <Image
            src={image}
            alt={title}
            width={500}
            height={500}
            loading="eager"
            decoding={"sync"}
            class={`w-full object-contain max-w-[550px]`}
          />
        </div>
        <div
          class={`flex flex-col gap-4 items-center text-center lg:text-left lg:items-start text-grayscale-700`}
        >
          <h1 class="text-2xl font-bold">{title}</h1>
          <div class="flex flex-col gap-2" dangerouslySetInnerHTML={{ __html: subtitle || "" }} />
          {ctaLabel && ctaUrl && (
            <a href={ctaUrl} class="btn rounded-md text-white w-max bg-[#00a7f5] hover:bg-[#00a7f5]/80">
              {ctaLabel}
            </a>
          )}
        </div>
      </div>
      {vitrine && <vitrine.Component {...vitrine.props} />}
    </div>
  );
}
