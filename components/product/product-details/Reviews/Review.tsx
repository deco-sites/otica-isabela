import Icon from "$store/components/ui/Icon.tsx";
import ShowMore from "$store/islands/ShowMore.tsx";
import Feedback from "$store/components/product/product-details/Reviews/Feedback.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Image from "apps/website/components/Image.tsx";
import ReviewImagesModal from "$store/islands/ReviewImagesModal.tsx";
import { Review } from "$store/packs/types.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";

export type MemberLevel = {
  /** @title Nível */
  /** @description Deve ser adicionado o nível do usuário Ex: vip */
  level: string;

  /** @title Imagem */
  /** @description Adicione a imagem que será exibida de acordo com o nível do cliente */
  image: LiveImage;
};

interface Props {
  /** Configurações do Loader - (Review) */
  page: LoaderReturnType<Review[] | null>;

  /** Configurações do Loader - (Produto) */
  productData: LoaderReturnType<ProductDetailsPage | null>;

  /** Imagens dos Membros por Nível */
  memberImages: MemberLevel[];
}

function Review({ page, productData, memberImages }: Props) {
  const reviews = page;
  const { additionalProperty } = productData?.product || {};
  const id = "review-image-slider";

  if (!reviews || !reviews.length) return null;

  const rating = additionalProperty?.find(
    (prop) => prop.propertyID === "rating",
  )?.value;

  const ratingValue = rating ? parseFloat(rating) : 0;

  const reviewsWithImages = reviews.filter((review) => review.additionalImage);

  return (
    <>
      {/* Overview */}
      <div id="product-review" class="mt-12">
        <div class="max-w-[1320px] mx-auto">
          <div id="title-and-rating" class="py-5">
            <h2 class="text-xl text-black font-bold text-center px-[15px] md:text-2xl lg:w-[75%] lg:text-[32px] lg:mx-auto lg:mb-[20px]">
              Nos sentimos felizes por fazer a diferença na saúde visual de
              milhares de pessoas
            </h2>
            <div class="flex gap-8 px-[15px]">
              <div class="flex flex-col gap-2">
                <h3 class="text-xs text-center">Pontuação geral</h3>
                <div class="flex justify-center items-center gap-1">
                  <span class="text-[48px] font-bold text-orange-500">
                    {ratingValue.toFixed(1).replace(".", ",")}
                  </span>
                  <Icon id="Ratings" size={23} style={{ color: "#F37121" }} />
                </div>
              </div>
              {/* Images */}
              <div class="w-full flex flex-col gap-0 md:gap-12 lg:gap-16">
                <div id={id} class="container flex flex-col px-0 sm:px-5">
                  <Slider class="carousel carousel-center sm:carousel-end gap-1 md:gap-6 col-span-full row-start-2 row-end-5">
                    {reviews?.map((review, index) => (
                      review.additionalImage &&
                      (
                        <div class="flex flex-col relative">
                          <Slider.Item
                            index={index}
                            class="carousel-item !w-full h-full justify-center"
                          >
                            {review.additionalImage
                              ? (
                                <Image
                                  class="rounded-[9px] cursor-pointer"
                                  src={review.additionalImage}
                                  alt={review.reviewDescription}
                                  width={157}
                                  height={205}
                                />
                              )
                              : (
                                <div
                                  class="w-full bg-gray-400 rounded-[9px] cursor-pointer"
                                  style={{ height: 205 }}
                                />
                              )}
                          </Slider.Item>

                          {/* Modal */}
                          <ReviewImagesModal
                            reviews={reviewsWithImages}
                            selected={review}
                          />
                        </div>
                      )
                    ))}
                  </Slider>

                  <SliderJS
                    itemsPerPage={{
                      desktop: { 0: 4 },
                      mobile: { 0: 1.5 },
                    }}
                    rootId={id}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Feedbacks */}
      <div
        id="reviews"
        class="flex flex-col gap-4 my-6 p-[15px] max-w-[1320px] mx-auto"
      >
        {/* First Review */}
        <Feedback
          review={reviews?.[0]!}
          images={memberImages}
        />

        {/* Second Review */}
        {reviews && reviews?.length >= 2 && (
          <Feedback
            review={reviews[1]}
            images={memberImages}
          />
        )}

        {/* Third Review */}
        {reviews && reviews?.length >= 3 && (
          <Feedback
            review={reviews[2]}
            images={memberImages}
          />
        )}

        {/* Show more */}
        {reviews && reviews?.length >= 4 && (
          <ShowMore
            reviews={reviews.slice(3, reviews.length)}
            images={memberImages}
          />
        )}
      </div>
    </>
  );
}

export default Review;
