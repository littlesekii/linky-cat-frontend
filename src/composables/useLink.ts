import { linkService } from '@/api/services/linkService';
import type { LinkCreateRequest, LinkReorderRequest, LinkUpdateRequest } from '@/types/dto/LinkDTO';
import { readonly, ref } from 'vue';


export const useLink = () => {
  const isLoading = ref(false);

  const create = async (req: LinkCreateRequest) => {
    isLoading.value = true;

    try {
      await linkService.create(req);
    } finally {
      isLoading.value = false;
    }
  };

  const update = async (linkId: string, req: LinkUpdateRequest) => {
    isLoading.value = true;

    try {
      await linkService.update(linkId, req);
    } finally {
      isLoading.value = false;
    }
  };

  const reorder = async (req: LinkReorderRequest[]) => {
    isLoading.value = true;

    try {
      await linkService.reorder(req);
    } finally {
      isLoading.value = false;
    }
  };

  const remove = async (linkId: string) => {
    isLoading.value = true;

    try {
      await linkService.delete(linkId);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading: readonly(isLoading),
    create,
    update,
    reorder,
    remove
  };
};
