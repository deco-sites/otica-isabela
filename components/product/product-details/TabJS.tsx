import { useEffect } from "preact/hooks";

interface Props {
  rootId: string;
}

const setup = ({ rootId }: Props) => {
  const mainTabContainer = document.getElementById(rootId);

  if (!mainTabContainer) return;

  const tabsAnchor = mainTabContainer.querySelectorAll(".tab");
  const tabsContent = mainTabContainer.querySelectorAll(".tab-content");

  if (!tabsAnchor || !tabsContent) return;

  const clearOtherAnchors = (activeAnchorId: string) => {
    Array.from(tabsAnchor).map((tab) => {
      tab.id !== activeAnchorId &&
        tab.classList.remove("tab-active", "border-b-4");
    });
  };

  const clearOtherContents = (avtiveContentId: string) => {
    Array.from(tabsContent).map((content) => {
      if (
        content.id !== avtiveContentId &&
        content.classList.contains("block")
      ) {
        content.classList.add("hidden");
        content.classList.remove("block");
      }
    });
  };

  Array.from(tabsAnchor).map((tab) => {
    tab.addEventListener("click", (event: Event) => {
      const anchorTab = event.target as HTMLAnchorElement;
      const contentId = anchorTab.id.split("-tab")?.[0];
      const tabContent = mainTabContainer.querySelector(
        `#${contentId}-content`,
      ) as HTMLDivElement;
      anchorTab.classList.add("tab-active", "border-b-4");
      tabContent.classList.remove("hidden");
      tabContent.classList.add("block");
      clearOtherAnchors(anchorTab.id);
      clearOtherContents(`${contentId}-content`);
    });
  });
};

const TabJS = ({ rootId }: Props) => {
  useEffect(() => setup({ rootId }), [rootId]);
  return <div data-tab-controller-js />;
};

export default TabJS;
