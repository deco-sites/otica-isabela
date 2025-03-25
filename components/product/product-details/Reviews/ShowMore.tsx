import Feedback from "$store/components/product/product-details/Reviews/Feedback.tsx";
import { useSignal } from "@preact/signals";
import { Review } from "$store/packs/types.ts";
import type { MemberLevel } from "$store/components/product/product-details/Reviews/Review.tsx";

interface Props {
  reviews: Review[];
  images?: MemberLevel[];
}

function ShowMore({ reviews, images }: Props) {
  const isExpanded = useSignal(false);

  return (
    <>
      {!isExpanded.value && (
        <div class="text-center">
          <span
            class="text-sm font-bold underline cursor-pointer"
            onClick={() => {
              isExpanded.value = true;
            }}
          >
            Ver mais comentários
          </span>
        </div>
      )}
      {isExpanded.value &&
        reviews?.map((review) => <Feedback review={review} images={images} />)}
    </>
  );
}

export default ShowMore;
