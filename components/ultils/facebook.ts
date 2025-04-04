type FBEventType =
  | "PageView"
  | "ViewContent"
  | "Search"
  | "AddToCart"
  | "InitiateCheckout"
  | "AddPaymentInfo"
  | "Purchase"
  | "Lead"
  | "CompleteRegistration";

type FBEventData<T extends FBEventType> = T extends "PageView" ? {}
  : T extends "ViewContent" ? {
      content_ids: string[];
      content_type?: string;
      value?: number;
      currency?: string;
    }
  : T extends "Search" ? { search_string: string }
  : T extends "AddToCart" | "InitiateCheckout" | "AddPaymentInfo" ? {
      content_ids: string[];
      content_type?: string;
      value?: number;
      currency?: string;
    }
  : T extends "Purchase" ? {
      content_ids: string[];
      content_type?: string;
      value: number;
      currency: string;
    }
  : T extends "Lead" | "CompleteRegistration" ? { value?: string }
  : never;

declare function fbq<T extends FBEventType>(
  type: "track",
  event: string,
  data?: FBEventData<T>,
): void;

export function sendFBEvent<T extends FBEventType>(
  eventName: T,
  eventData: FBEventData<T>,
): void {
  fbq("track", eventName, eventData);
}
