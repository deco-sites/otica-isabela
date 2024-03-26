import Stopwatch from "$store/components/product/Stopwatch.tsx";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";

interface Props {
  priceValidUntil: string;
  page: "home" | "details";
}

export const BestOffersHeader = ({ priceValidUntil, page }: Props) => {
  return (
    <div
      class={`w-full bg-red-500 ${page === "details" ? "lg:hidden" : "block"}`}
    >
      <div class="container sm:min-h-[150px] min-h-[100px] justify-evenly lg:justify-around flex items-center pb-0 pl-1 pr-1">
        <div class="lg:hidden flex items-center justify-center">
          <Icon
            class="w-[56px] h-[56px] text-white"
            id="Stopwatch"
            size={40}
          />
        </div>

        <div class="hidden lg:block">
          <p class="text-white text-l md:text-xl font-bold">As melhores</p>
          <h3 class="text-white text-3xl md:text-5xl font-bebas-neue uppercase">
            Ofertas do dia
          </h3>
        </div>
        <div class="md:min-w-[330px] xl:max-w-[500px]">
          <Stopwatch targetDate={priceValidUntil} type="header" />
        </div>
      </div>
    </div>
  );
};
