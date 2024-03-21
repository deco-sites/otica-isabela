import Stopwatch from "$store/components/product/Stopwatch.tsx";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";

interface Props {
  priceValidUntil: string;
  page: "home" | "details";
}

export const BestOffersHeader = ({ priceValidUntil }: Props) => {
  return (
    <div class="w-full bg-red-500">
      <div class="container justify-evenly lg:justify-around flex items-center p-2">
        <div class="lg:hidden flex items-center justify-center">
          <Icon
            class="w-[56px] h-[56px] text-white"
            id="Stopwatch"
            size={40}
          />
        </div>

        <div class="hidden lg:block">
          <p class="text-white text-base font-bold">As melhores</p>
          <h3 class="text-white text-3xl font-bebas-neue uppercase">
            Ofertas do dia
          </h3>
        </div>
        <div class="md:min-w-[330px] xl:min-w-[600px]">
          <Stopwatch targetDate={priceValidUntil} type="header" />
        </div>
      </div>
    </div>
  );
};
