import { useState } from "preact/hooks";
import ProductCardImage from "$store/components/product/ProductCardImage.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Stopwatch from "$store/islands/Stopwatch.tsx";
import ToExperimentButton from "$store/islands/ToExperimentButton.tsx";
import { SendEventOnClick } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { getAvailableColors } from "$store/sdk/getVariantColors.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useId } from "$store/sdk/useId.ts";
import type { AuthData } from "$store/packs/types.ts";
import type { LoaderReturnType } from "$live/types.ts";
// import WishlistButton from "$store/components/wishlist/WishlistButton.tsx";
import { Product } from "site/packs/v2/types.ts";
import { withManifest } from "$live/clients/withManifest.ts";
import { MediasResponseObject } from "$store/packs/v2/loaders/productMedias.ts";
import { findProductAttribute } from "site/sdk/findProductAttribute.ts";

interface Props {
  product: Product;
  preload?: boolean;
  itemListName?: string;
  isStopwatchEnabled?: boolean;
  isSliderEnabled?: boolean;
  customer?: LoaderReturnType<AuthData>;
  hideExperiment?: boolean;
}

// Cache global para armazenar as imagens por slug
const imageCache = new Map<string, MediasResponseObject[]>();

function ProductCard({
  product,
  preload,
  itemListName,
  isStopwatchEnabled,
  isSliderEnabled,
  // customer,
  hideExperiment,
}: Props) {
  const {
    id: productID,
    name,
    // attributes,
    medias,
    // descriptions,
    price,
    priceWithDiscount,
  } = product;

  const originalImages = medias?.filter((media) =>
    !media.isVideo && !media.tryOn
  );
  const [hoverImage, setHoverImage] = useState<string | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [selectedColorSlug, setSelectedColorSlug] = useState<string>(
    product.slug,
  );
  const [selectedColorImages, setSelectedColorImages] = useState<
    MediasResponseObject[]
  >([]);
  const [isLoadingImages, setIsLoadingImages] = useState<boolean>(false);

  const imageContainerId = useId();
  const id = `product-card-${productID}`;
  const [front, _back] = originalImages ?? [];

  const discount = Math.ceil(
    (((price ?? 0) - (priceWithDiscount ?? 0)) / (price ?? 0)) * 100,
  );

  const experimenterImage = originalImages.find((img) => img.tryOn)?.url;

  const availableColors = getAvailableColors(product);

  // Função para renderizar as medidas do produto
  const renderMeasurements = () => {
    const altura = findProductAttribute("Altura da Lente", product);
    const largura = findProductAttribute("Largura da Lente", product);
    const ponte = findProductAttribute("Largura da Ponte", product);
    const frente_total = findProductAttribute("Frente Total", product);
    const hastes = findProductAttribute("Hastes", product);
    const aro = findProductAttribute("Aro", product);

    const measurements = [
      { item: altura, label: "Altura" },
      { item: largura, label: "Largura" },
      { item: ponte, label: "Ponte" },
      { item: hastes, label: "Hastes" },
      { item: frente_total, label: "Frente" },
      { item: aro, label: "Aro" },
    ].filter((m) => m.item); // Remove medidas que não existem

    if (measurements.length === 0) return null;

    return (
      <div class="text-xs font-normal leading-none text-base-200">
        {measurements.map(({ item, label }, index) => (
          <span key={item!.type}>
            {label}: {item!.value}mm
            {index < measurements.length - 1 ? " / " : ""}
          </span>
        ))}
      </div>
    );
  };

  const getCurrentImages = () => {
    // Se uma cor diferente foi selecionada e temos imagens para ela, usa as imagens da cor
    if (selectedColorSlug !== product.slug && selectedColorImages.length > 0) {
      return selectedColorImages.filter((media) => !media.tryOn).map((media) =>
        media.productImage
      );
    }
    // Caso contrário, usa as imagens originais
    return originalImages?.map((img) => img.url) || [];
  };

  const handleImageHover = (index: number) => {
    const currentImages = getCurrentImages();

    if (currentImages.length > 1) {
      const nextIndex = (index + 1) % currentImages.length;
      setHoverImage(currentImages[nextIndex]);
      setHoverIndex(index);
    }
  };

  const handleImageLeave = () => {
    setHoverImage(null);
    setHoverIndex(null);
  };

  const getDisplayImage = (index: number = 0) => {
    const currentImages = getCurrentImages();

    if (hoverIndex === index && currentImages.length > 1) {
      const nextIndex = (index + 1) % currentImages.length;
      return currentImages[nextIndex];
    }

    return hoverImage || currentImages[0] || front?.url;
  };

  const handleClickColor = async (slug: string) => {
    // Se for a mesma cor já selecionada, não faz nada
    if (slug === selectedColorSlug) return;

    // Verifica se já temos as imagens no cache
    if (imageCache.has(slug)) {
      const cachedImages = imageCache.get(slug)!;
      setSelectedColorSlug(slug);
      setSelectedColorImages(cachedImages);
      // Reset hover states
      setHoverImage(null);
      setHoverIndex(null);
      return;
    }

    // Se não temos no cache, faz a requisição
    setIsLoadingImages(true);

    try {
      //@ts-ignore Um erro bizarro acontecendo quando remove o ts-ignore
      const Runtime = withManifest<Manifest>();

      const medias = Runtime.create(
        "site/loaders/product/productMedias.ts",
      );

      const response: MediasResponseObject[] = await medias({ slug });

      // Armazena no cache
      imageCache.set(slug, response);

      // Atualiza o estado
      setSelectedColorSlug(slug);
      setSelectedColorImages(response);

      // Reset hover states
      setHoverImage(null);
      setHoverIndex(null);
    } catch (error) {
      console.error("Erro ao buscar imagens da variante:", error);
      // Em caso de erro, mantém a cor atual
    } finally {
      setIsLoadingImages(false);
    }
  };

  const renderSlider = () => {
    const currentImages = getCurrentImages();

    return (
      <>
        <Slider
          class="carousel carousel-center w-full scrollbar-none gap-6 min-h-[170px] relative"
          key={`slider-${selectedColorSlug}`}
        >
          {currentImages.map((imageUrl, index) => {
            if (
              imageUrl.toLowerCase() === "/content/assets/images/capa-video.jpg"
            ) return null;
            return (
              <Slider.Item
                index={index}
                key={`${selectedColorSlug}-${index}`}
                class="carousel-item lg:!w-full max-lg:max-h-[197.77px] justify-center "
              >
                <div
                  onMouseEnter={() => handleImageHover(index)}
                  onMouseLeave={handleImageLeave}
                  class="hidden lg:block"
                >
                  <ProductCardImage
                    url={getDisplayImage(index)}
                    alt={product.name ||
                      `Product image ${index + 1}`}
                    preload={preload && index === 0}
                    discount={discount}
                  />
                </div>

                <div class="lg:hidden">
                  <ProductCardImage
                    url={imageUrl}
                    alt={product.name ||
                      `Product image ${index + 1}`}
                    preload={preload && index === 0}
                    discount={discount}
                  />
                </div>
              </Slider.Item>
            );
          })}
          {isLoadingImages && (
            <div class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-20">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900">
              </div>
            </div>
          )}
        </Slider>
        <SliderJS
          rootId={`product-card-${productID}-${imageContainerId}`}
          key={`sliderjs-${selectedColorSlug}`}
        />
      </>
    );
  };

  const renderStaticImage = () => (
    <div
      class="relative"
      onMouseEnter={() => handleImageHover(0)}
      onMouseLeave={handleImageLeave}
    >
      <ProductCardImage
        url={getDisplayImage()}
        alt={product?.name || "Product Image"}
        preload={preload}
        discount={discount}
      />
      {isLoadingImages && (
        <div class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-20">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900">
          </div>
        </div>
      )}
    </div>
  );

  const renderColorSwatches = () => (
    <ul class="flex flex-wrap gap-y-1 gap-x-1 items-center w-[90%] h-4 relative max-lg:ml-5">
      {availableColors
        .sort((a, b) => (a.name === name ? -1 : b.name === name ? 1 : 0))
        .map(({ name, slug, unitCodes }) => {
          const isSelected = slug === selectedColorSlug;

          return (
            <li
              key={slug}
              class={`group cursor-pointer ${
                isSelected
                  ? "ring-1 ring-offset-2 ring-[#aaa] rounded-full mr-1"
                  : ""
              }`}
            >
              <a
                aria-label={name}
                onClick={(e) => {
                  e.preventDefault();
                  handleClickColor(slug);
                }}
                class={`block ${
                  isLoadingImages ? "pointer-events-none opacity-50" : ""
                }`}
              >
                <div
                  style={{
                    background: unitCodes.length > 1
                      ? `linear-gradient(${unitCodes.join(", ")})`
                      : unitCodes[0],
                  }}
                  class="mask mask-circle h-4 w-4 bg-secondary hover:scale-125 transition-transform"
                />
              </a>
              <div class="absolute w-full z-20 bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {name}
              </div>
            </li>
          );
        })}
    </ul>
  );

  const renderExperimentButton = () =>
    experimenterImage && !hideExperiment
      ? <ToExperimentButton image={experimenterImage} />
      : (
        <button class="border-[1px] shrink-0 border-black hover:border-slot-primary-500 text-grayscale-700 hover:text-slot-primary-500 py-[5px] max-lg:py-1 px-4 max-lg:px-3 rounded-[17px] text-center">
          <a
            href={`/produto/${selectedColorSlug}`}
            class="w-full font-semibold flex justify-end hover:underline text-sm max-lg:text-xs"
          >
            {["lentes de contato", "acessórios"].includes(
                product?.category?.name?.toLowerCase(),
              )
              ? "Ver Produto"
              : "Experimentar"}
          </a>
        </button>
      );

  return (
    <div
      id={id}
      class="card card-compact w-full lg:px-1"
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item",
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product: {
                  ...product,
                  "@type": "Product",
                  productID: String(product?.id),
                  sku: product?.code,
                  category: product?.category?.name || "",
                },
                price: priceWithDiscount,
                listPrice: price,
              }),
            ],
          },
        }}
      />

      <a
        href={`/produto/${selectedColorSlug}`}
        aria-label="view product"
        class="relative"
        id={`product-card-${productID}-${imageContainerId}`}
      >
        {isStopwatchEnabled && product.promotion?.countdown && (() => {
          if (
            product.promotion.allowsCountdown === false &&
            product.promotion.isDayOffer === false
          ) {
            return null;
          }

          // Check if promotion is currently active
          const now = new Date();
          const startDate = new Date(product.promotion.countdown.start);
          const endDate = new Date(product.promotion.countdown.end);
          const isActive = now >= startDate && now <= endDate;

          return isActive
            ? (
              <Stopwatch
                targetDate={product.promotion.countdown.end}
                type="card"
              />
            )
            : null;
        })()}
        {isSliderEnabled ? renderSlider() : renderStaticImage()}
      </a>

      <div class="flex flex-col items-center mt-[10px]">
        <a
          href={`/produto/${selectedColorSlug}`}
          aria-label="view product"
          class="contents"
        >
          <div class="flex flex-col w-full">
            <p class="text-black text-base leading-none h-[33px]">
              {name}
            </p>

            <div class="min-h-[25px] my-[10px]">
              {renderMeasurements()}
            </div>
          </div>
        </a>

        <div class="w-full flex justify-normal items-center my-[10px]">
          <a
            href={`/produto/${selectedColorSlug}`}
            aria-label="view product"
            class="contents"
          >
            <div class="flex w-full justify-between">
              <div class="flex flex-row justify-center items-center gap-2 max-lg:ml-5">
                {discount > 0 && (
                  <span class="line-through font-semibold text-[#6F6F6F] text-sm">
                    {formatPrice(price)}
                  </span>
                )}
                <span class="text-blue-200 text-lg font-bold">
                  {formatPrice(priceWithDiscount)}
                </span>
              </div>
              {discount > 0 && (
                <span class="text-red-500 font-semibold text-sm flex justify-center items-center max-lg:mr-10">
                  {discount}% OFF
                </span>
              )}
              {availableColors.length === 0 && renderExperimentButton()}
            </div>
          </a>
        </div>

        <div class="w-full flex items-center justify-between">
          {availableColors.length > 0 && renderColorSwatches()}
          {availableColors.length > 0 && renderExperimentButton()}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
