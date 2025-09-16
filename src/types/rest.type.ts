export interface HeaderField {
  key: string;
  value: string;
}
export interface RestForm {
  url: string;
  method: string;
  body?: string;
  headers: HeaderField[];
}
