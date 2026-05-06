import type { DashboardLinksResponse } from '@/types/dto/DashboardDTO';
import { api } from '../api';

export const dashboardService = {
  fetchDashboardLinks: async () =>
    api.get<DashboardLinksResponse>('/api/dashboard/links')
};
