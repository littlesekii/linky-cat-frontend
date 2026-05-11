<script setup lang="ts">
import BaseButtonComponent from '@/components/common/BaseButtonComponent.vue';
import BaseConfirmationDialogComponent from '@/components/common/BaseConfirmationDialogComponent.vue';
import { useDashboard } from '@/composables/useDashboard';
import { useLink } from '@/composables/useLink';
import { utils } from '@/utils/utils';
import { onMounted, ref } from 'vue';
import DashboardLinkComponent from './link/DashboardLinkComponent.vue';
import DashboardLinkModalComponent from './link/DashboardLinkModalComponent.vue';
import type { LinkResponse, LinkUpdateRequest } from '@/types/dto/LinkDTO';

const { fetchDashboardLinks, dashboardLinks, isLoading } = useDashboard();
const { remove, update } = useLink();

onMounted(() => {
  fetchDashboardLinks();
});

const isProfileModalOpen = ref(false);
const isLinkModalOpen = ref(false);
const isLinkDeleteConfirmationOpen = ref(false);

const currentEditingLinkId = ref<string | undefined>('');
const currentEditingLink = ref<LinkUpdateRequest>();

const currentDeletingLinkId = ref('');

const errorMessage = ref('');

const openProfileModal = () => isProfileModalOpen.value = true;
const closeProfileModal = () => isProfileModalOpen.value = false;

const openLinkModal = () => isLinkModalOpen.value = true;
const closeLinkModal = () => {
  currentEditingLinkId.value = undefined;
  currentEditingLink.value = undefined;
  isLinkModalOpen.value = false;
};

const openLinkModalEdit = (field: 'title' | 'url', linkId: string, link: LinkResponse) => {
  currentEditingLinkId.value = linkId;
  currentEditingLink.value = link;
  isLinkModalOpen.value = true;
};

const openLinkDeleteConfirmation = (linkId: string) => {
  isLinkDeleteConfirmationOpen.value = true;
  currentDeletingLinkId.value = linkId;
};
const closeLinkDeleteConfirmation = () => isLinkDeleteConfirmationOpen.value = false;


async function onLinkModalSubmit() {
  await fetchDashboardLinks();
  closeLinkModal();
}

async function onLinkDelete() {
  await remove(currentDeletingLinkId.value);
  await fetchDashboardLinks();
  closeLinkDeleteConfirmation();
}

const onLinkChangeIsActive = async (linkId: string, isActive: boolean) => {
  await update(linkId, { isActive });
};

const debouncedChangeIsActive = utils.debounce(onLinkChangeIsActive, 600);

</script>

<template>
<section class="dashboard-section">
  <div class="dashboard-container">
    <h1 class="title">Links</h1>

    <BaseConfirmationDialogComponent
      v-if="isLinkDeleteConfirmationOpen"
      title="Delete Link?"
      confirm-text="Delete"
      @confirm="onLinkDelete"
      @close="closeLinkDeleteConfirmation"
    />
    <DashboardLinkModalComponent
      v-if="isLinkModalOpen"
      :link-id="currentEditingLinkId"
      :existing-data="currentEditingLink"
      @submit="onLinkModalSubmit"
      @close="closeLinkModal"
    />

    <BaseButtonComponent label="Add new" @click="openLinkModal"/>

    <DashboardLinkComponent
      v-for="link in dashboardLinks?.links"
      :key="link.id"
      :link="link"

      @delete="openLinkDeleteConfirmation(link.id ?? '')"
      @edit="(field) => openLinkModalEdit(field, link.id ?? '', link)"
      @change-is-active="(isActive) => debouncedChangeIsActive(link.id ?? '', isActive)"
    />
  </div>
  <!-- <div class="preview">
    <iframe src="http://localhost:2001/littlesekii"></iframe>
  </div> -->
</section>
</template>


<style scoped>
.dashboard-section {
  background-color: var(--color-highlight);
  overflow-y: auto;
}
.dashboard-container {
  padding: 30px;

  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.preview {
  padding: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-left: 1px solid var(--lc-white-mute);
}

.preview iframe {
  height: 70%;

  border: 1px solid var(--lc-white-mute);
  border-radius: 10px;
}

.title {
  color: var(--color-text);
  font-size: 24px;
  font-weight: 600;
}
</style>
