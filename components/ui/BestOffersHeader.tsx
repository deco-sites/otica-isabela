import Stopwatch from "$store/components/product/Stopwatch.tsx";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  priceValidUntil: string;
  page: "home" | "details";
}

export const BestOffersHeader = ({ priceValidUntil, page }: Props) => {
  return (
    <div
      class={`w-full ${
        page === "details" ? "absolute right-0 top-0" : "block"
      }`}
    >
      <div
        class={`max-w-[1320px] ml-auto ${
          page === "home"
            ? "mr-auto w-full sm:min-h-[150px] min-h-[100px]"
            : "w-fit"
        } justify-evenly lg:justify-around flex items-center pb-0 pl-1 pr-1`}
      >
        {page === "home"
          ? (
            <div class="lg:hidden flex items-center justify-center">
              <Icon
                class="w-[56px] h-[56px] text-red-500"
                id="Stopwatch"
                size={40}
              />
            </div>
          )
          : (
            <div class="flex items-center justify-center">
              <Icon
                class="w-[21px] h-[21px] text-red-500"
                id="Stopwatch"
                size={21}
              />
            </div>
          )}

        {page === "home" &&
          (
            <div class="hidden lg:block">
              <p class="text-red-500 text-l md:text-xl font-bold">
                As melhores
              </p>
              <h3 class="text-red-500 text-3xl md:text-5xl font-outfit font-bold uppercase">
                Ofertas do dia
              </h3>
            </div>
          )}

        <div class="xl:max-w-[500px]">
          <Stopwatch targetDate={priceValidUntil} type="header" page={page} />
        </div>
      </div>
    </div>
  );
};
