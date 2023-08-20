export type Session = {
  SessionCustomer: SessionCustomer;
};

export type SessionCustomer = {
  Company: string;
  Customer: string;
  SessionCustomer_CartProduct: [];
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

export type Products = Product[];

export type Product = {
  IdProduct: number;
  Nome: string;
  ValorOriginal: number;
  ValorDesconto: number;
  OfertaSeraLiberada: string;
  OfertaTermina: string;
  PorcentagemDesconto: number;
  ProdutosMaisCores: productColors[];
  Imagem: string;
  ImagemExperimentador: string;
  UrlFriendlyColor: string;
  Altura: string;
  Largura: string;
  Ponte: string;
  Hastes: string;
  FrenteTotal: string;
  Aro: string;
  ArmacaoGratis: boolean;
  ValorArmacaoSeComprarLentes: number;
};

export type productColors = {
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
};
