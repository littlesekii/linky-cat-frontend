import { dashboardService } from '@/api/services/dashboardService';
import type { DashboardLinksResponse } from '@/types/dto/DashboardDTO';
import { ApiError } from '@/types/error/ApiError';
import { readonly, ref } from 'vue';

const dashboardLinks = ref<DashboardLinksResponse | null>(null);

export const useDashboard = () => {
  const isLoading = ref(false);

  const fetchDashboardLinks = async () => {
    isLoading.value = true;

    try {
      dashboardLinks.value = await dashboardService.fetchDashboardLinks();
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        dashboardLinks.value = null;
      }
    } finally {
      isLoading.value = false;
    }
  };

  return {
    dashboardLinks: readonly(dashboardLinks),
    isLoading: readonly(isLoading),
    fetchDashboardLinks
  };
};
