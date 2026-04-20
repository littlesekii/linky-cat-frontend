import { authService } from '@/api/services/authService';
import { useAuthStore } from '@/stores/useAuthStore';
import type { AuthLoginRequest, AuthRegisterRequest } from '@/types/dto/AuthDTO';
import { readonly, ref } from 'vue';

export const useAuth = () => {
  const isLoading = ref(false);

  const authStore = useAuthStore();

  const login = async (req: AuthLoginRequest) => {
    isLoading.value = true;

    try {
      const response = await authService.login(req);
      authStore.setToken(response.token);
      window.location.replace('/dashboard');
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (req: AuthRegisterRequest) => {
    isLoading.value = true;

    try {
      await authService.register(req);
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    isLoading.value = true;

    try {
      authStore.setToken(null);
      window.location.replace('/login');
    } finally {
      isLoading.value = false;
    }
  };

  const checkUsername = async (username: string) => {
    isLoading.value = true;

    try {
      await authService.checkUsername(username);
    } finally {
      isLoading.value = false;
    }
  };

  const checkEmail = async (email: string) => {
    isLoading.value = true;

    try {
      await authService.checkEmail(email);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading: readonly(isLoading),
    login,
    register,
    logout,
    checkUsername,
    checkEmail
  };
};
