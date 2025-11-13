import { type LoaderReturnType } from "@deco/deco";
import { IsabelaProductDetailsPage } from "site/packs/v2/types.ts";

interface Props {
  page: LoaderReturnType<IsabelaProductDetailsPage | null>;
  pathname: string;
}

function ProductInfoColors({ page, pathname }: Props) {
  const getPathname = pathname;
  const variants = page?.product.relatedProducts;

  // Sort variants so the active one is first
  const sortedVariants = variants?.slice().sort((a, b) => {
    const aURL = `/produto/${a.slug}`;
    const bURL = `/produto/${b.slug}`;

    const aIsCurrent = aURL === getPathname;
    const bIsCurrent = bURL === getPathname;
    return aIsCurrent === bIsCurrent ? 0 : aIsCurrent ? -1 : 1;
  });

  return (
    <div className="flex gap-2 lg:w-full">
      {sortedVariants?.map((variant) => {
        const url = `/produto/${variant.slug}`;

        const colorProp = variant.attributes?.find((prop) =>
          prop.type === "Cor"
        );

        if (!colorProp) {
          return null;
        }

        const colorName = colorProp?.value.split(":")[0].trim();

        const validColorCodes = colorProp?.value.split(":")[1].trim().split("|")
          .filter((code) => code.trim() !== "");

        const isCurrent = url === getPathname;

        let backgroundStyle = "";

        if (validColorCodes.length > 1) {
          backgroundStyle = `linear-gradient(${validColorCodes.join(", ")})`;
        } else if (validColorCodes.length === 1) {
          backgroundStyle = validColorCodes[0] ?? "";
        }

        return (
          <a href={url}>
            <div
              class={`!flex gap-2 items-center justify-between md:tooltip md:tooltip-top ${
                isCurrent ? "ring-1 ring-offset-2 ring-[#aaa] rounded-full" : ""
              }`}
              data-tip={colorName}
            >
              <span
                class="mask mask-circle h-5 w-5 transition-transform"
                style={{ background: backgroundStyle }}
              />
            </div>
          </a>
        );
      })}
    </div>
  );
}

export default ProductInfoColors;
