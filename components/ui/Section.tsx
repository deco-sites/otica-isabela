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
        <div class="flex gap-4 md:gap-6 overflow-x-auto sm:overflow-visible scrollbar-none sm:px-0 px-2.5 snap-x snap-mandatory justify-center">
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

export function PlaceholderProductDetails({
  class: _class,
}: {
  class?: string;
}) {
  return (
    <div class={clx("lg:bg-gray-scale-100", _class)}>
      <div class="max-w-[1320px] w-[95%] mx-auto py-[10px] lg:py-[20px]">
        {/* Breadcrumb - Desktop */}
        <div class="hidden lg:block mb-[10px]">
          <div class="h-4 bg-gray-200 rounded animate-pulse w-48" />
        </div>

        {/* Header - Mobile */}
        <div class="flex items-center justify-between lg:hidden mb-4">
          <div class="h-8 w-8 bg-gray-200 rounded animate-pulse" />
          <div class="flex gap-2">
            <div class="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
            <div class="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Product Name - Mobile */}
        <div class="mt-4 mb-4 text-center px-8 lg:hidden">
          <div class="h-6 bg-gray-200 rounded animate-pulse w-3/4 mx-auto mb-2" />
          <div class="h-4 bg-gray-200 rounded animate-pulse w-1/2 mx-auto" />
        </div>

        {/* Main Content - Image & Info */}
        <div class="lg:flex lg:justify-center lg:gap-12">
          {/* Image Section */}
          <div class="relative flex flex-col items-center text-center w-full mt-2 lg:mt-0">
            <div class="relative lg:w-full">
              <div class="relative flex flex-col-reverse lg:justify-end lg:flex-row gap-2">
                {/* Thumbnails - Desktop */}
                <div class="hidden lg:flex lg:flex-col lg:gap-2 lg:max-w-[540px]">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      class="w-20 h-20 bg-gray-200 rounded animate-pulse"
                    />
                  ))}
                </div>

                {/* Main Image */}
                <div class="relative">
                  <div class="w-[95vw] sm:w-[30vw] md:w-[60vw] lg:w-[540px] aspect-square bg-gray-200 rounded-lg animate-pulse" />

                  {/* Discount Tag Skeleton */}
                  <div class="absolute top-2 right-4 lg:right-2.5">
                    <div class="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Product Name - Mobile (Bottom) */}
              <div class="mt-4 mb-4 text-center px-8 lg:hidden">
                <div class="h-6 bg-gray-200 rounded animate-pulse w-3/4 mx-auto" />
              </div>
            </div>

            {/* Buy with lens label - Mobile */}
            <div class="bg-gray-200 rounded-[2.5px] h-8 w-[90%] my-[10px] lg:hidden animate-pulse" />
          </div>

          {/* Ratings - Mobile */}
          <div class="flex flex-col items-center my-8 lg:hidden">
            <div class="flex gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  class="h-5 w-5 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
            <div class="h-4 bg-gray-200 rounded animate-pulse w-32" />
          </div>

          {/* Price & Color - Mobile */}
          <div class="lg:hidden px-3 flex items-center justify-between mt-4 mb-6">
            <div class="flex flex-col gap-2">
              {/* Colors */}
              <div class="flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    class="h-8 w-8 rounded-full bg-gray-200 animate-pulse"
                  />
                ))}
              </div>
              {/* Price */}
              <div class="flex flex-col gap-1">
                <div class="h-4 bg-gray-200 rounded animate-pulse w-20" />
                <div class="h-8 bg-gray-200 rounded animate-pulse w-32" />
                <div class="h-3 bg-gray-200 rounded animate-pulse w-40" />
              </div>
            </div>
          </div>

          {/* Product Details - Desktop */}
          <div class="hidden lg:block pl-4 pr-4 w-full max-w-[480px]">
            {/* Name */}
            <div class="mb-4">
              <div class="h-7 bg-gray-200 rounded animate-pulse w-3/4 mb-2" />
              <div class="h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-3" />
              {/* Ratings */}
              <div class="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    class="h-4 w-4 bg-gray-200 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* Buy with lens label - Desktop */}
            <div class="bg-gray-200 rounded-[2.5px] h-8 w-full my-[10px] animate-pulse" />

            {/* Prices */}
            <div class="flex items-center justify-between lg:mt-6 mb-4">
              <div class="flex flex-col gap-2">
                <div class="h-4 bg-gray-200 rounded animate-pulse w-24" />
                <div class="h-8 bg-gray-200 rounded animate-pulse w-32" />
                <div class="h-3 bg-gray-200 rounded animate-pulse w-48" />
              </div>
            </div>

            {/* Colors */}
            <div class="mb-6">
              <div class="h-4 bg-gray-200 rounded animate-pulse w-20 mb-3" />
              <div class="flex gap-2 flex-wrap">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    class="h-10 w-10 rounded-full bg-gray-200 animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div class="flex flex-col gap-3">
              <div class="h-12 bg-gray-200 rounded-full animate-pulse w-full" />
              <div class="h-12 bg-gray-200 rounded-full animate-pulse w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderSearchResult({
  class: _class,
}: {
  class?: string;
}) {
  return (
    <div class={clx("w-full py-6", _class)}>
      {/* Header com Breadcrumb */}
      <header class="max-w-[1320px] mx-auto w-[95%] flex flex-colm-0 py-2">
        <div class="flex w-full flex-row items-center">
          <div class="h-4 bg-gray-200 rounded animate-pulse w-48" />
        </div>
      </header>

      {/* Filters Mobile */}
      <div class="lg:hidden max-w-[1320px] w-[95%] mx-auto mt-4">
        <div class="h-10 bg-gray-200 rounded animate-pulse w-full" />
      </div>

      {/* Active Filters e Category Menu - Desktop */}
      <div class="hidden lg:flex justify-between max-w-[1320px] w-[95%] mx-auto mt-4">
        <div class="h-6 bg-gray-200 rounded animate-pulse w-32" />
        <div class="h-6 bg-gray-200 rounded animate-pulse w-48" />
      </div>

      {/* Main Content */}
      <div class="max-w-[1320px] mx-auto mt-4 w-[95%]">
        <div class="flex flex-row">
          {/* Filters Sidebar - Desktop */}
          <div class="hidden lg:flex flex-col mr-10 max-w-[200px] w-full">
            <div class="flex flex-col sticky top-0 z-10 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} class="flex flex-col gap-2">
                  <div class="h-5 bg-gray-200 rounded animate-pulse w-24" />
                  <div class="flex flex-col gap-2">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <div
                        key={j}
                        class="h-4 bg-gray-200 rounded animate-pulse w-full"
                      />
                    ))}
                  </div>
                </div>
              ))}
              <div class="h-10 bg-gray-200 rounded animate-pulse w-full mt-2" />
            </div>
          </div>

          {/* Content Area */}
          <div class="flex-grow w-full flex flex-col max-lg:gap-6 gap-10">
            {/* Banner (opcional) */}
            <div class="h-32 md:h-48 bg-gray-200 rounded animate-pulse w-full" />

            {/* Product Grid */}
            <div class="grid grid-cols-1 gap-10 lg:gap-y-12 xs:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  class="card card-compact w-full flex flex-col"
                >
                  {/* Imagem do produto */}
                  <div class="relative w-full aspect-square bg-gray-200 rounded-lg animate-pulse overflow-hidden" />

                  {/* Conteúdo do card */}
                  <div class="flex flex-col items-center mt-[10px] w-full">
                    {/* Nome do produto */}
                    <div class="w-full mb-2 text-center">
                      <div class="h-4 bg-gray-200 rounded animate-pulse mb-1 mx-auto w-full max-w-[200px]" />
                      <div class="h-3 bg-gray-200 rounded animate-pulse mx-auto w-3/4 max-w-[150px]" />
                    </div>

                    {/* Medidas */}
                    <div class="w-full min-h-[25px] my-[10px] text-center">
                      <div class="h-3 bg-gray-200 rounded animate-pulse mx-auto w-2/3 max-w-[180px]" />
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
                      <div class="h-8 bg-gray-200 rounded-full animate-pulse w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination e Contador */}
            <div class="flex max-lg:flex-col gap-2 justify-normal my-4">
              <div class="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    class="h-10 w-10 bg-gray-200 rounded animate-pulse"
                  />
                ))}
              </div>
              <div class="h-6 bg-gray-200 rounded animate-pulse w-32 max-lg:mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderProductReviews({
  class: _class,
}: {
  class?: string;
}) {
  return (
    <div class={clx("w-full", _class)}>
      {/* Overview Section */}
      <div id="product-review" class="mt-12">
        <div class="max-w-[1320px] mx-auto">
          <div id="title-and-rating" class="py-5">
            {/* Título */}
            <div class="px-[15px] md:text-2xl lg:w-[75%] lg:mx-auto lg:mb-[20px]">
              <div class="h-8 md:h-10 bg-gray-200 rounded animate-pulse w-full max-w-[600px] mx-auto mb-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Feedbacks Section */}
      <div
        id="reviews"
        class="flex flex-col gap-4 my-6 p-[15px] max-w-[1320px] mx-auto"
      >
        {/* First Review */}
        <div class="flex flex-col gap-4 bg-[#f8f8f8] rounded-lg p-[15px]">
          <div class="flex items-center justify-between">
            <div class="flex flex-col md:flex-row w-full md:items-center gap-1.5">
              {/* Ratings */}
              <div class="flex gap-1 mb-2 md:mb-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    class="h-4 w-4 bg-gray-200 rounded animate-pulse"
                  />
                ))}
              </div>
              {/* Rating details */}
              <div class="flex flex-col md:w-2/4 gap-1.5 md:items-center w-full md:flex-row">
                <div class="h-4 bg-gray-200 rounded animate-pulse w-32" />
                <div class="hidden md:block w-1 h-1 bg-gray-200 rounded-full" />
                <div class="h-4 bg-gray-200 rounded animate-pulse w-36" />
                <div class="hidden md:block w-1 h-1 bg-gray-200 rounded-full" />
                <div class="h-4 bg-gray-200 rounded animate-pulse w-40" />
              </div>
            </div>
            {/* Author */}
            <div class="flex items-center gap-2">
              <div class="h-4 bg-gray-200 rounded animate-pulse w-24" />
              <div class="h-12 w-12 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>
          {/* Review phrase */}
          <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          {/* Review description */}
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div class="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
            <div class="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
          </div>
          {/* Additional image */}
          <div class="h-24 w-24 bg-gray-200 rounded-[9px] animate-pulse" />
        </div>

        {/* Second Review */}
        <div class="flex flex-col gap-4 bg-[#f8f8f8] rounded-lg p-[15px]">
          <div class="flex items-center justify-between">
            <div class="flex flex-col md:flex-row w-full md:items-center gap-1.5">
              <div class="flex gap-1 mb-2 md:mb-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    class="h-4 w-4 bg-gray-200 rounded animate-pulse"
                  />
                ))}
              </div>
              <div class="flex flex-col md:w-2/4 gap-1.5 md:items-center w-full md:flex-row">
                <div class="h-4 bg-gray-200 rounded animate-pulse w-32" />
                <div class="hidden md:block w-1 h-1 bg-gray-200 rounded-full" />
                <div class="h-4 bg-gray-200 rounded animate-pulse w-36" />
                <div class="hidden md:block w-1 h-1 bg-gray-200 rounded-full" />
                <div class="h-4 bg-gray-200 rounded animate-pulse w-40" />
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="h-4 bg-gray-200 rounded animate-pulse w-24" />
            </div>
          </div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div class="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
          </div>
        </div>

        {/* Third Review */}
        <div class="flex flex-col gap-4 bg-[#f8f8f8] rounded-lg p-[15px]">
          <div class="flex items-center justify-between">
            <div class="flex flex-col md:flex-row w-full md:items-center gap-1.5">
              <div class="flex gap-1 mb-2 md:mb-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    class="h-4 w-4 bg-gray-200 rounded animate-pulse"
                  />
                ))}
              </div>
              <div class="flex flex-col md:w-2/4 gap-1.5 md:items-center w-full md:flex-row">
                <div class="h-4 bg-gray-200 rounded animate-pulse w-32" />
                <div class="hidden md:block w-1 h-1 bg-gray-200 rounded-full" />
                <div class="h-4 bg-gray-200 rounded animate-pulse w-36" />
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="h-4 bg-gray-200 rounded animate-pulse w-24" />
            </div>
          </div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div class="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
          </div>
        </div>

        {/* Show more button */}
        <div class="text-center">
          <div class="h-5 bg-gray-200 rounded animate-pulse w-40 mx-auto" />
        </div>
      </div>
    </div>
  );
}

function PlaceholderTestimonials({
  class: _class,
}: {
  class?: string;
}) {
  return (
    <div class={clx("w-full", _class)}>
      {/* Header Title Skeleton (opcional) */}
      <div class="w-full flex flex-col justify-center items-center pt-10 pb-10 ">
        <div class="flex flex-col items-center justify-center gap-3">
          <div class="h-8 md:h-10 bg-gray-200 rounded animate-pulse w-64 md:w-80" />
          <div class="h-10 md:h-12 bg-gray-200 rounded animate-pulse w-80 md:w-96" />
        </div>
      </div>

      {/* Main Content */}
      <div class="w-full max-w-[1320px] mx-auto px-4 py-8 flex flex-col gap-14 lg:gap-20 lg:py-10 lg:px-0">
        <div class="relative w-full">
          {/* Slider Container */}
          <div class="flex gap-4 lg:gap-8 w-full py-2.5 overflow-x-auto scrollbar-none">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                class="flex-shrink-0 w-full max-w-[580px] flex flex-col gap-4"
              >
                {/* Testimonial Card */}
                <div class="flex border shadow-[1px_3px_8px_rgba(0,0,0,0.25)] rounded-lg box-border px-3 py-5 md:py-8 lg:px-7">
                  <div class="flex justify-around gap-x-9 w-full">
                    {/* Left Column - Image and Location */}
                    <div class="flex flex-col h-full items-center justify-center">
                      {/* Additional Image */}
                      <div class="rounded-xl h-[205px] xxxs:min-w-[152px] sm:min-w-[197px] lg:min-w-[152px] bg-gray-200 animate-pulse" />

                      {/* Location and User Info (Mobile) */}
                      <div class="flex flex-col items-start mt-3">
                        {/* Location */}
                        <div class="flex items-center justify-center gap-x-2 mb-3">
                          <div class="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                          <div class="h-4 bg-gray-200 rounded animate-pulse w-24" />
                        </div>

                        {/* User Info (Mobile) */}
                        <div class="flex lg:hidden flex-col w-full">
                          <div class="h-5 bg-gray-200 rounded animate-pulse w-32 mb-2" />
                          <div class="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                class="h-5 w-5 bg-gray-200 rounded animate-pulse"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - User Info, Review, Product */}
                    <div class="flex flex-col items-center flex-1">
                      {/* User Info (Desktop) */}
                      <div class="hidden lg:flex w-full flex-col mb-4">
                        <div class="h-5 bg-gray-200 rounded animate-pulse w-32 mb-2" />
                        <div class="flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              class="h-5 w-5 bg-gray-200 rounded animate-pulse"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Review Description */}
                      <div class="text-start w-full min-h-[95px] pb-8 mb-2.5">
                        <div class="space-y-2">
                          <div class="h-4 bg-gray-200 rounded animate-pulse w-full" />
                          <div class="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                          <div class="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
                          <div class="h-4 bg-gray-200 rounded animate-pulse w-3/6" />
                        </div>
                        <div class="h-4 bg-gray-200 rounded animate-pulse w-24 mt-2" />
                      </div>

                      {/* Product Link */}
                      <div class="flex flex-col lg:h-[196px] lg:gap-5 justify-center items-center w-full">
                        {/* Product Image */}
                        <div class="w-full lg:w-[200px] lg:max-h-[70px] h-16 lg:h-14 bg-gray-200 rounded animate-pulse" />
                        {/* Product Name */}
                        <div class="h-5 bg-gray-200 rounded animate-pulse w-32 mt-1 mb-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
Section.PlaceholderProductDetails = PlaceholderProductDetails;
Section.PlaceholderSearchResult = PlaceholderSearchResult;
Section.PlaceholderProductReviews = PlaceholderProductReviews;
Section.PlaceholderTestimonials = PlaceholderTestimonials;

export default Section;
