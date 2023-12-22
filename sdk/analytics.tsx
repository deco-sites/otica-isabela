import type { AnalyticsEvent } from "apps/commerce/types.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import { Script } from "$store/components/Script.tsx";

export const sendEvent = <E extends AnalyticsEvent>(event: E) =>
  window.DECO.events.dispatch(event);

/**
 * This function is usefull for sending events on click. Works with both Server and Islands components
 */
export const SendEventOnClick = <E extends AnalyticsEvent>({ event, id }: {
  event: E;
  id: string;
}) => (
  <Script>
    <script
      src={scriptAsDataURI(
        (id: string, event: AnalyticsEvent) => {
          const elem = document.getElementById(id);

          if (!elem) {
            return console.warn(
              `Could not find element ${id}. Click event will not be send. This will cause loss in analytics`,
            );
          }

          elem.addEventListener("click", () => {
            window.DECO.events.dispatch(event);
          });
        },
        id,
        event,
      )}
    />
  </Script>
);

export const SendEventOnLoad = <E extends AnalyticsEvent>(
  { event }: { event: E },
) => (
  <Script>
    <script
      src={scriptAsDataURI(
        (_event: E) => {
          document.addEventListener("load", () => (
            window.DECO.events.dispatch(event)
          ));
        },
        event,
      )}
    />
  </Script>
);
