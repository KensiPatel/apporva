export interface User {
  id: string
  email: string
  fullName: string
}

export interface AuthResponse {
  user: User
  message?: string
}
