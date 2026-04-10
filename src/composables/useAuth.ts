import { authService } from '@/api/services/authService';
import router from '@/router';
import { useAuthStore } from '@/stores/useAuthStore';
import type { AuthLoginRequest } from '@/types/dto/AuthDTO';
import { readonly, ref } from 'vue';

const isLoading = ref(false);

const authStore = useAuthStore();

export function useAuth() {
  const login = async (req: AuthLoginRequest) => {
    isLoading.value = true;

    try {
      const response = await authService.login(req);
      authStore.setToken(response.token);
      router.push('/dashboard');
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading: readonly(isLoading),
    login
  };
}
