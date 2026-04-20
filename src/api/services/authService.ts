import type { AuthLoginRequest, AuthLoginResponse, AuthRegisterRequest, AuthRegisterResponse } from '@/types/dto/AuthDTO';
import { api } from '../api';
import type { StandardResponse } from '@/types/dto/StandardDTO';

export const authService = {
  login: async (req: AuthLoginRequest) =>
    api.post<AuthLoginResponse>('/api/auth/login', req),
  register: async (req: AuthRegisterRequest) =>
    api.post<AuthRegisterResponse>('/api/auth/register', req),
  checkUsername: async (username: string) =>
    api.get<StandardResponse>(`/api/auth/check-username?username=${username}`),
  checkEmail: async (email: string) =>
    api.get<StandardResponse>(`/api/auth/check-email?email=${email}`),
};
