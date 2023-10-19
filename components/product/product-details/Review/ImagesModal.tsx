import Image from "deco-sites/std/components/Image.tsx";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import Modal from "deco-sites/otica-isabela/components/ui/NewModal.tsx";
import Ratings from "deco-sites/otica-isabela/components/product/product-details/Ratings.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useSignal } from "@preact/signals";
import { Review } from "deco-sites/otica-isabela/packs/types.ts";
import { useId } from "preact/hooks";

interface Props {
  reviews: Review[];
  selected: Review;
}

function ImagesModal({ reviews, selected }: Props) {
  const selectedReview = useSignal({
    image: selected.additionalImage,
    rating: selected.ratingValue,
    description: selected.reviewDescription,
  });
  const isOpened = useSignal(false);
  const id = `review-image-slider-modal-${useId()}`;

  const setSelectedReview = (review: Review) => {
    selectedReview.value = {
      image: review.additionalImage,
      rating: review.ratingValue,
      description: review.reviewDescription,
    };
  };

  return (
    <Modal
      class="p-0 w-full rounded-[10px] relative"
      inputClasses="absolute w-full h-full"
      open={isOpened.value}
    >
      <div
        class="absolute right-0 z-10 bg-black rounded-[10px] p-1"
        onClick={() => isOpened.value = false}
      >
        <Icon id="XMark" size={20} fill="white" />
      </div>
      <div id="image-container" class="relative">
        <Image
          class="w-full"
          src={selectedReview.value.image}
          width={314}
          height={410}
        />
        <div class="absolute bottom-0 w-full p-[10px] bg-[rgba(0,0,0,.5)]">
          <Ratings ratingValue={selectedReview.value.rating} />
          <p class="mt-5 text-[13px] text-white">
            {selectedReview.value.description}
          </p>
        </div>
      </div>
      <div
        id={id}
        class="container flex flex-col px-0 bg-[rgba(0,0,0,.5)] p-[15px]"
      >
        <Slider class="carousel carousel-center sm:carousel-end gap-0 md:gap-6 col-span-full row-start-2 row-end-5">
          {reviews?.map((review, index) => (
            review.additionalImage &&
            (
              <div class="flex flex-col">
                <Slider.Item
                  index={index}
                  class="carousel-item w-full first:pl-4 last:pr-4 justify-center lg:first:pl-0 lg:last:pr-0"
                >
                  <Image
                    class="rounded-[9px]"
                    src={review.additionalImage}
                    alt={review.reviewDescription}
                    width={157}
                    height={205}
                    onClick={() => setSelectedReview(review)}
                  />
                </Slider.Item>
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
          perPageDots
        />
      </div>
    </Modal>
  );
}

export default ImagesModal;
