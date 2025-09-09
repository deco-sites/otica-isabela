import { ProductDetailsPage, PropertyValue } from "apps/commerce/types.ts";
import { type LoaderReturnType } from "@deco/deco";

interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
}

interface PropertyValueWithColor extends PropertyValue {
  color?: string;
}

function ProductInfoColors({ page }: Props) {
  const getPathname = window.location.pathname;
  const variants = page?.product.isVariantOf?.hasVariant;

  // Sort variants so the active one is first
  const sortedVariants = variants?.slice().sort((a, b) => {
    const aIsCurrent = a.url === getPathname;
    const bIsCurrent = b.url === getPathname;
    return aIsCurrent === bIsCurrent ? 0 : aIsCurrent ? -1 : 1;
  });

  return (
    <div className="flex gap-2 lg:w-full">
      {sortedVariants?.map((variant) => {
        const colorProp = variant.additionalProperty?.filter((prop) =>
          prop.name === "Cor"
        );

        if (!colorProp || colorProp.length === 0) {
          return null;
        }

        const validColorCodes = colorProp.map((prop: PropertyValueWithColor) =>
          prop.color
        );

        const isCurrent = variant.url === getPathname;

        let backgroundStyle = "";

        if (colorProp.length > 1) {
          backgroundStyle = `linear-gradient(${validColorCodes.join(", ")})`;
        } else if (validColorCodes.length === 1) {
          backgroundStyle = validColorCodes[0] ?? "";
        }

        return (
          <a href={variant.url}>
            <div
              class={`!flex gap-2 items-center justify-between md:tooltip md:tooltip-top ${
                isCurrent ? "ring-1 ring-offset-2 ring-[#aaa] rounded-full" : ""
              }`}
              data-tip={colorProp[0]?.value}
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
