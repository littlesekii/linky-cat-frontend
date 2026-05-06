import type { LinkResponse } from './LinkDTO';

export interface DashboardLinksResponse {
  profileId: string,
  displayName: string,
  bio: string,
  links: LinkResponse[]
}
