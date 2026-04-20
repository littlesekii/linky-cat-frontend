import type { LinkResponse } from './LinkDTO';

export interface ProfileResponse {
  id?: string;
  displayName?: string;
  bio?: string;
  profileViews?: number;
  links?: LinkResponse[];
}
