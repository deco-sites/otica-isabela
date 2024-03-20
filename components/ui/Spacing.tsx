interface Props {
  mobile: number;
  desktop: number;
}

export default function Spacing({ mobile, desktop }: Props) {
  if (typeof mobile !== "number" || typeof desktop !== "number") {
    return (
      <div>
        <p>Componente para adicionar espaçamento entre as outras seções</p>
      </div>
    );
  }

  return (
    <div
      style={{ "--m-space": `${mobile}px`, "--d-space": `${desktop}px` }}
      class="pt-[var(--m-space)] md:pt-[var(--d-space)]"
    />
  );
}
