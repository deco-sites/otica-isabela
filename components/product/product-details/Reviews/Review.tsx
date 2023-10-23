import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import ShowMore from "deco-sites/otica-isabela/islands/ShowMore.tsx";
import Feedback from "deco-sites/otica-isabela/components/product/product-details/Reviews/Feedback.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import ReviewImagesModal from "deco-sites/otica-isabela/islands/ReviewImagesModal.tsx";
import { Review } from "deco-sites/otica-isabela/packs/types.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export type MemberLevel = {
  /** @title Level */
  label: string;
  image: LiveImage;
};

interface Props {
  page: LoaderReturnType<Review[] | null>;
  memberImages: MemberLevel[];
}

function Review({ page, memberImages }: Props) {
  const reviews = page;
  const id = "review-image-slider";

  if (!reviews || !reviews.length) return null;

  const generalRate = reviews.reduce((acc, review) => {
    return acc + review.ratingValue;
  }, 0) / reviews.length;

  const reviewsWithImages = reviews.filter((review) => review.additionalImage);

  return (
    <>
      {/* Overview */}
      <div class="mt-12 bg-[#f8f8f8] ">
        <div class="container">
          <div id="title-and-rating" class="py-[70px]">
            <h1 class="text-xl text-black font-bold text-center px-[15px] md:text-2xl lg:w-[75%] lg:text-[32px] lg:mx-auto lg:mb-[20px]">
              Nos sentimos felizes por fazer a diferença na saúde visual de
              milhares de pessoas
            </h1>
            <div class="flex justify-center items-center gap-1">
              <h1 class="text-[64px] font-bold text-orange-500">
                {generalRate.toFixed(1).replace(".", ",")}
              </h1>
              <Icon id="Ratings" size={39} />
            </div>
            <h1 class="text-lg text-center">Pontuação geral</h1>

            {/* Images */}
            <div class="w-full flex flex-col gap-0 md:gap-12 lg:gap-16 mt-8">
              <div id={id} class="container flex flex-col px-0 sm:px-5">
                <Slider class="carousel carousel-center sm:carousel-end gap-0 md:gap-6 col-span-full row-start-2 row-end-5">
                  {reviews?.map((review, index) => (
                    review.additionalImage &&
                    (
                      <div class="flex flex-col relative">
                        <Slider.Item
                          index={index}
                          class="carousel-item w-full justify-center"
                        >
                          <Image
                            class="rounded-[9px] cursor-pointer"
                            src={review.additionalImage}
                            alt={review.reviewDescription}
                            width={157}
                            height={205}
                          />
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
      {/* Feedbacks */}
      <div
        id="reviews"
        class="flex flex-col gap-8 my-12 px-[15px] bg-white container"
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

        {/* Show more */}
        {reviews && reviews?.length >= 3 && (
          <ShowMore
            reviews={reviews.slice(2, reviews.length)}
            images={memberImages}
          />
        )}
      </div>
    </>
  );
}

export default Review;
