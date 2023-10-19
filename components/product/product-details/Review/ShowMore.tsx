import Feedback from "deco-sites/otica-isabela/components/product/product-details/Review/Feedback.tsx";
import { useSignal } from "@preact/signals";
import { Review } from "deco-sites/otica-isabela/packs/types.ts";

interface Props {
  reviews: Review[];
  images?: {
    vip: string;
    gold: string;
  };
}

function ShowMore({ reviews, images }: Props) {
  const isExpanded = useSignal(false);

  return (
    <>
      {!isExpanded.value && (
        <div class="text-center">
          <span
            class="text-sm font-bold underline"
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
