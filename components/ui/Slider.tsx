import type { ComponentChildren, JSX } from "preact";

function Dot({ index, children }: {
  index: number;
  children?: ComponentChildren;
}) {
  return children
    ? (
      <button
        data-dot={index}
        aria-label={`go to slider item ${index}`}
        class="focus:outline-none group"
      >
        {children}
      </button>
    )
    : (
      <button
        data-dot={index}
        aria-label={`go to slider item ${index}`}
        class="focus:outline-none group opacity-50 disabled:opacity-100"
      >
        <div class="w-[10px] h-[10px] rounded-3xl bg-slot-primary-600"></div>
      </button>
    );
}

function Slider(props: JSX.IntrinsicElements["ul"]) {
  return <ul data-slider {...props} />;
}

function Item({
  index,
  ...props
}: JSX.IntrinsicElements["li"] & { index: number }) {
  return <li data-slider-item={index} {...props} />;
}

function NextButton(props: JSX.IntrinsicElements["button"]) {
  return <button data-slide="next" aria-label="Next item" {...props} />;
}

function PrevButton(props: JSX.IntrinsicElements["button"]) {
  return <button data-slide="prev" aria-label="Previous item" {...props} />;
}

Slider.Dot = Dot;
Slider.Item = Item;
Slider.NextButton = NextButton;
Slider.PrevButton = PrevButton;

export default Slider;
