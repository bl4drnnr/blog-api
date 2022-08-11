export interface Response {
  statusCode?: number;
  message?: string;
  data: Record<string, any>;
}
