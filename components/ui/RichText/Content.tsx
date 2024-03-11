export interface Props {
  content: string;
  maxWidth?: string;
  maxWidthMobile?: string;
  isSeeMore?: boolean;
}

export default function Content({
  maxWidth,
  maxWidthMobile,
  content,
  isSeeMore = false,
}: Props) {
  return (
    <div
      style={{ "--d-mw": maxWidth, "--m-mw": maxWidthMobile }}
      class={
        (isSeeMore ? "peer-checked:block hidden " : "peer-checked:hidden ") +
        "max-w-[var(--m-mw)] md:max-w-[var(--d-mw)] [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6" +
        " pt-[var(--t-m-pt)] pr-[var(--t-m-pr)] pb-[var(--t-m-pb)] pl-[var(--t-m-pl)]" +
        " md:pt-[var(--t-d-pt)] md:pr-[var(--t-d-pr)] md:pb-[var(--t-d-pb)] md:pl-[var(--t-d-pl)]"
      }
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
