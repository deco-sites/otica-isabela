import Image from "deco-sites/std/components/Image.tsx";
import { Product, PropertyValue } from "deco-sites/std/commerce/types.ts";

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

  return (
    <div class="w-full flex pt-8 items-center xl:gap-48 flex-wrap">
      <div id="img" class="relative w-full xl:max-w-[550px]">
        <div id="specs" class="font-bold font-roboto text-xs lg:text-base">
          <SpecItem item={frente_total!} classes="left-[45%] top-[5%]" />
          <SpecItem
            item={altura!}
            classes="right-0 bottom-[25%] xl:right-[-10%] xl:bottom-[50%]"
          />
          <SpecItem item={ponte!} classes="left-[47%] top-[50%]" />
          <SpecItem
            item={largura!}
            classes="bottom-[12%] right-[26%]  lg:bottom-[10%] lg:right-[22%]"
          />
        </div>
        <Image
          src={image![0].url!}
          class="w-full"
          width={550}
          height={307}
          alt="medidas"
        />
        <Image
          src={measurementsImage}
          class="w-full absolute left-3 lg:left-4 top-0 z-10"
          width={580}
          height={380}
          alt="medidas-do-oculos"
        />
      </div>
      <div id="measurements" class="w-[95%] m-auto mt-2 lg:max-w-[390px]">
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
