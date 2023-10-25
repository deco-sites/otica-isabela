import TabJS from "deco-sites/otica-isabela/islands/TabJS.tsx";
import ProductDetailsMeasurements from "deco-sites/otica-isabela/components/product/product-details/Measurements.tsx";
import { Product } from "apps/commerce/types.ts";
import { replaceSpecialCharacters } from "deco-sites/otica-isabela/sdk/replaceSpecialCharacters.ts";

interface Props {
  product: Product;
  measurementsImage: string;
}

function SpecsDesktop({ product, measurementsImage }: Props) {
  const { additionalProperty, description } = product;
  const rootId = "tabs-component";
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
    <div class="hidden lg:block border-t border-gray-200 mt-8">
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `
          #descricao-content > div > p:nth-child(1),
          #descricao-content > div > p:last-child {
            display: none
          }
          
          #descricao-content > div > p {
            margin: 0 0 10px;
            font-size: 15px;
            font-weight: 400;
          }
          
          #descricao-content p:nth-child(-n+7) > span {
            display: flex;
          }

          .collapse-content p:nth-child(-n+7) > span {
            display: flex;
          }
          
          #descricao-content > div > p > span > img {
            height: 20px;
          }
          
          #como-fazemos-as-lentes-de-grau-content iframe, 
          #como-comprar-content iframe { 
            width: 100%;
          }
          @media (min-width: 1140px) {
            #como-fazemos-as-lentes-de-grau-content iframe, 
            #como-comprar-content iframe { 
              height: 624px;
            }
          }
          `,
        }}
      />
      <div id={rootId} class="mt-1 container">
        <div class="tabs w-[90%] mb-2 flex justify-between m-auto">
          {/* Tabs Buttons */}
          {panels?.map(({ name }, index) => {
            const id = replaceSpecialCharacters(name!)
              .toLocaleLowerCase()
              .replaceAll(" ", "-")
              .replace(/[?]/g, "");
            return (
              <a
                id={`${id}-tab`}
                key={`${name}-${index}-tab`}
                style={{ borderColor: "#42c3ff" }}
                class={`tab p-0 h-[50px] text-black text-xl font-bold font-roboto cursor-pointer rounded-[3px] ${
                  index === 0 && "tab-active border-b-4"
                }`}
              >
                {name}
              </a>
            );
          })}
        </div>

        {/* Tabs Content */}
        {panels?.map(({ name, value }, index) => {
          const id = replaceSpecialCharacters(name!)
            .toLocaleLowerCase()
            .replaceAll(" ", "-")
            .replace(/[?]/g, "");
          return (
            <div
              id={`${id}-content`}
              key={`${id}-${index}-content`}
              class={`tab-content ${index === 0 ? "block" : "hidden"}`}
            >
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
                    dangerouslySetInnerHTML={{ __html: value! }}
                  >
                  </div>
                )}
            </div>
          );
        })}
      </div>
      <TabJS rootId={rootId} />
    </div>
  );
}

export default SpecsDesktop;
