import Icon from "$store/components/ui/Icon.tsx";
import Stopwatch, { Size } from "$store/components/product/Stopwatch.tsx";

interface Props {
  priceValidUntil: Date;
}

export const BestOffersHeader = ({ priceValidUntil }: Props) => {
  return (
    <div
      id="best-offer-container"
      class="w-full bg-red-500 min-h-[200px] flex justify-between md:justify-around items-center pt-0 pb-0 pl-1 pr-1"
    >
      <div id="best-offer-left-title">
        <p class="text-white text-l md:text-xl font-bold">As melhores</p>
        <h1 class="text-white text-2xl md:text-5xl font-bebas-neue">
          OFERTAS DO DIA
        </h1>
      </div>
      <div id="best-offer-stopwatch" class="md:min-w-[330px] xl:min-w-[450px]">
        <Stopwatch targetDate={priceValidUntil} size={Size.header} />
      </div>
    </div>
  );
};
