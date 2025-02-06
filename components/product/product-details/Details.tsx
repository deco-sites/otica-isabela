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

// Função para verificar se a imagem existe
const checkImageExists = async (url: string) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

function Details({ page, promotions, buttonByCategory, stepButtonByCategory, customer, mobileOptions }: Props) {
  const { product, breadcrumbList } = page!;
  const { additionalProperty } = product;
  
  const accessoriesImage = additionalProperty?.find(
    (prop) => prop.propertyID === "accessoriesImage"
  )?.value;
  
  const imagePath = accessoriesImage ? `/images/custom/${accessoriesImage}` : null;

  return (
    <>
      <div id="breadcrumb" class="block mb-[20px] text-center md:text-left">
        <Breadcrumb itemListElement={breadcrumbList?.itemListElement} />
      </div>
      
      {/* Exibir imagem dos acessórios somente se existir */}
      {imagePath && (
        <Image
          src={imagePath}
          alt="Acessórios Inclusos"
          width={350}
          height={350}
          onError={(e) => e.currentTarget.style.display = "none"} // Oculta a imagem se der erro 404
        />
      )}
    </>
  );
}

export default Details;
