import type { LinkCreateRequest, LinkReorderRequest, LinkResponse, LinkUpdateRequest } from '@/types/dto/LinkDTO';
import { api } from '../api';

export const linkService = {
  create: async (req: LinkCreateRequest) =>
    api.post<LinkResponse>('/api/links', req),
  update: async (linkId: string, req: LinkUpdateRequest) =>
    api.patch<LinkResponse>(`/api/links/${linkId}`, req),
  reorder: async (req: LinkReorderRequest[]) =>
    api.patch<LinkResponse>('/api/links/reorder', req),
  delete: async (linkId: string) =>
    api.delete<void>(`/api/links/${linkId}`)
};
