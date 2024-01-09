import { Product, PropertyValue } from "apps/commerce/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

interface Props {
  product: Product;
  measurementsImage: string;
}

interface DescriptionItem {
  item: PropertyValue;
  label?: string;
}

interface SpecItem {
  item: PropertyValue;
  classes?: string;
}

export function DescriptionItem({ item, label }: DescriptionItem) {
  return (
    <p>
      <strong>{label || item.value}:</strong> {item.name}mm
    </p>
  );
}

export function SpecItem({ item, classes }: SpecItem) {
  return (
    <span id={item.value} class={`absolute ${classes}`}>
      {item?.name}mm
    </span>
  );
}

function ProductDetailsMeasurements({ product, measurementsImage }: Props) {
  const { image, additionalProperty } = product;

  const getProp = (prop: string) =>
    additionalProperty?.find((p) => p.value === prop);

  const altura = getProp("Altura da Lente");
  const largura = getProp("Largura da Lente");
  const ponte = getProp("Largura da Ponte");
  const frente_total = getProp("Frente Total");
  const hastes = getProp("Hastes");
  const aro = getProp("Aro");

  if (
    !altura ||
    !largura ||
    !ponte ||
    !frente_total ||
    !hastes ||
    !aro
  ) return null;

  return (
    <div class="w-full flex pt-8 items-center lg:gap-2 xl:gap-48 flex-wrap justify-center">
      <div id="img" class="relative xl:max-w-[550px]">
        <div id="specs" class="font-bold font-roboto text-xs lg:text-base">
          <SpecItem item={frente_total!} classes="right-[45%]" />
          <SpecItem
            item={altura!}
            classes="right-[3%] bottom-[50%] lg:right-[-10%]"
          />
          <SpecItem item={ponte!} classes="left-[45%] bottom-[40%]" />
          <SpecItem item={largura!} classes="right-[22%] bottom-[8%]" />
        </div>
        <Image
          src={image![0].url!}
          width={550}
          height={307}
          alt="medidas"
          loading="lazy"
        />
        <Image
          src={measurementsImage}
          class="absolute left-2 lg:left-4 top-0 z-10"
          width={580}
          height={380}
          alt="medidas-do-oculos"
          loading="lazy"
        />
      </div>
      <div
        id="measurements"
        class="w-[95%] m-auto mt-2 lg:max-w-[246px] lg:mt-auto text-base"
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
