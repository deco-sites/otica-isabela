import { useEffect } from "preact/hooks";

export interface VideoProps {
  videoUrl: string;
}

const LazyIframe = ({ videoUrl }: VideoProps) => {
  useEffect(() => {
    const lazyIframes = document.querySelectorAll(".lazy-iframe");
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const iframe = entry.target as HTMLIFrameElement;
            const src = iframe.getAttribute("data-src") ?? "";
            iframe.setAttribute("src", src);
            observer.unobserve(iframe);
          }
        });
      },
    );

    lazyIframes.forEach((lazyIframe) => {
      observer.observe(lazyIframe);
    });
  }, []);

  return (
    <div class="video-container flex w-full h-[40vh] md:h-[75vh] m-auto relative">
      <iframe
        class="lazy-iframe w-full h-full"
        data-src={videoUrl}
        title="YouTube video"
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      >
      </iframe>
    </div>
  );
};

export default LazyIframe;
