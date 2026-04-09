import type { AuthLoginRequest, AuthLoginResponse } from '@/types/dto/AuthDTO';
import { api } from '../api';

export const authService = {
  login: async (req: AuthLoginRequest) =>
    api.post<AuthLoginResponse>('/api/auth/login', req)
};
