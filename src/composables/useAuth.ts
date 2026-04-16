import { authService } from '@/api/services/authService';
import router from '@/router';
import { useAuthStore } from '@/stores/useAuthStore';
import type { AuthLoginRequest } from '@/types/dto/AuthDTO';
import { readonly, ref } from 'vue';

export const useAuth = () => {
  const isLoading = ref(false);

  const authStore = useAuthStore();

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

  const logout = async () => {
    isLoading.value = true;

    try {
      authStore.setToken(null);
      router.push('/login');
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading: readonly(isLoading),
    login,
    logout
  };
};
