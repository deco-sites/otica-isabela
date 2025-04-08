import Icon from "$store/components/ui/Icon.tsx";
import type {
  GlassesIcons,
  ResourceIcons,
  UtilityIcons,
} from "$store/components/ui/Icon.tsx";

type Icons = UtilityIcons | ResourceIcons | GlassesIcons;

interface TextLine {
  /** @title Texto */
  text?: string;
  /** @title Familia da Fonte */
  fontFamily?: "Bebas Neue" | "Roboto";
  /** @title Peso da Fonte */
  fontWeight?: "normal" | "medium" | "semi-bold" | "bold";
  /** @title Tamanho da Fonte */
  fontSize?: {
    mobile?: "muito pequeno" | "pequeno" | "normal" | "grande" | "muito grande";
    desktop?:
      | "muito pequeno"
      | "pequeno"
      | "normal"
      | "grande"
      | "muito grande";
  };
  /**
   * @format color
   * @title Cor da Fonte
   */
  color?: string;
}

export interface Props {
  /** @title Primeira linha */
  firstLine: TextLine;
  /** @title Segunda linha */
  secondLine: TextLine;
  textAlignment?: "centro" | "começo";
  /**
   * @format color
   * @title Cor de fundo
   */
  backgroundColor?: string;
  /**
   * @title Icone
   * @description Escolha o tipo do icone e depois qual icone exibir
   */
  icon?: Icons;
  /** @title Esconder icone */
  hideIcon?: boolean;
  /** @title Tamanho do icone */
  iconSize?: {
    /** @title Largura do icone */
    width?: number;
    /** @title Altura do icone */
    height?: number;
  };
}

const ALIGNMENTS = {
  centro: "items-center",
  "começo": "items-start",
} as const;

const FONT_WEIGHTS = {
  "normal": 400,
  "medium": 500,
  "semi-bold": 600,
  "bold": 700,
} as const;

const FONT_FAMILIES = {
  "Bebas Neue": "font-outfit",
  "Roboto": "",
} as const;

const FONT_SIZES = {
  "muito pequeno": "text-xl",
  "pequeno": "text-2xl",
  "normal": "text-3xl",
  "grande": "text-5xl",
  "muito grande": "text-6xl",
} as const;

const FONT_SIZES_DESKTOP = {
  "muito pequeno": "lg:text-xl",
  "pequeno": "lg:text-2xl",
  "normal": "lg:text-3xl",
  "grande": "lg:text-5xl",
  "muito grande": "lg:text-6xl",
} as const;

export const HeaderTitle = ({
  firstLine,
  secondLine,
  textAlignment = "centro",
  backgroundColor = "#F8F8F8",
  icon,
  hideIcon,
  iconSize,
}: Props) => {
  return (
    <div
      style={{ backgroundColor }}
      class={`w-full font flex flex-col justify-center items-center pt-10 pb-10 `}
    >
      <h2
        class={`flex flex-col ${ALIGNMENTS[textAlignment]} justify-center`}
      >
        {firstLine
          ? (
            <span
              style={{
                color: firstLine.color,
                fontWeight: FONT_WEIGHTS[firstLine.fontWeight ?? "normal"],
              }}
              class={`flex items-center justify-start ${
                FONT_FAMILIES[firstLine.fontFamily ?? "Roboto"]
              } ${FONT_SIZES[firstLine.fontSize?.mobile ?? "muito pequeno"]}
          ${
                FONT_SIZES_DESKTOP[
                  firstLine.fontSize?.desktop ?? "muito pequeno"
                ]
              } gap-x-2`}
            >
              {firstLine.text}
              {!hideIcon && icon && iconSize
                ? (
                  <Icon
                    width={iconSize.width ?? 65}
                    height={iconSize.height ?? 34}
                    id={icon}
                  />
                )
                : null}
            </span>
          )
          : null}

        {secondLine
          ? (
            <span
              style={{
                color: secondLine.color,
                fontWeight: FONT_WEIGHTS[secondLine.fontWeight ?? "normal"],
              }}
              class={`text-black ${
                FONT_FAMILIES[secondLine.fontFamily ?? "Roboto"]
              }
          ${FONT_SIZES[secondLine.fontSize?.mobile ?? "grande"]}
          lg:${FONT_SIZES[secondLine.fontSize?.desktop ?? "muito grande"]}
          `}
            >
              {secondLine.text}
            </span>
          )
          : null}
      </h2>
    </div>
  );
};
