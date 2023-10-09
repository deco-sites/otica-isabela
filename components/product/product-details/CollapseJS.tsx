import { useEffect } from "preact/hooks";

interface Props {
  rootId: string;
}

const setup = ({ rootId }: Props) => {
  const mainCollapseContainer = document.getElementById(rootId);

  if (!mainCollapseContainer) return;

  const itemAnchor = mainCollapseContainer.querySelectorAll('[id$="-item"]');
  const itemContent =
    mainCollapseContainer.querySelectorAll('[id$="-content"]');

  if (!itemAnchor || !itemContent) return;

  Array.from(itemAnchor).map((item) => {
    item.addEventListener("click", (event: Event) => {
      const item = event.target as HTMLAnchorElement;
      const contentId = item.id.split("-item")?.[0];
      const content = mainCollapseContainer.querySelector(
        `#${contentId}-content`
      ) as HTMLDivElement;

      if (item.classList.contains("item-active")) {
        item.classList.remove("item-active");
        item.classList.add("shadow-md");
        content.classList.add("hide");
      } else {
        item.classList.add("item-active");
        item.classList.remove("shadow-md");
        content.classList.remove("hide");
      }
    });
  });
};

const ProductCollapseJS = ({ rootId }: Props) => {
  useEffect(() => setup({ rootId }), [rootId]);
  return <div data-collapse-controller-js />;
};

export default ProductCollapseJS;
