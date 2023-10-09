import Icon from "$store/components/ui/Icon.tsx";
import ProductCollapseJS from "deco-sites/otica-isabela/islands/ProductCollapseJS.tsx";
import ProductDetailsMeasurements from "deco-sites/otica-isabela/components/product/product-details/Measurements.tsx";
import { Product } from "deco-sites/std/commerce/types.ts";
import { replaceSpecialCharacters } from "deco-sites/otica-isabela/sdk/replaceSpecialCharacters.ts";

interface Props {
  product: Product;
  measurementsImage: string;
}

function SpecsMobile({ product, measurementsImage }: Props) {
  const { additionalProperty, description } = product;
  const rootId = "items-container";
  const panels = additionalProperty?.filter(
    (prop) => prop.propertyID === "panel"
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
    }
  );

  return (
    <div id="section" class="border-t border-gray-300 lg:hidden">
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `
          #medidas-content, 
          #descricao-content,
          #acessorios-inclusos-content,
          #como-comprar-content,
          #como-fazemos-as-lentes-de-grau-content {
            overflow: hidden;
            transition: max-height 0.15s ease-in-out;
            transition: max-width 0.15s ease-in-out;
            max-height: 100%;
            max-width: 100%;
          }

          .hide {
            max-width: 0 !important;
            max-height: 0 !important;
          }
          `,
        }}
      />
      <div id={rootId} class="w-[90%] m-auto mt-2">
        {panels?.map(({ name, value }, index) => {
          const id = replaceSpecialCharacters(name!)
            .toLocaleLowerCase()
            .replaceAll(" ", "-")
            .replace(/[?]/g, "");

          return (
            <div id="collapse-container" class="mb-5">
              {/* Title */}
              <div
                id={`${id}-item`}
                class="flex items-center justify-between border border-gray-300 py-[10px] px-[15px] uppercase font-bold text-sm shadow-md"
              >
                {name}
                <Icon id="ArrowDown" size={10} filter="invert(1)" />
              </div>

              {/* Content */}
              <div
                id={`${id}-content`}
                class="border border-t-0 border-gray-300 hide"
              >
                {id === "medidas" ? (
                  <ProductDetailsMeasurements
                    product={product}
                    measurementsImage={measurementsImage}
                  />
                ) : (
                  <div
                    class="p-3"
                    dangerouslySetInnerHTML={{ __html: value! }}
                  ></div>
                )}
              </div>
            </div>
          );
        })}

        <ProductCollapseJS rootId={rootId} />
      </div>
    </div>
  );
}

export default SpecsMobile;
