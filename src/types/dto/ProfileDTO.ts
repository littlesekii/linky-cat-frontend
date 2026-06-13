import type { LinkResponse } from './LinkDTO';

export interface ProfileResponse {
  id?: string;
  displayName?: string;
  bio?: string;
  profileViews?: number;
  imageUrl?: string;
  links?: LinkResponse[];
}

export interface ProfileUpdateRequest {
  displayName?: string;
  bio?: string;
}
