import ProductTabJS from "deco-sites/otica-isabela/islands/ProductTabJS.tsx";
import ProductDetailsMeasurements from "deco-sites/otica-isabela/components/product/ProductDetailsMeasurements.tsx";
import { Product } from "deco-sites/std/commerce/types.ts";

interface Props {
  product: Product;
}

const tabs = [
  "Medidas",
  "Descricao",
  "Acessorios Inclusos",
  "Como Comprar",
  "Como fazemos as lentes de grau",
];

function ProductDetailsSpecifications({ product }: Props) {
  const rootId = "tabs-component";

  return (
    <div class="hidden lg:block border-t border-gray-200">
      <div id={rootId} class="mt-1 container">
        <div class="tabs w-[90%] flex justify-between m-auto">
          {/* Tabs Buttons */}
          {tabs.map((tab, index) => {
            const id = tab.toLocaleLowerCase().replaceAll(" ", "-");

            return (
              <a
                id={`${id}-tab`}
                key={`${tab}-${index}-tab`}
                style={{ borderColor: "#42c3ff" }}
                class={`tab p-0 h-[50px] text-black text-xl font-bold font-roboto cursor-pointer rounded-[3px] ${
                  index === 0 && "tab-active border-b-4"
                }`}
              >
                {tab}
              </a>
            );
          })}
        </div>

        {/* Tabs Content */}
        {tabs.map((tab, index) => {
          const id = tab.toLocaleLowerCase().replaceAll(" ", "-");

          return (
            <div
              id={`${id}-content`}
              key={`${id}-${index}-content`}
              class={`tab-content ${index === 0 ? "block" : "hidden"}`}
            >
              {id === "medidas" ? (
                <ProductDetailsMeasurements product={product} />
              ) : (
                <span>{tab}</span>
              )}
            </div>
          );
        })}
      </div>

      <ProductTabJS rootId={rootId} />
    </div>
  );
}

export default ProductDetailsSpecifications;
