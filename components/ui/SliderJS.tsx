import { useEffect } from "preact/hooks";

interface Props {
  rootId: string;
  scroll?: "smooth" | "auto";
  interval?: number;
  infinite?: boolean;
  itemsPerPage?: {
    mobile: Record<number, number>;
    desktop: Record<number, number>;
  };
}

const ATTRIBUTES = {
  "data-slider": "data-slider",
  "data-slider-item": "data-slider-item",
  'data-slide="prev"': 'data-slide="prev"',
  'data-slide="next"': 'data-slide="next"',
  "data-dot": "data-dot",
};

// Percentage of the item that has to be inside the container
// for it it be considered as inside the container
const THRESHOLD = 0.6;

const intersectionX = (element: DOMRect, container: DOMRect): number => {
  const delta = container.width / 1_000;

  if (element.right < container.left - delta) {
    return 0.0;
  }

  if (element.left > container.right + delta) {
    return 0.0;
  }

  if (element.left < container.left - delta) {
    return element.right - container.left + delta;
  }

  if (element.right > container.right + delta) {
    return container.right - element.left + delta;
  }

  return element.width;
};

// as any are ok in typeguard functions
const isHTMLElement = (x: Element): x is HTMLElement =>
  // deno-lint-ignore no-explicit-any
  typeof (x as any).offsetLeft === "number";

const setup = ({
  rootId,
  scroll,
  interval,
  infinite,
  itemsPerPage = { desktop: { 0: 1 }, mobile: { 0: 1 } },
}: Props) => {
  const { desktop, mobile } = itemsPerPage;

  const currentItemsPerPage = globalThis.matchMedia?.("(min-width: 984px)")
      ?.matches
    ? desktop
    : mobile;

  const root = document.getElementById(rootId);
  const slider = root?.querySelector<HTMLUListElement>(
    `[${ATTRIBUTES["data-slider"]}]`,
  );

  const items = root?.querySelectorAll<HTMLLIElement>(
    `[${ATTRIBUTES["data-slider-item"]}]`,
  );
  const prev = root?.querySelector<HTMLButtonElement>(
    `[${ATTRIBUTES['data-slide="prev"']}]`,
  );
  const next = root?.querySelector<HTMLButtonElement>(
    `[${ATTRIBUTES['data-slide="next"']}]`,
  );

  const thumbs = root?.querySelector<HTMLElement>("#image-dots");

  const dots = root?.querySelectorAll<HTMLButtonElement>(
    `[${ATTRIBUTES["data-dot"]}]`,
  );
  const [, perPage] = Object.entries(currentItemsPerPage)
    .sort(([widthA], [widthB]) => Number(widthB) - Number(widthA))
    .find(([width]) => Number(width) <= globalThis.innerWidth) ?? [0, 1];

  if (!root || !slider || !items || items.length === 0) {
    console.warn(
      "Missing necessary slider attributes. It will not work as intended. Necessary elements:",
      { root, slider, items, rootId },
    );

    return;
  }

  const getElementsInsideContainer = () => {
    const indices: number[] = [];
    const sliderRect = slider.getBoundingClientRect();

    for (let index = 0; index < items.length; index++) {
      const item = items.item(index);
      const rect = item.getBoundingClientRect();

      const ratio = intersectionX(rect, sliderRect) / rect.width;

      if (ratio > THRESHOLD) {
        indices.push(index);
      }
    }

    return indices;
  };

  const goToItem = (index: number) => {
    const item = items.item(index);

    if (!isHTMLElement(item)) {
      console.warn(
        `Element at index ${index} is not an html element. Skipping carousel`,
      );

      return;
    }

    if (thumbs) {
      thumbs.scrollTo({
        top: 0,
        behavior: scroll,
        left: item.offsetLeft,
      });
    }

    slider.scrollTo({
      top: 0,
      behavior: scroll,
      left: item.offsetLeft,
    });
  };

  const onClickPrev = () => {
    const indices = getElementsInsideContainer();
    const itemsPerPage = indices.length;
    const isShowingFirst = indices[0] === 0;

    goToItem(
      isShowingFirst
        ? items.length - 1
        : Math.max(0, indices[0] - itemsPerPage),
    );
  };

  const onClickNext = () => {
    const indices = getElementsInsideContainer();

    const isShowingLast = indices[indices.length - 1] === items.length - 1;

    goToItem(
      Math.min(
        isShowingLast ? 0 : (indices.at(-1) as number) + 1,
        items.length - 1,
      ),
    );
  };

  const observer = new IntersectionObserver(
    (elements) =>
      elements.forEach((item) => {
        const index = Number(item.target.getAttribute("data-slider-item")) || 0;
        const dot = dots?.item(index);

        const indices = getElementsInsideContainer();

        if (item.isIntersecting) {
          dot?.setAttribute("disabled", "");
        } else {
          dot?.removeAttribute("disabled");
        }

        if (!infinite) {
          if (index === 0) {
            if (item.isIntersecting) {
              prev?.setAttribute("disabled", "");
            } else {
              prev?.removeAttribute("disabled");
            }
          }
          if (index === items.length - 1) {
            if (item.isIntersecting) {
              next?.setAttribute("disabled", "");
            } else {
              next?.removeAttribute("disabled");
            }
          }
        }
      }),
    { threshold: THRESHOLD, root: slider },
  );

  const colGap = Number(getComputedStyle(slider).columnGap.replace("px", "")) ||
    0;

  const safeWidth = slider.offsetWidth - colGap * (perPage - 1);
  const cardSize = Math.floor(safeWidth / perPage);

  items.forEach((item) => {
    item.style.width = `${cardSize}px`;
    observer.observe(item);
  });

  dots?.forEach((dot, it) => {
    if (it % Math.floor(perPage) !== 0) {
      dot.style.display = "none";
    }
    dots?.item(it).addEventListener("click", () => goToItem(it));
  });

  prev?.addEventListener("click", onClickPrev);
  next?.addEventListener("click", onClickNext);

  const timeout = interval && setInterval(onClickNext, interval);

  // Unregister callbacks
  return () => {
    for (let it = 0; it < (dots?.length ?? 0); it++) {
      dots?.item(it).removeEventListener("click", () => goToItem(it));
    }

    prev?.removeEventListener("click", onClickPrev);
    next?.removeEventListener("click", onClickNext);

    observer.disconnect();

    clearInterval(timeout);
  };
};

function Slider({
  rootId,
  scroll = "smooth",
  interval,
  infinite = false,
  itemsPerPage,
}: Props) {
  useEffect(
    () =>
      setup({
        rootId,
        scroll,
        interval,
        infinite,
        itemsPerPage,
      }),
    [
      rootId,
      scroll,
      interval,
      infinite,
      itemsPerPage,
    ],
  );

  return <div data-slider-controller-js />;
}

export default Slider;
