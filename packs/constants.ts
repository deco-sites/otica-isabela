import { SortOption } from "apps/commerce/types.ts";
export const ISABELA_DIAS_SESSION_COOKIE =
  "IsabelaDias_LojaDeco_SessionCustomerKey";
export const ISABELA_DIAS_CLIENT_COOKIE = "IsabelaDias_Deco_CustomerCart";
export const ISABELA_DIAS_NAME_COOKIE = "IsabelaDias_Deco_SessionCustomerName";
export const ISABELA_DIAS_IMAGE_COOKIE =
  "IsabelaDias_Deco_SessionCustomerPhoto";
export const SORT_OPTIONS: SortOption[] = [
  {
    value: "none",
    label: "Relevância",
  },
  {
    value: "mais-vendidos",
    label: "Mais vendidos",
  },
  {
    value: "ofertas",
    label: "Ofertas",
  },
  {
    value: "menor-preco",
    label: "Menor preço",
  },
  {
    value: "nome",
    label: "Nome",
  },
];
export const RANGE_FILTERS = [17, 18, 19, 21];

export const DECO_CACHE_OPTION = "stale-while-revalidate";
