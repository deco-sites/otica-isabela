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
  return properties?.filter((property) =>
    targetNames.some((targetName) => property?.value?.includes(targetName))
  )
    ?.map((property) => {
      const mappedName =
        nameMapping[property.name as keyof typeof nameMapping] || property.name;
      return { ...property, name: mappedName };
    });
};
