import type { EmailVerificationSendRequest, EmailVerificationVerifyRequest } from '@/types/dto/EmailVerificationDTO';
import { api } from '../api';
import type { StandardResponse } from '@/types/dto/StandardDTO';

export const emailVerificationService = {
  send: async (req: EmailVerificationSendRequest) =>
    api.post<StandardResponse>('/api/email-verification/send', req),
  verify: async (req: EmailVerificationVerifyRequest) =>
    api.post<StandardResponse>('/api/email-verification/verify', req)
};
