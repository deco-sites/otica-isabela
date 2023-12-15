import Icon from "$store/components/ui/Icon.tsx";
import { Product } from "apps/commerce/types.ts";
import ProductDetailsMeasurements from "deco-sites/otica-isabela/components/product/product-details/Measurements.tsx";
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
          //size 382

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
                {id === "medidas"
                  ? (
                    <ProductDetailsMeasurements
                      product={product}
                      measurementsImage={measurementsImage}
                    />
                  )
                  : (
                    <div
                      class="p-3"
                      dangerouslySetInnerHTML={{ __html: replacedValues! }}
                    >
                    </div>
                  )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SpecsMobile;
