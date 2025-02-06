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

const checkImageExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
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
  const id = `product-image-gallery:${useId()}`;
  const images = product.image ?? [];
  const chooseLensUrl = `/passo-a-passo${url?.split("/produto")[1]}`;
  const accessoriesImage = additionalProperty?.find(
    (prop) => prop.propertyID === "accessoriesImage",
  )?.value;

  return (
    <>
      <div id="breadcrumb" class="block mb-[20px] text-center md:text-left">
        <Breadcrumb itemListElement={breadcrumbList?.itemListElement} />
      </div>
      
      <div id={id} class="lg:flex lg:justify-center lg:gap-9">
        <div class="relative flex flex-col items-center text-center w-full lg:max-w-[540px] mt-2 lg:mt-0">
          <div class="relative">
            <Slider
              id={`product-images-${id}`}
              class="carousel carousel-center gap-6 bg-white w-[95vw] sm:w-[30vw] md:w-[60vw] lg:w-[540px]"
            >
              {images.map((img, index) => (
                <Slider.Item index={index} class="carousel-item w-full items-center">
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
      </div>
      
      {/* Seção de acessórios com verificação da imagem */}
      <div class="accessories-section">
        <h2>Acessórios Inclusos</h2>
        {accessoriesImage ? (
          <Image
            class="w-full h-auto"
            src={accessoriesImage}
            alt="Acessórios Inclusos"
            width={500}
            height={300}
            loading="lazy"
            onError={(e) => e.currentTarget.style.display = "none"}
          />
        ) : (
          <p>Sem acessórios disponíveis.</p>
        )}
      </div>
      
      <CartModalMobile
        chooseLensUrl={chooseLensUrl}
        addToCard={{ idProduct: Number(productID), sku: Number(sku), price: useOffer(offers).price!, name: name! }}
        labels={{}}
        stepLabels={{}}
        isLentes={false}
        currentCategory={breadcrumbList?.itemListElement[0].name!}
        isAllowedToAddLens={false}
        isLensWithoutPrescription={""}
        observableElement={{ type: "Tag", value: "header" }}
      />
    </>
  );
}

export default Details;
