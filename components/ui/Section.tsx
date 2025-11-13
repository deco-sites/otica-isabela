import { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  /** @description Section title */
  title?: string;

  /** @description See all link */
  cta?: string;
}

function Header({ title, cta }: Props) {
  if (!title) {
    return null;
  }

  return (
    <div
      class={clx(
        "flex justify-between items-center gap-2",
        "px-5 sm:px-0",
      )}
    >
      <span class="text-2xl sm:text-3xl font-semibold">{title}</span>
      {cta && (
        <a class="text-sm font-medium text-primary" href={cta}>
          See all
        </a>
      )}
    </div>
  );
}

interface Tab {
  title: string;
}

function Tabbed(
  { children }: {
    children: JSX.Element;
  },
) {
  return (
    <>
      {children}
    </>
  );
}

function Container({ class: _class, ...props }: JSX.IntrinsicElements["div"]) {
  return (
    <div
      {...props}
      class={clx(
        "container flex flex-col gap-4 sm:gap-6 w-full py-5 sm:py-10",
        _class?.toString(),
      )}
    />
  );
}

function Placeholder(
  { height, class: _class }: { height: string; class?: string },
) {
  return (
    <div
      style={{
        height,
        containIntrinsicSize: height,
        contentVisibility: "auto",
      }}
      class={clx("flex justify-center items-center", _class)}
    >
      <span class="loading loading-spinner" />
    </div>
  );
}

function PlaceholderShelf({
  class: _class,
}: {
  class?: string;
}) {
  return (
    <div
      class={clx(
        "w-full flex flex-col gap-9 lg:gap-9 py-10 sm:py-16",
        _class,
      )}
    >
      <div class="w-full font flex flex-col justify-center items-center py-8 pt-0">
        <div class="flex items-center justify-center">
          <span class="animate-pulse bg-gray-200 rounded-lg w-64 md:w-96 h-16">
          </span>
        </div>
      </div>
      <div class="container flex flex-col px-0 sm:px-5 relative ">
        {/* Carousel container - mobile mostra 1.2 items, desktop mostra 3 */}
        <div class="flex gap-4 md:gap-6 overflow-x-auto sm:overflow-visible scrollbar-none sm:px-0 px-2.5 snap-x snap-mandatory">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              class={clx(
                "card card-compact flex flex-col shrink-0 snap-center",
                // Mobile: cada card ocupa ~83% da largura (1.2 items visíveis = 100/1.2 ≈ 83%)
                "w-[83%] min-w-[83%] px-2.5",
                // Tablet/Desktop: 3 cards por vez (33.333% cada)
                "sm:w-[calc(33.333%-1rem)] sm:min-w-[calc(33.333%-1rem)] px-2.5",
                // Desktop grande: ajuste fino
                "lg:w-[calc(33.333%-1.5rem)] lg:min-w-[calc(33.333%-1.5rem)] px-2.5",
              )}
            >
              {/* Countdown Timer Skeleton */}
              <div class="w-fit mx-auto self-center mb-2.5">
                <div class="text-center my-0 mx-2.5">
                  {/* Texto "Oferta termina em" */}
                  <div class="h-3 bg-gray-200 rounded animate-pulse w-28 md:w-32 mb-2 mx-auto" />
                  {/* Timer items */}
                  <div class="flex gap-1 md:gap-2 justify-center">
                    {["Dias", "Horas", "Minutos", "Segundos"].map((label) => (
                      <div
                        key={label}
                        class="flex flex-col items-center mx-0.5 md:mx-1"
                      >
                        {/* Número grande */}
                        <div class="h-7 bg-gray-200 rounded animate-pulse w-5 mb-0.5" />
                        {/* Label pequeno */}
                        <div class="h-2.5 md:h-3 bg-gray-200 rounded animate-pulse w-10 md:w-12" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Imagem do produto */}
              <div class="relative w-full aspect-[306/170] bg-gray-200 rounded-lg animate-pulse overflow-hidden" />

              {/* Conteúdo do card */}
              <div class="flex flex-col items-start mt-2 w-full">
                {/* Nome do produto */}
                <div class="w-full mb-2 text-center">
                  <div class="h-4 bg-gray-200 rounded animate-pulse mb-1 w-full max-w-[200px]" />
                  <div class="h-3 bg-gray-200 rounded animate-pulse w-3/4 max-w-[150px]" />
                </div>

                {/* Preço e desconto */}
                <div class="w-full flex justify-between items-center my-[10px] px-2">
                  <div class="flex flex-row gap-2 items-center">
                    <div class="h-4 bg-gray-200 rounded animate-pulse w-16" />
                    <div class="h-5 bg-gray-200 rounded animate-pulse w-20" />
                  </div>
                  <div class="h-4 bg-gray-200 rounded animate-pulse w-14" />
                </div>

                {/* Cores e botão */}
                <div class="w-full flex items-center justify-between px-2">
                  {/* Swatches de cores */}
                  <div class="flex gap-1 items-center">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        class="h-4 w-4 rounded-full bg-gray-200 animate-pulse"
                      />
                    ))}
                  </div>
                  {/* Botão */}
                  <div class="h-8 bg-gray-200 rounded-full animate-pulse w-24 md:w-28" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Section() {}

Section.Container = Container;
Section.Header = Header;
Section.Tabbed = Tabbed;
Section.Placeholder = Placeholder;
Section.PlaceholderShelf = PlaceholderShelf;

export default Section;
