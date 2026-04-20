import type { ProfileResponse } from './ProfileDTO';

export interface UserResponse {
  id?: string;
  username?: string;
  email?: string;
  profile?: ProfileResponse;
}
