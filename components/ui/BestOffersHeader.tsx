import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import Stopwatch from "$store/components/product/Stopwatch.tsx";

interface Props {
  priceValidUntil: Date;
}

export const BestOffersHeader = ({ priceValidUntil }: Props) => {
  return (
    <div
      id="best-offer-container"
      class="w-full bg-red-500"
    >
      <div class="container min-h-[150px] lg:min-h-[200px] flex justify-around items-center pt-0 pb-0 pl-1 pr-1">
        <div id="stopwatch" class="lg:hidden flex items-center justify-center">
          <Icon
            class="md:w-[90px] md:h-[90px] text-white"
            id="Stopwatch"
            size={23}
          />
        </div>
        <div id="best-offer-left-title" class="hidden lg:block">
          <p class="text-white text-l md:text-xl font-bold">As melhores</p>
          <h1 class="text-white text-2xl md:text-5xl font-bebas-neue">
            OFERTAS DO DIA
          </h1>
        </div>
        <div
          id="best-offer-stopwatch"
          class="md:min-w-[330px] xl:min-w-[450px]"
        >
          <Stopwatch targetDate={priceValidUntil} type="header" />
        </div>
      </div>
    </div>
  );
};
