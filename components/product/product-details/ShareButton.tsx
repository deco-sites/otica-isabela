import Icon from "site/components/ui/Icon.tsx";

interface Props {
  link: string;
}

function ShareButton({ link }: Props) {
  if (!window || typeof window === "undefined") return null;

  return (
    <button
      aria-label="Share"
      class="btn border-0 bg-transparent"
      onClick={() => navigator.share({ url: link })}
    >
      <Icon id="ShareButton" size={22} style={{ color: "black" }} />
    </button>
  );
}

export default ShareButton;
