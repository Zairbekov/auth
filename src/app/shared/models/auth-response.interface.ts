export interface AuthResponse{
  data: AuthData,
  msg: string
}

interface AuthData{
  access_token: string
  expires_at: number
  token_type: string
}