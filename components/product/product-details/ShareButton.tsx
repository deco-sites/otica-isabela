import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";

interface Props {
  link: string;
}

function ShareButton({ link }: Props) {
  return (
    <button
      class="btn border-0 bg-transparent"
      onClick={() => navigator.share({ url: link })}
    >
      <Icon id="ShareButton" size={22} />
    </button>
  );
}

export default ShareButton;
