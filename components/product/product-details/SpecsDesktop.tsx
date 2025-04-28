import { Head } from "$fresh/runtime.ts";
import { Product } from "apps/commerce/types.ts";
import ProductDetailsMeasurements from "$store/components/product/product-details/Measurements.tsx";
import LazyIframe from "$store/islands/LazyIframe.tsx";
import TabJS from "$store/islands/TabJS.tsx";
import { replaceHtml } from "$store/sdk/replaceHtml.ts";
import { replaceSpecialCharacters } from "$store/sdk/replaceSpecialCharacters.ts";

interface Props {
  product: Product;
  measurementsImage: string;
}

function SpecsDesktop({ product, measurementsImage }: Props) {
  const { additionalProperty, description } = product;
  const rootId = "tabs-component";
  const panels = additionalProperty?.filter(
    (prop) => prop.propertyID === "panel",
  ) ?? [];
  const hasNotMeasures = product?.category?.includes("Lentes de Contato") ||
    product?.category?.includes("Acessórios");

  panels.unshift(
    {
      "@type": "PropertyValue",
      name: "Descrição",
      value: description,
      propertyID: "panel",
    },
  );

  if (!hasNotMeasures) {
    panels.unshift({
      "@type": "PropertyValue",
      name: "Medidas",
      value: "Medidas",
      propertyID: "panel",
    });
  }

  return (
    <div class="border-t border-gray-200 mt-8">
      <Head>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `
            .descricao-content img {
              vertical-align: text-bottom;
            }
            .descricao-content {
              font-family: 'Outfit', sans-serif;
            }
            .descricao-content p * {
              display: inline;
              font-family: 'Outfit', sans-serif !important;
            }
            .descricao-content p {
              margin-bottom: 10px;
            }
            .descricao-content * {
              line-height: 20px;
            }
          `,
          }}
        />
      </Head>
      <div id={rootId} class="mt-1 container max-lg:m-0">
        <div class="tabs w-[90%] mb-2 max-lg:mx-[21px] max-lg:my-4 flex justify-between m-auto max-lg:block max-lg:justify-normal max-lg:whitespace-nowrap max-lg:overflow-auto">
          {/* Tabs Buttons */}
          {panels.filter((panel) => Boolean(panel)).map(({ name }, index) => {
            const id = replaceSpecialCharacters(name!)
              .toLocaleLowerCase()
              .replaceAll(" ", "-")
              .replace(/[?]/g, "");
            return (
              <a
                id={`${id}-tab`}
                key={`${name}-${index}-tab`}
                style={{ borderColor: "#42c3ff" }}
                class={`tab p-0 h-[50px] max-lg:h-[40px] text-black max-lg:text-[#6f6f6f] text-xl font-bold max-lg:font-normal font-outfit cursor-pointer rounded-[3px] ${
                  index === 0 &&
                  "tab-active border-b-4 max-lg:!font-bold max-lg:!text-black"
                } mx-3 first:ml-0`}
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
                class="p-8 max-lg:p-5 max-lg:pt-6 [&>span]:flex [&>span]:items-center [&>span]:font-outfit"
                dangerouslySetInnerHTML={{ __html: replacedValues! }}
              >
              </div>
            );
          }

          return (
            <div
              id={`${id}-content`}
              key={`${id}-${index}-content`}
              class={`tab-content ${id}-content ${
                index === 0 ? "block" : "hidden"
              } bg-[#f5f5f5] rounded-xl max-lg:mx-[21px]`}
            >
              <ContentVariations />
            </div>
          );
        })}
      </div>
      <TabJS rootId={rootId} />
    </div>
  );
}

export default SpecsDesktop;
