export type Session = {
  SessionCustomer: SessionCustomer;
};

export type SessionCustomer = {
  Company: string;
  Customer: string;
  SessionCustomer_CartProduct: unknown[];
  IdSessionCustomer: number;
  IdCustomer: number;
  SessionKey: string;
  DateAdd: string;
  DateModified: string;
  IdCompany: number;
  Deadline: number;
  PrazoEntrega: number;
  ValueFreight: number;
  PostalCode: string;
  IdTypeFreight: number;
  IpPublic: string;
  IpTracking: string;
  HostNameTracking: string;
  CityTracing: string;
  RegionTracking: string;
  CountryTracking: string;
  LOCTracking: string;
  PostalCodeTracking: string;
  DateTracking: string;
  Foto: string;
  MedidasFotoTracker: string;
  EmailRecuperacaoCarrinho: boolean;
  EmailRecuperacaoCompra: boolean;
  SourceCliente: string;
};

export interface ProductData {
  Total: number;
  Pagina: number;
  Offset: number;
  produtos: Product[];
}

export interface Review {
  ratingValue: number;
  authorName: string;
  reviewDescription: string;
  authorCity: string;
  productName: string;
  productPhoto: string;
  productLink: string;
  additionalImage: string;
  memberLevel?: string;
}

export interface Product {
  IdProduct: number;
  IdCategoriaPai: number;
  IdCategoria: number;
  NomeCategoriaPai: string;
  NomeCategoria: string;
  QtdeEstoque: number;
  Nome: string;
  Codigo: string;
  Tamanho: string;
  DescricaoSeo?: string;
  KeywordsSeo: string;
  TituloSeo?: string;
  TagH1: string;
  TagH2: string;
  TagH3: string;
  IdSku: number;
  ValorOriginal: number;
  ValorDesconto: number;
  OfertaSeraLiberada: string;
  OfertaTermina: string;
  PorcentagemDesconto: number;
  ProdutosMaisCores: ColorVariants[];
  Paineis: Panels[];
  Imagens: Image[];
  ImagemExperimentador: string;
  UrlFriendlyColor: string;
  Classificacoes: ProductInfo[];
}

export interface ColorVariants {
  IdProduct: number;
  Nome: string;
  ValorOriginal: number;
  ValorDesconto: number;
  OfertaTermina: string;
  PorcentagemDesconto: number;
  Imagem: string;
  UrlFriendlyColor: string;
  Color1: string;
  Color2: string;
  Color3: string;
  NomeColor: string;
}

export interface Panels {
  IdTipoPainel: number;
  TipoPainel: string;
  Descricao: string;
}

export interface Image {
  Id: number;
  Imagem: string;
}

export interface ProductInfo {
  IdTipo: number;
  Tipo: string;
  Imagem?: string;
  TituloSeo: string;
  DescricaoSeo: string;
  TagH1: string;
  TagH2: string;
  TagH3: string;
  Nome: string;
  Cor?: string;
}

export interface Review {
  ratingValue: number;
  authorName: string;
  reviewDescription: string;
  authorCity: string;
  productName: string;
  productPhoto: string;
  productLink: string;
  additionalImage: string;
  memberLevel?: string;
}

export interface GetProductProps {
  /**
   * @title Term
   * @description Term to use on search */
  nome?: string;

  /**
   * @title Product IDs
   * @description Define several products IDs */
  id?: string[];

  /**
   * @title Collection
   * @description Search by collection ID */
  idColecaoProdutos?: number;

  /**
   * @title CategoryID
   * @description Search by category ID */
  IdCategoria?: number;

  /**
   * @title SubcategoryID
   * @description Search by subcategory ID */
  IdSubCategoria?: number;

  /**
   * @title Count
   * @description Limit quantity of items to display
   * @default 9
   */
  offset: number;

  /**
   * @title Dynamic filters
   * @description Define dinamic filters for the query. Example: Aro Fechado,Retangular */

  filtrosDinamicos?: DynamicFilter[];

  /**
   * @title isStopwatch
   * @description Only return products with promotions */
  somenteCronometrosAtivos?: boolean;

  /**
   * @title Sort
   * @description search sort parameter */
  ordenacao: "none" | "mais-vendidos" | "ofertas" | "menor-preco";

  /**
   * @title SLUG
   * @description search by product SLUG */
  url?: string;
}

export interface DynamicFilter {
  /**
   * @title Filter ID
   * @description The ID of the filter.
   */

  filterID: number;

  /**
   * @title Filter Value
   * @description The value of the filter.
   */

  filterValue: string;
}
