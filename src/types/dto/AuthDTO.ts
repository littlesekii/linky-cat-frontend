import type { UserResponse } from './UserDTO';

export interface AuthLoginRequest {
  username: string,
  password: string
}

export interface AuthLoginResponse {
  username: string,
  token: string
}

export interface AuthRegisterRequest {
  username: string,
  email: string,
  password: string,
  displayName: string,
  bio: string
}

export interface AuthRegisterResponse {
  user: UserResponse;
}
