import { useSignal } from "@preact/signals";
import Feedback from "deco-sites/otica-isabela/components/product/product-details/Review/Feedback.tsx";

type Review = {
  rating: number;
  description: string;
  name: string;
};

interface Props {
  reviews: Review[];
}

function ShowMore({ reviews }: Props) {
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
        reviews?.map((review) => <Feedback review={review} />)}
    </>
  );
}

export default ShowMore;
