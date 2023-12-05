import type { Filter, ListItem, Seo } from "apps/commerce/types.ts";

export type Session = {
  SessionCustomer: SessionCustomer;
  SessionCustomerProducts: string;
  customer: string;
  QtdeProducts: number;
};

export type SessionCustomer = {
  IdSessionCustomer: number;
  IdCustomer: string;
  Customer: string;
  SessionKey: string;
  DateAdd: string;
  DateModified: string;
  IdCompany: number;
  Company: string;
  Deadline: number;
  PrazoEntrega: string;
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
  SessionCustomer_CartProduct: Product[];
};

export interface ProductData {
  Total: number;
  Pagina: number;
  Offset: number;
  produtos: Product[];
}

export interface Product {
  IdProduct: number;
  IdCategoriaPai: number;
  IdCategoria: number;
  NomeCategoriaPai: string;
  NomeCategoria: string;
  UrlFriendlyCategoriaPai: string;
  UrlFriendlyCategoria: string;
  QtdeEstoque: number;
  Nome: string;
  Codigo: string;
  Tamanho: string;
  DescricaoSeo?: string;
  KeywordsSeo: string;
  TituloSeo?: string;
  TagH1?: string;
  TagH2?: string;
  TagH3?: string;
  IdSku: number;
  ValorOriginal: number;
  ValorDesconto: number;
  ValorParcelamento?: string;
  OfertaSeraLiberada: string;
  OfertaTermina: string;
  OfertaFlag?: string;
  PorcentagemDesconto: number;
  ProdutosMaisCores: ColorVariants[];
  Paineis?: Panels[];
  Imagens: Image[];
  ImagemExperimentador: string;
  UrlFriendlyColor: string;
  Classificacoes: ProductInfo[];
  Avaliacoes: number;
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
  Video?: string;
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
   * @title Termo
   * @description Term a ser usado na pesquisa */
  nome?: string;

  /**
   * @title IDs dos Produtos
   * @description Inclua diversos IDs de produtos na busca */
  id?: string[];

  /**
   * @title ID da Coleção
   */
  idColecaoProdutos?: number;

  /**
   * @title ID da Categoria
   */
  IdCategoria?: number;

  /**
   * @title ID da Subcategoria
   */
  IdSubCategoria?: number;

  /**
   * @title Contagem
   * @description Limite de itens a serem retornados
   * @default 9
   */
  offset: number;

  /**
   * @title Filtros dinâmicos
   * @description Defina diversos filtros dinâmicos para a busca. Não é possível usá-los com o parâmetro "Termo" preenchido */

  filtrosDinamicos?: DynamicFilter[];

  /**
   * @title ApenasPromocoes
   */
  somenteCronometrosAtivos?: boolean;

  /**
   * @title Ordenação
   */
  ordenacao: "none" | "mais-vendidos" | "ofertas" | "menor-preco" | "nome";

  /**
   * @title SLUG
   * @description Busque pela SLUG de um produto */
  url?: string;

  /**
   * @title Pagina
   * @description Paginação dos produtos */
  page?: number;

  tipoRetorno: "simples" | "completo";
}

export interface DynamicFilter {
  /**
   * @title ID do Filtro.
   */

  filterID: number;

  /**
   * @title Valor
   */

  filterValue: string;
}

export interface Category {
  Id: number;
  Nome: string;
  IdCategoriaPai: number;
  CategoriaPai: Omit<Category, "IdCategoriaPai" | "CategoriaPai">;
  Title_SEO: string;
  PageKeywords_SEO?: string;
  PageDescription_SEO?: string;
  Description_SEO: string;
  UrlFriendly: string;
  TagH3: string;
  TagH2: string;
  TagH1: string;
  Descricao: string;
}

export interface APIDynamicFilters {
  IdTipo: number;
  NomeTipo: string;
  Nome: string;
  DescricaoSeo: string;
  TituloSeo: string;
  h1: string;
  h2: string;
  h3: string;
}

export interface ProductListiningPageProps {
  productsData: ProductData;
  baseURL: URL;
  pageType: "category" | "search";
  category?: Category;
  filtersApi?: APIDynamicFilters[];
  filtersUrl?: DynamicFilter[] | undefined;
  term?: string;
}

export interface PLPPageProps {
  itemListElement: ListItem<string>[];
  filters: Filter[] | [];
  seo: Seo;
}

export interface ProductsCart {
  IdProduct: number;
  Nome: string;
  ValorOriginal: number;
  ValorDesconto: number;
  OfertaSeraLiberada: string;
  OfertaTermina: string;
  PorcentagemDesconto: number;
  ProdutosMaisCores: ColorVariants[];
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
  Codigo: string;
  IdSku: number;
  Tamanho: string;
  DescricaoSeo?: string;
  KeywordsSeo?: string;
  TituloSeo?: string;
  TagH1?: string;
  TagH2?: string;
  TagH3?: string;
  Paineis?: Panels[];
  Imagens?: Image[];
  Classificacoes?: ProductInfo[];
}

export interface OrderForm {
  products: ProductsCart[];
}

export interface APIGetTestimonials {
  IdOrderProductComments: number;
  IdOrder: number;
  CommentsImgPath: string;
  Stars: number;
  NameCustomer: string;
  CustomerAddress: string;
  CommentsPhrase: string;
  Comments: string;
  UrlFriendly: string;
  ImagePath: string;
  NameProduct: string;
  StampImagePath: string;
  Index: number;
  IdProduto: number;
}

export interface APIAddNewsletter {
  wasShopperInserted: boolean;
}

export interface WishlistItem {
  IdProduct: number;
  Nome: string;
  ValorOriginal: number;
  ValorDesconto: number;
  OfertaSeraLiberada?: string;
  OfertaTermina?: string;
  PorcentagemDesconto: number;
  ProdutosMaisCores: ColorVariants[];
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
  Codigo: string;
  IdSku: number;
  Tamanho: string;
  DescricaoSeo?: string;
  KeywordsSeo?: string;
  TituloSeo?: string;
  TagH1?: string;
  TagH2?: string;
  TagH3?: string;
  Paineis?: string;
  Imagens?: string;
  Classificacoes?: ProductInfo[];
}

export interface AuthData {
  customerName?: string;
  customerImage?: string;
}
