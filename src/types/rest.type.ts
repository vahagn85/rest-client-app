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

export type CodeLanguage = {
  value: string;
  key: string;
  label: string;
  client?: string;
};

export interface RequestRest {
  user_id: string;
  created_at: string;
  endpoint_url: string;
  request_method: string;
  request_size: number;
  response_size: number;
  response_status: number;
  request_duration: number;
  error_details?: string | null;
  route: string;
}
