interface Props {
  review: {
    image?: string;
    rating: number;
    description: string;
    highlited?: string;
    name: string;
    vip?: boolean;
  };
}

function Feedback({ review: { rating, description, name, highlited } }: Props) {
  return (
    <div class="border-b flex flex-col gap-5">
      {/* Rating Goes Here */}
      <div>{rating}</div>
      <div id="description">
        {highlited && <p class="text-base font-bold">"{highlited}"</p>}
        <span class="text-sm text-[#212529]">
          {description}
        </span>
      </div>
      <div id="name">
        <span class="text-sm text-[#212529]">{name}</span>
      </div>
    </div>
  );
}

export default Feedback;
