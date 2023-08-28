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
  ProdutosMaisCores: ProductColors[];
  Paineis: Pannels[];
  Imagens: Image[];
  ImagemExperimentador: string;
  UrlFriendlyColor: string;
  Classificacoes: ProductInfo[];
}

export interface ProductColors {
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

export interface Pannels {
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
