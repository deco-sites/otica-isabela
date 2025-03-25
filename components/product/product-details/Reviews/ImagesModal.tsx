import Image from "deco-sites/std/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Modal from "$store/components/ui/NewModal.tsx";
import Ratings from "$store/components/product/product-details/Ratings.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useSignal } from "@preact/signals";
import { Review } from "$store/packs/types.ts";
import { useId } from "$store/sdk/useId.ts";

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
  const isOpen = useSignal(false);
  const id = `review-image-slider-modal-${useId()}`;

  const setSelectedReview = (review: Review) => {
    selectedReview.value = {
      image: review.additionalImage,
      rating: review.ratingValue,
      description: review.reviewDescription,
    };
  };

  const toggleModal = () => {
    isOpen.value = !isOpen.value;
    setSelectedReview(selected);
  };

  return (
    <>
      <div
        id="modal-trigger"
        class="absolute w-full h-full"
        onClick={toggleModal}
      >
      </div>
      <Modal
        class="p-0 w-full rounded-[10px] max-w-[314px] lg:max-w-[565px]"
        open={isOpen.value}
        onClose={toggleModal}
      >
        <div
          class="absolute right-0 z-10 bg-black rounded-[10px] p-[10px] cursor-pointer"
          onClick={toggleModal}
        >
          <Icon id="XMark" size={20} class="text-white" />
        </div>
        <div id="image-container" class="relative">
          {selectedReview.value.image
            ? (
              <Image
                class="w-full cursor-pointer"
                src={selectedReview.value.image}
                width={314}
                height={410}
              />
            )
            : (
              <div
                class="bg-gray-400 cursor-pointer w-full"
                style={{ height: 410 }}
              />
            )}
          <div class="absolute bottom-0 w-full p-[10px] bg-[rgba(0,0,0,.5)]">
            <Ratings ratingValue={selectedReview.value.rating} />
            <p class="mt-5 text-[13px] text-white">
              {selectedReview.value.description}
            </p>
          </div>
        </div>
        <div
          id={id}
          class="container flex flex-col px-0 bg-[rgba(0,0,0,.5)] p-[15px] lg:px-[15px]"
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
                        >
                        </div>
                      )}
                  </Slider.Item>
                </div>
              )
            ))}
          </Slider>

          <SliderJS
            itemsPerPage={{
              desktop: { 0: 3 },
              mobile: { 0: 1.5 },
            }}
            rootId={id}
          />
        </div>
      </Modal>
    </>
  );
}

export default ImagesModal;
