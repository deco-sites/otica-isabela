import { SortOption } from "apps/commerce/types.ts";
export const ISABELA_DIAS_SESSION_COOKIE = "IsabelaDias_SessionCustomerKey";
export const ISABELA_DIAS_CLIENT_COOKIE = "IsabelaDias_CustomerKey";
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
