import Icon from "$store/components/ui/Icon.tsx";
import ProductCollapseJS from "deco-sites/otica-isabela/islands/ProductCollapseJS.tsx";
import ProductDetailsMeasurements from "deco-sites/otica-isabela/components/product/ProductDetailsMeasurements.tsx";
import { Product } from "deco-sites/std/commerce/types.ts";

interface Props {
  product: Product;
}

const tabs = [
  "Medidas",
  "Descrição",
  "Acessorios Inclusos",
  "Como Comprar?",
  "Como fazemos as lentes de grau?",
];

function ProductDetailsSpecsMobile({ product }: Props) {
  const rootId = "items-container";

  return (
    <div id="section" class="border-t border-gray-300 lg:hidden">
      <div id={rootId} class="w-[90%] m-auto mt-2">
        {tabs.map((tabName, index) => {
          const id = tabName.toLocaleLowerCase().replaceAll(" ", "-");

          return (
            <div id="collapse-container" class="mb-5">
              {/* Title */}
              <div
                id={`${id}-item`}
                class="flex items-center justify-between border border-gray-300 py-[10px] px-[15px] uppercase font-bold text-sm shadow-md"
              >
                {tabName}
                <Icon id="ArrowDown" size={10} filter="invert(1)" />
              </div>

              {/* Content */}
              <div
                id={`${id}-content`}
                class="hidden border border-t-0 border-gray-300"
              >
                {id === "medidas" ? (
                  <ProductDetailsMeasurements product={product} />
                ) : (
                  <span>{tabName}</span>
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

export default ProductDetailsSpecsMobile;
