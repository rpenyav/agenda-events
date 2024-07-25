export interface Eventos {
  codi: string;
  data_inici: string;
  data_fi: string;
  denominaci: string;
  descripcio: string;
  horari: string;
  subt_tol: string;
  entrades: string;
  tags_mbits: string;
  tags_categor_es: string;
  enlla_os: string;
  imatges: string;
  adre_a: string;
  comarca_i_municipi: string;
  espai: string;
  latitud: string;
  longitud: string;
  imgapp: string;
  descripcio_html: string;
  municipi: string;
  comarca: string;
  tel_fon: string;
  email: string;
  url: string;
}

export const eventKeys = [
  "denominaci",
  "descripcio",
  "tags_mbits",
  "tags_categor_es",
  "municipi",
  "comarca",
] as const;

export type EventKey = (typeof eventKeys)[number];
