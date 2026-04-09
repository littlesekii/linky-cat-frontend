import { defineStore } from 'pinia';
import { computed, readonly, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'));

  const isAuthenticated = computed(() => !!token.value);

  function setToken(newToken: string | null) {
    token.value = newToken;

    if (newToken === null)
      localStorage.removeItem('token');
    else
      localStorage.setItem('token', newToken);
  }

  return {
    token: readonly(token),
    setToken,
    isAuthenticated
  };

});
