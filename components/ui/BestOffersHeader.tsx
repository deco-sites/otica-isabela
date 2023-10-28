import Stopwatch from "$store/components/product/Stopwatch.tsx";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";

interface Props {
  priceValidUntil: Date;
  page: "home" | "details";
}

export const BestOffersHeader = ({ priceValidUntil, page }: Props) => {
  const [mainContainerStyles, leftTitleStyles] = page === "home"
    ? ["min-h-[150px] justify-around", "lg:block"]
    : [
      "sm:min-h-[150px] min-h-[100px] justify-center lg:justify-around gap-[3rem]",
      "hidden lg:block",
    ];
  return (
    <div
      id="best-offer-container"
      class="w-full bg-red-500"
    >
      <div
        class={`container ${mainContainerStyles} flex items-center pb-0 pl-1 pr-1`}
      >
        {page === "details" && (
          <div
            id="stopwatch"
            class="lg:hidden flex items-center justify-center"
          >
            <Icon
              class="md:w-[90px] md:h-[90px] sm:w-[60px] sm:h-[60px] text-white"
              id="Stopwatch"
              size={40}
            />
          </div>
        )}

        <div id="best-offer-left-title" class={leftTitleStyles}>
          <p class="text-white text-l md:text-xl font-bold">As melhores</p>
          <h1 class="text-white text-3xl md:text-5xl font-bebas-neue">
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
