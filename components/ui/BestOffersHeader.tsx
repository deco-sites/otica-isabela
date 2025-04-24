import Stopwatch from "$store/components/product/Stopwatch.tsx";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  priceValidUntil: string;
  page: "home" | "details";
}

export const BestOffersHeader = ({ priceValidUntil, page }: Props) => {
  return (
    <div
      class={`w-full ${page === "details" ? "lg:hidden" : "block"}`}
    >
      <div
        class={`container sm:min-h-[150px] min-h-[100px] ${
          page === "details" ? "justify-center" : "justify-evenly"
        } lg:justify-around flex items-center pb-0 pl-1 pr-1`}
      >
        <div class="lg:hidden flex items-center justify-center">
          <Icon
            class="w-[40px] h-[40px] text-red-500"
            id="Stopwatch"
            size={40}
          />
        </div>

        <div class="hidden lg:block">
          <p class="text-red-500 text-sm md:text-xl font-bold">As melhores</p>
          <h3 class="text-red-500 text-3xl md:text-5xl font-outfit font-bold uppercase">
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
