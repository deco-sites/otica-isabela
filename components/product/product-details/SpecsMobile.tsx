import Icon from "$store/components/ui/Icon.tsx";
import { Product } from "apps/commerce/types.ts";
import ProductDetailsMeasurements from "deco-sites/otica-isabela/components/product/product-details/Measurements.tsx";
import LazyIframe from "deco-sites/otica-isabela/islands/LazyIframe.tsx";
import { replaceHtml } from "deco-sites/otica-isabela/sdk/replaceHtml.ts";
import { replaceSpecialCharacters } from "deco-sites/otica-isabela/sdk/replaceSpecialCharacters.ts";

interface Props {
  product: Product;
  measurementsImage: string;
}

function SpecsMobile({ product, measurementsImage }: Props) {
  const { additionalProperty, description } = product;
  const rootId = "items-container";
  const panels = additionalProperty?.filter(
    (prop) => prop.propertyID === "panel",
  );

  panels?.unshift(
    {
      "@type": "PropertyValue",
      name: "Medidas",
      value: "Medidas",
      propertyID: "panel",
    },
    {
      "@type": "PropertyValue",
      name: "Descrição",
      value: description,
      propertyID: "panel",
    },
  );

  return (
    <div id="specs-mobile" class="border-t border-gray-300 lg:hidden mt-8">
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `
          .collapse-content iframe {
            width: 100%;
          }

          .collapse input[type="checkbox"] {
            min-height: 45px
          }
          `,
        }}
      />
      <div id={rootId} class="w-[95%] mx-auto mt-2 flex flex-col gap-4">
        {panels?.map(({ name, value }, index) => {
          const id = replaceSpecialCharacters(name!)
            .toLocaleLowerCase()
            .replaceAll(" ", "-")
            .replace(/[?]/g, "");

          const replacedValues = value && replaceHtml(value);

          const videoId = replacedValues?.match(
            /(?:\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]+)/,
          )?.[1];
          const ytUrl = `https://www.youtube.com/embed/${videoId}`;

          function ContentVariations() {
            if (id === "medidas") {
              return (
                <ProductDetailsMeasurements
                  product={product}
                  measurementsImage={measurementsImage}
                />
              );
            }
            if (
              id === "como-comprar" ||
              id === "como-fazemos-as-lentes-de-grau"
            ) {
              return <LazyIframe videoUrl={ytUrl} />;
            }
            return (
              <div
                class="p-3"
                dangerouslySetInnerHTML={{ __html: replacedValues! }}
              >
              </div>
            );
          }

          return (
            <div class="collapse rounded-none">
              {/* Title */}
              <input type="checkbox" />
              <div class="collapse-title rounded-t flex items-center justify-between border border-gray-300 py-[10px] px-[15px] uppercase text-sm min-h-[45px] max-h-[45px]">
                {name}
                <Icon id="ArrowDown" size={10} filter="invert(1)" />
              </div>

              {/* Content */}
              <div class="collapse-content border border-t-0 border-gray-300 hide p-0">
                <ContentVariations />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SpecsMobile;
