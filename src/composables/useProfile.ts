import { profileService } from '@/api/services/profileService';
import { ApiError } from '@/types/error/ApiError';
import type { Profile } from '@/types/types';
import { readonly, ref } from 'vue';

const profile = ref<Profile | null>(null);

export const useProfile = () => {
  const isLoading = ref(false);

  const fetchByUsername = async (username: string) => {
    isLoading.value = true;

    try {
      profile.value = await profileService.fetchByUsername(username);
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        profile.value = null;
      }
    } finally {
      isLoading.value = false;
    }
  };

  return {
    profile: readonly(profile),
    isLoading: readonly(isLoading),
    fetchByUsername
  };
};
