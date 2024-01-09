import { PropertyValue } from "apps/commerce/types.ts";

const targetNames = [
  "Altura da Lente",
  "Largura da Lente",
  "Largura da Ponte",
  "Hastes",
  "Frente Total",
  "Aro",
] as const;

const nameMapping = {
  "Altura da Lente": "Altura",
  "Largura da Lente": "Largura",
  "Largura da Ponte": "Ponte",
  "Frente Total": "Frente",
} as const;

export const getDescriptions = (properties: PropertyValue[]) => {
  if (!properties.length) return [];

  return targetNames.map((name) => {
    const match = properties.find((prop) => prop?.value?.includes(name));

    if (!match) return null;

    return {
      ...match,
      value: nameMapping[match?.value as keyof typeof nameMapping] ||
        match?.value,
      name: match?.name,
    };
  }).filter((item) => Boolean(item));
};
