import type { JSX } from "preact";
import { useId } from "preact/hooks";

export default function (_id?: string) {
  const id = _id ?? useId();

  return {
    Toggle: (props: JSX.HTMLAttributes<HTMLLabelElement>) => (
      <label for={id} {...props} />
    ),
    Modal: (props: JSX.HTMLAttributes<HTMLDivElement>) => (
      <>
        <input type="checkbox" id={id} class="peer hidden" />
        <div {...props} class={`${props.class} hidden peer-checked:flex`} />
      </>
    ),
  };
}
