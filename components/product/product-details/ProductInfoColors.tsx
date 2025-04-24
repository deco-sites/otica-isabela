import { ProductDetailsPage } from "apps/commerce/types.ts";
import { type LoaderReturnType } from "@deco/deco";

interface Props {
    page: LoaderReturnType<ProductDetailsPage | null>;
}

function ProductInfoColors({ page }: Props) {
    const getPathname = window.location.pathname;

    return (
        <div className="flex gap-2 w-full">
            {(() => {
                const colorMap = new Map();

                page?.product.isVariantOf?.hasVariant?.forEach((variant) => {
                    const colorProps = variant.additionalProperty || [];
                    const colorProp = colorProps.find((prop) => prop.value);
                    const colorName = colorProp?.value;

                    const unitCodes = colorProps
                        .filter((prop) => prop.unitCode)
                        .map((prop) => prop.unitCode);

                    if (colorName) {
                        if (!colorMap.has(colorName)) {
                            colorMap.set(colorName, {
                                url: variant.url || "",
                                colorCodes: [...unitCodes],
                            });
                        } else {
                            unitCodes.forEach((code) => {
                                if (
                                    !colorMap.get(colorName).colorCodes
                                        .includes(code)
                                ) {
                                    colorMap.get(colorName).colorCodes.push(
                                        code,
                                    );
                                }
                            });
                        }
                    }
                });

                const colorEntries = Array.from(colorMap.entries());

                const sortedColors = colorEntries.sort(([_, a], [__, b]) => {
                    if (a.url === getPathname) return -1;
                    if (b.url === getPathname) return 1;
                    return 0;
                });

                return sortedColors.map(([colorName, data], idx) => {
                    const validColorCodes = data.colorCodes.filter((code) =>
                        code
                    );

                    let backgroundStyle = "";
                    if (validColorCodes.length > 1) {
                        backgroundStyle = `linear-gradient(${
                            validColorCodes.join(", ")
                        })`;
                    } else if (validColorCodes.length === 1) {
                        backgroundStyle = validColorCodes[0];
                    }

                    const isCurrent = data.url === getPathname;

                    return (
                        <a href={data.url} key={idx}>
                            <div
                                className={`flex gap-2 items-center justify-between tooltip tooltip-top ${
                                    isCurrent
                                        ? "ring-1 ring-offset-2 ring-[#aaa] rounded-full"
                                        : ""
                                }`}
                                data-tip={colorName}
                            >
                                <span
                                    className={`mask mask-circle h-4 w-4 transition-transform`}
                                    style={{ background: backgroundStyle }}
                                />
                            </div>
                        </a>
                    );
                });
            })()}
        </div>
    );
}

export default ProductInfoColors;
