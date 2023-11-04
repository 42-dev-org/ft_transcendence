export type MediaConfig = {
  FILES: Map<string, number>;
};

export interface MediaFile {
  fieldname: string;
  originalname: string;
  mimetype: string;
  size: number;
  filename: string;
  path: string;
  buffer: Buffer;
  ext: string;
  filetype: string;
}
