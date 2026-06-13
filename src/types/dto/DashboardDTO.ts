import type { LinkResponse } from './LinkDTO';

export interface DashboardLinksResponse {
  profileId: string,
  displayName: string,
  bio: string,
  imageUrl: string,
  links: LinkResponse[]
}
