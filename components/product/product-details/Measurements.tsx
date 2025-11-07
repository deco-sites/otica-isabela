import Image from "apps/website/components/Image.tsx";
import { findProductAttribute } from "site/sdk/findProductAttribute.ts";
import { Product, ProductAttribute } from "site/packs/v2/types.ts";

interface Props {
  product: Product;
  measurementsImage: string;
}

interface DescriptionItem {
  item: ProductAttribute;
  label?: string;
}

interface SpecItem {
  item: ProductAttribute;
  classes?: string;
}

export function DescriptionItem({ item, label }: DescriptionItem) {
  return (
    <p>
      <strong>{label || item.type}:</strong> {item.value}mm
    </p>
  );
}

export function SpecItem({ item, classes }: SpecItem) {
  return (
    <span id={item.type} class={`absolute ${classes}`}>
      {item?.value}mm
    </span>
  );
}

function ProductDetailsMeasurements({ product, measurementsImage }: Props) {
  const { medias } = product;

  console.log(medias, "medias dentro do measurements");

  const measurementImage = medias.find((media) =>
    media.isModelMeasurements === true
  );

  const altura = findProductAttribute("Altura da Lente", product);
  const largura = findProductAttribute("Largura da Lente", product);
  const ponte = findProductAttribute("Largura da Ponte", product);
  const frente_total = findProductAttribute("Frente Total", product);
  const hastes = findProductAttribute("Hastes", product);
  const aro = findProductAttribute("Aro", product);

  if (
    !altura ||
    !largura ||
    !ponte ||
    !frente_total ||
    !hastes ||
    !aro ||
    (!measurementImage?.url && !medias[0]?.url)
  ) return null;

  return (
    <div class="w-full flex max-lg:p-5 max-lg:pt-6 p-8 items-center lg:gap-24 flex-wrap justify-center">
      <div id="img" class="relative xl:max-w-[550px]">
        <div id="specs" class="font-bold font-outfit text-xs lg:text-base">
          <SpecItem item={frente_total!} classes="right-[45%]" />
          <SpecItem
            item={altura!}
            classes="right-[3%] bottom-[50%] lg:right-[-10%]"
          />
          <SpecItem item={ponte!} classes="left-[45%] bottom-[40%]" />
          <SpecItem item={largura!} classes="right-[22%] bottom-[8%]" />
        </div>
        <Image
          src={measurementImage?.url || medias[0]?.url || ""}
          width={550}
          height={307}
          alt="medidas"
          loading="lazy"
          class="h-[175px] lg:h-[307px] object-cover"
        />
        <Image
          src={measurementsImage}
          class="absolute left-2 lg:left-4 top-0 z-10 h-[170px] lg:h-[307px] object-cover"
          width={580}
          height={380}
          alt="medidas-do-oculos"
          loading="lazy"
        />
      </div>
      <div
        id="measurements"
        class="w-[95%] m-auto mt-2 lg:max-w-fit lg:mt-auto text-xl"
      >
        <DescriptionItem item={altura!} />
        <DescriptionItem item={largura!} />
        <DescriptionItem item={ponte!} />
        <DescriptionItem item={hastes!} label="Comprimento das hastes" />
        <DescriptionItem item={frente_total!} />
        <DescriptionItem item={aro!} />
      </div>
    </div>
  );
}

export default ProductDetailsMeasurements;
