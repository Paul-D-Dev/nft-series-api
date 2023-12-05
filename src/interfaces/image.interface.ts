export interface Image {
  id: number;
  src: string;
  alt: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface ImageJSON {
  id: number;
  src: string;
  alt: string;
}
