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
