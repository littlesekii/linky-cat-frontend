import type { Profile } from '@/types/types';
import { api } from '../api';

export const profileService = {
  fetchByUsername: async (username: string) =>
    api.get<Profile>(`/api/profiles/${username}`)
};
