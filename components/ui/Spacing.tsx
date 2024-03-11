interface Props {
  mobile: number;
  desktop: number;
}

export default function Spacing({ mobile, desktop }: Props) {
  return (
    <div
      style={{ "--m-space": `${mobile}px`, "--d-space": `${desktop}px` }}
      class="pt-[var(--m-space)] md:pt-[var(--d-space)]"
    />
  );
}
