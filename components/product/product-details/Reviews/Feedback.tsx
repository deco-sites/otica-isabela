import Ratings from "$store/components/product/product-details/Ratings.tsx";
import type { MemberLevel } from "$store/components/product/product-details/Reviews/Review.tsx";
import Image from "apps/website/components/Image.tsx";
import { Review } from "$store/packs/types.ts";

interface Props {
  review: Review;
  images?: MemberLevel[];
}

function Feedback(
  {
    review: {
      ratingValue,
      reviewDescription,
      authorName,
      memberLevel,
      additionalImage,
    },
    images,
  }: Props,
) {
  const imgObj = images?.reduce((acc: { [key: string]: string }, curr) => {
    acc[curr.level] = curr.image;
    return acc;
  }, {});

  return (
    <div class="flex flex-col gap-4 bg-[#f8f8f8] rounded-lg p-[15px]">
      {/* Rating Goes Here */}
      <div class="flex items-center justify-between">
        <Ratings ratingValue={ratingValue} />
        <div class="flex items-center gap-2">
          <div id="name">
            <span class="text-sm text-[#212529] font-semibold">
              {authorName}
            </span>
          </div>
          {memberLevel !== "default" && (
            <Image
              alt={memberLevel}
              src={imgObj?.[memberLevel as keyof typeof images]!}
              width={50}
              height={50}
            />
          )}
        </div>
      </div>
      <div id="description">
        <span class="text-sm text-[#212529]">
          {reviewDescription}
        </span>
      </div>
      <div id="additionalImage">
        {additionalImage
          ? (
            <Image
              class="rounded-[9px]"
              src={additionalImage}
              alt={reviewDescription}
              width={100}
              height={100}
            />
          )
          : (
            <img
              width={100}
              height={100}
              src={"/image/default-image-user.png"}
              alt={"Imagem padrão de usuário"}
            />
          )}
      </div>
    </div>
  );
}

export default Feedback;
