import { emailVerificationService } from '@/api/services/emailVerificationService';
import type { EmailVerificationSendRequest, EmailVerificationVerifyRequest } from '@/types/dto/EmailVerificationDTO';
import { readonly, ref } from 'vue';

export const useEmailVerification = () => {
  const isLoading = ref(false);

  const send = async (req: EmailVerificationSendRequest) => {
    isLoading.value = true;

    try {
      await emailVerificationService.send(req);
    } finally {
      isLoading.value = false;
    }
  };

  const verify = async (req: EmailVerificationVerifyRequest) => {
    isLoading.value = true;

    try {
      await emailVerificationService.verify(req);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading: readonly(isLoading),
    send,
    verify
  };
};
