export interface IPowerbiDownload {
  url: string;
  name: string;
}

export type Powerbi = {
  _id: string;
  categoria: string;
  seccion: string;
  name: string;
  url: string;
  download?: IPowerbiDownload;
  tags?: string[];
};

export interface PropsPowerBi {
  categoria: string;
  seccion: string;
}
