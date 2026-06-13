import { profileService } from '@/api/services/profileService';
import type { ProfileResponse, ProfileUpdateRequest } from '@/types/dto/ProfileDTO';
import { ApiError } from '@/types/error/ApiError';
import { readonly, ref } from 'vue';

const profile = ref<ProfileResponse | null>(null);

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

  const update = async (profileId: string, req: ProfileUpdateRequest) => {
    isLoading.value = true;

    try {
      await profileService.update(profileId, req);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    profile: readonly(profile),
    isLoading: readonly(isLoading),
    fetchByUsername,
    update
  };
};
