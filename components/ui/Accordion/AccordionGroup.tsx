import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import { useId } from "deco-sites/otica-isabela/sdk/useId.ts";
import { ComponentChildren } from "preact";

interface HtmlChild {
  type: "html";
  title: string;
  content: string;
}

interface AccordionChild {
  type: "accordion";
  title: string;
  content: string;
}

/**
 * @title {{title}}
 */
interface Child {
  type: "accordion" | "html";
  title: string;
  /**
   * @format html
   */
  content: string;
}

/**
 * @title {{title}}
 */
interface Accordion {
  title: string;
  children: Child[];
}

interface WrapperProps {
  /**
   * @ignore
   */
  children?: ComponentChildren;
  /**
   * @ignore
   */
  isDeep?: boolean;
  header?: string;
  /**
   * @format color
   * @default #ffffff
   */
  backgroundColor?: string;
  /**
   * @default 12
   */
  paddingTop?: number;
  /**
   * @default 0
   */
  paddingRight?: number;
  /**
   * @default 12
   */
  paddingBottom?: number;
  /**
   * @default 0
   */
  paddingLeft?: number;
  style?: "default" | "alternative" | "alternative 2";
}

interface Props {
  contents?: Accordion[];
  style?: WrapperProps;
  /**
   * @ignore
   */
  __c?: Child[];
}

function CloseButton({ id }: { id: string }) {
  return (
    <label
      htmlFor={`close-${id}`}
      class="cursor-pointer col-start-1 row-start-1 hidden peer-checked/open:block z-10"
    />
  );
}

function OpenButton({ id, index }: { id: string; index: number }) {
  return (
    <label
      htmlFor={`open-${id}-${index}`}
      style={{ display: "var(--close-all, block)" }}
      class="cursor-pointer col-start-1 row-start-1 peer-checked/open:!hidden z-10"
    />
  );
}

function CloseRadioState({ id }: { id: string }) {
  return (
    <input
      type="radio"
      id={`close-${id}`}
      name={id}
      class="peer/close hidden"
    />
  );
}

function OpenRadioState({ id, index }: { id: string; index: number }) {
  return (
    <input
      type="radio"
      id={`open-${id}-${index}`}
      name={id}
      class="peer/open hidden"
    />
  );
}

function RenderHtml({ content }: { content: string }) {
  return (
    <div class="px-4 pb-4" dangerouslySetInnerHTML={{ __html: content }} />
  );
}

const isHtmlChild = (item: Child | Accordion): item is HtmlChild =>
  !isAccordion(item) && item.type === "html";
const isAccordion = (item: Child | Accordion): item is Accordion =>
  "children" in item;

function Wrapper({
  children,
  backgroundColor = "white",
  header,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  isDeep,
}: WrapperProps) {
  if (isDeep) {
    return <>{children}</>;
  }

  return (
    <div style={{ backgroundColor }}>
      <div
        style={{
          paddingTop: paddingTop ? `${paddingTop}px` : undefined,
          paddingRight: paddingRight ? `${paddingRight}px` : undefined,
          paddingBottom: paddingBottom ? `${paddingBottom}px` : undefined,
          paddingLeft: paddingLeft ? `${paddingLeft}px` : undefined,
        }}
        class="container"
      >
        {header && (
          <div class="py-4">
            <h2 class="text-2xl md:text-4xl font-bold">{header}</h2>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

const contentExample = [
  {
    title: "Example",
    children: [
      { type: "html" as const, title: "Example", content: "<p>Example</p>" },
    ],
  },
  {
    title: "Example",
    children: [
      { type: "html" as const, title: "Example", content: "<p>Example</p>" },
    ],
  },
  {
    title: "Example",
    children: [
      { type: "html" as const, title: "Example", content: "<p>Example</p>" },
    ],
  },
];

// Good luck to the next developer who will maintain this code
export default function AccordionGroup({
  contents = contentExample,
  __c,
  style: _style,
}: Props) {
  const id = useId();

  const __cc = __c?.length ? __c : contents;
  const isDeep = !!__c?.length;

  const { style = "default", ...wrapperProps } = _style || {};

  return (
    <Wrapper {...wrapperProps} isDeep={isDeep}>
      {__cc.map((content, index) =>
        isHtmlChild(content) ? (
          <RenderHtml content={content.content} />
        ) : (
          <>
            {/* This is used to close all accordions at once */}
            <CloseRadioState id={id} />
            <div
              key={index}
              class={
                "peer-checked/close:[--close-all:hidden] grid grid-rows-[auto_0fr] [&:has(>input[type='radio']:checked)]:grid-rows-[auto_1fr] transition-[grid-template-rows] duration-200 overflow-hidden relative group border-t border-gray-300" +
                (!isDeep ? " last-of-type:border-b container" : "")
              }
            >
              {/* This is used to check if our accordion is open or not */}
              <OpenRadioState id={id} index={index} />
              {/* Close button is visible after we click on the open button */}
              <CloseButton id={id} />
              {/* Open button is visible by default */}
              <OpenButton id={id} index={index} />
              <div
                class={
                  "w-full min-h-14 h-fit col-start-1 row-start-1 cursor-pointer flex gap-3 items-center p-4" +
                  (isDeep
                    ? " peer-checked/open:underline md:text-lg text-zinc-800 peer-checked/open:text-black peer-checked/open:font-medium"
                    : " font-medium text-xl") +
                  (style === "default"
                    ? " peer-checked/open:[--closed-icon-visibility:none] peer-checked/open:[--opened-icon-visibility:block]"
                    : style === "alternative"
                    ? " peer-checked/open:[--icon-rotate:180deg] justify-between"
                    : style === "alternative 2"
                    ? " peer-checked/open:[--icon-rotate:180deg] justify-start"
                    : "")
                }
              >
                {isDeep ? (
                  <></>
                ) : style === "default" ? (
                  <>
                    <Icon
                      id="Plus"
                      size={18}
                      strokeWidth={3}
                      class="text-gray-400"
                      style={{
                        display: "var(--closed-icon-visibility, block)",
                      }}
                    />
                    <Icon
                      id="Minus"
                      size={18}
                      strokeWidth={3}
                      class="text-gray-400"
                      style={{ display: "var(--opened-icon-visibility, none)" }}
                    />
                  </>
                ) : (
                  <Icon
                    id="ChevronDown"
                    size={18}
                    strokeWidth={3}
                    class="transition-all order-2 shrink-0"
                    style={{ rotate: "var(--icon-rotate, 0deg)" }}
                  />
                )}
                <h2>{content.title}</h2>
              </div>
              <div class="invisible col-start-1 row-start-2 min-h-0 peer-checked/open:visible peer-checked/open:min-h-fit transition-all">
                {isAccordion(content) ? (
                  <AccordionGroup __c={content.children} />
                ) : (
                  <RenderHtml content={content.content} />
                )}
              </div>
            </div>
          </>
        )
      )}
    </Wrapper>
  );
}
