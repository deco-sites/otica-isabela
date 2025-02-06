import { existsSync } from "node:fs"; // Verificação de existência da imagem
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/components/ui/SliderJS.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import type { Props } from "deco-sites/otica-isabela/components/product/ProductDetails.tsx";
import ToExperimentButton from "deco-sites/otica-isabela/components/product/ToExperimentButton.tsx";
import ProductInfo from "deco-sites/otica-isabela/components/product/product-details/ProductInfo.tsx";
import Ratings from "deco-sites/otica-isabela/components/product/product-details/Ratings.tsx";
import Breadcrumb from "deco-sites/otica-isabela/components/ui/Breadcrumb.tsx";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import WishlistButton from "deco-sites/otica-isabela/components/wishlist/WishlistButton.tsx";
import ShareButton from "deco-sites/otica-isabela/islands/ShareButton.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import Video from "deco-sites/std/components/Video.tsx";
import { useId } from "deco-sites/otica-isabela/sdk/useId.ts";

import CartModalMobile from "$store/components/ui/CartModalMobile.tsx";

const useStableImages = (product: ProductDetailsPage["product"]) => {
  const imageNameFromURL = (url = "") => {
    const segments = new URL(url).pathname.split("/");
    return segments[segments.length - 1];
  };

  const images = product.image ?? [];
  const allImages = product.isVariantOf?.hasVariant
    .flatMap((p) => p.image)
    .reduce((acc, img) => {
      if (img?.url) {
        acc[imageNameFromURL(img.url)] = img.url;
      }
      return acc;
    }, {} as Record<string, string>) ?? {};

  return images.map((img) => {
    const name = imageNameFromURL(img.url);

    return { ...img, url: allImages[name] ?? img.url };
  });
};

function Details({
  page,
  promotions,
  buttonByCategory,
  stepButtonByCategory,
  customer,
  mobileOptions,
}: Props) {
  const { product, breadcrumbList } = page!;
  const { name, productID, offers, additionalProperty, url, sku } = product;
  const {
    discountTagLocation,
    nameLocation,
    starsLocation,
    showProductTumbnails,
    displayModalAfter,
  } = mobileOptions;
  const { price, listPrice, installments } = useOffer(offers);
  const id = `product-image-gallery:${useId()}`;
  const images = useStableImages(product);
  const chooseLensUrl = `/passo-a-passo${url?.split("/produto")[1]}`;
  const experimenterImage = additionalProperty?.find(
    (prop) => prop.propertyID === "experimentador",
  )?.value;
  const colorsList = additionalProperty?.filter(
    (prop) => prop.propertyID === "color",
  );
  const colors = colorsList?.map(({ unitCode }) => unitCode);
  const colorsName = colorsList?.map(({ value }) => value);
  const discount = Math.ceil(
    (((listPrice ?? 0) - (price ?? 0)) / (listPrice ?? 0)) * 100,
  );
  const addToCard = {
    idProduct: Number(productID),
    sku: Number(sku),
    price: price!,
    name: name!,
  };
  const currentCategory = breadcrumbList?.itemListElement[0].name;
  const labels = buttonByCategory?.reduce(
    (acc: { [key: string]: string }, curr) => {
      acc[curr.category.toLowerCase()] = curr.label;
      return acc;
    },
    {},
  );
  const stepLabels = stepButtonByCategory?.reduce(
    (acc: { [key: string]: string }, curr) => {
      acc[curr.category.toLowerCase()] = curr.label;
      return acc;
    },
    {},
  );

  const promotionFlag = additionalProperty?.find(
    (prop) => prop.propertyID === "flag",
  )?.value;

  const promotion = promotions?.find(
    (current) => current.label === promotionFlag,
  );

  const rating = additionalProperty?.find(
    (prop) => prop.propertyID === "rating",
  )?.value;

  const isAllowedToAddLens = additionalProperty?.some(
    (prop) => prop.propertyID === "isAllowedToAddLens",
  );

  const isLensWithoutPrescription = additionalProperty?.find(
    (prop) => prop.propertyID === "isLensWithoutPrescription",
  )?.value;

  const lensDescription = additionalProperty?.find(
    (prop) => prop.propertyID === "lensDescription",
  )?.value;

  const ratingValue = rating ? parseFloat(rating) : 0;
  const isLentes = product?.category?.includes("Lentes de Contato");

  // Caminho da imagem para "Acessórios Inclusos"
  const accessoriesImagePath = "/images/custom/accessorios-inclusos.jpg";

  // Função para verificar se a imagem existe na pasta
  const accessoriesImageExists = existsSync(`./static${accessoriesImagePath}`);

  return (
    <>
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `
            #image-dots::-webkit-scrollbar {
              display: none;
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `,
        }}
      />
      {/* Breadcrumb - Desktop */}
      <div
        id="breadcrumb"
        class="block mb-[20px] text-center md:text-left"
      >
        <Breadcrumb itemListElement={breadcrumbList?.itemListElement} />
      </div>

      {/* Header - Mobile */}
      <div
        id={`experimentador-section-${id}`}
        class="flex items-center justify-between mx-3 mt-4 lg:hidden"
      >
        {/* Discount Span - Mobile (Header) */}
        {discount > 0 && discountTagLocation === "Header" && (
          <span class="flex font-bold bg-[#d92027] gap-x-1 rounded text-sm lg:flex justify-center items-center text-white p-2.5 ">
            <Icon id="ArrowDown" width={9} height={9} />-{discount}%
          </span>
        )}
        <div class="flex items-center">
          <ShareButton link={url!} />
          <WishlistButton productID={productID} customer={customer} />
        </div>

        {/* Ratings - Mobile (Header) */}
        {!!ratingValue &&
          starsLocation === "Header" &&
          discountTagLocation !== "Header" && (
          <a href="#product-review" aria-label="Veja as avaliações!">
            <Ratings ratingValue={ratingValue} />
          </a>
        )}
        {!isLentes && experimenterImage
          ? (
            <ToExperimentButton
              image={experimenterImage!}
              variant="filled"
              size="tiny"
            />
          )
          : null}
      </div>

      {/* Product Name - Mobile (Header) */}
      {nameLocation === "Header" && (
        <div class="mt-4 mb-4 text-center px-8 lg:hidden">
          <span class="font-roboto font-normal text-lg">{name}</span>
          {lensDescription && (
            <span class="font-roboto font-medium text-sm">
              {lensDescription}
            </span>
          )}
        </div>
      )}

      {/* Image Slider - Mobile & Desktop */}
      <div id={id} class="lg:flex lg:justify-center lg:gap-9">
        <div class="relative flex flex-col items-center text-center w-full lg:max-w-[540px] mt-2 lg:mt-0">
          <Slider
            id={`product-images-${id}`}
            class="carousel carousel-center gap-6 bg-white w-[95vw] sm:w-[30vw] md:w-[60vw] lg:w-[540px]"
          >
            {images.map((img, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-full items-center"
              >
                {img.additionalType === "video" ? (
                  <Video
                    src={img.url}
                    loading="lazy"
                    width={350}
                    height={350}
                    class="w-full"
                    controls
                  />
                ) : (
                  <Image
                    class="w-full h-max"
                    src={img.url!}
                    alt={img.alternateName}
                    width={350}
                    height={350}
                    preload={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                )}
              </Slider.Item>
            ))}
          </Slider>
        </div>
      </div>

      {/* Verificação da imagem em "Acessórios Inclusos" */}
      <div class="mt-8">
        <h2 class="text-lg font-bold">Acessórios Inclusos</h2>
        {accessoriesImageExists ? (
          <Image
            src={accessoriesImagePath}
            alt="Acessórios inclusos"
            width={400}
            height={300}
            class="w-full h-auto"
          />
        ) : (
          <p>Acessórios disponíveis não incluem imagens.</p>
        )}
      </div>

      {/* Product Details - Desktop */}
      <div class="hidden lg:block pl-4 pr-4 w-full max-w-[480px]">
        <ProductInfo
          page={page}
          promotions={promotions}
          labels={labels}
          stepLabels={stepLabels}
          customer={customer}
        />
      </div>
      <SliderJS rootId={id} />
    </>
  );
}

export default Details;
