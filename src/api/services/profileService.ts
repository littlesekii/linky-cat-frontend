import type { ProfileResponse, ProfileUpdateRequest } from '@/types/dto/ProfileDTO';
import { api } from '../api';

export const profileService = {
  fetchByUsername: async (username: string) =>
    api.get<ProfileResponse>(`/api/profiles/${username}`),
  update: async (profileId: string, req: ProfileUpdateRequest) =>
    api.patch<ProfileResponse>(`/api/profiles/${profileId}`, req)
};
