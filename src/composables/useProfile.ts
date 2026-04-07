import { profileService } from '@/api/services/profileService';
import type { Profile } from '@/types/types';
import { readonly, ref } from 'vue';

const profile = ref<Profile | null>(null);
const isLoading = ref<boolean>(false);

export function useProfile () {
  const fetchByUsername = async (username: string) => {
    isLoading.value = true;

    try {
      profile.value = await profileService.fetchByUsername(username);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    profile: readonly(profile),
    isLoading: readonly(isLoading),
    fetchByUsername
  };
}
