export interface TokenPayload {
  id: string;
  type: string;
  userId: string;
}

export interface TokenError {
  message: string;
}
