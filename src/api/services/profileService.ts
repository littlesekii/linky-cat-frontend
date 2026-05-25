import type { Profile } from '@/types/types';
import { api } from '../api';
import type { ProfileResponse, ProfileUpdateRequest } from '@/types/dto/ProfileDTO';

export const profileService = {
  fetchByUsername: async (username: string) =>
    api.get<Profile>(`/api/profiles/${username}`),
  update: async (profileId: string, req: ProfileUpdateRequest) =>
    api.patch<ProfileResponse>(`/api/profiles/${profileId}`, req)
};
