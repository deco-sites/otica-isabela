import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";

interface Props {
  ratingValue: number;
}

function Ratings({ ratingValue }: Props) {
  const ratings = Array.from({ length: ratingValue }, (_, index) => index);

  return (
    <div className="flex items-center gap-[3px] mb-[22px]">
      {ratings.map(() => {
        return <Icon id="Ratings" size={21} />;
      })}
    </div>
  );
}

export default Ratings;
