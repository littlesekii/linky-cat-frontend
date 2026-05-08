<script setup lang="ts">
import BaseButtonComponent from '@/components/common/BaseButtonComponent.vue';
import { useDashboard } from '@/composables/useDashboard';
import { useLink } from '@/composables/useLink';
import { onMounted, ref } from 'vue';
import DashboardLinkComponent from './link/DashboardLinkComponent.vue';
import DashboardLinkModalComponent from './link/DashboardLinkModalComponent.vue';
import { utils } from '@/utils/utils';

const { fetchDashboardLinks, dashboardLinks, isLoading } = useDashboard();
const { remove, update } = useLink();

onMounted(() => {
  fetchDashboardLinks();
});

const isProfileModalOpen = ref(false);
const isLinkModalOpen = ref(false);

const errorMessage = ref('');

const openProfileModal = () => isProfileModalOpen.value = true;
const closeProfileModal = () => isProfileModalOpen.value = false;
const openLinkModal = () => isLinkModalOpen.value = true;
const closeLinkModal = () => isLinkModalOpen.value = false;

async function onLinkModalSubmit() {
  await fetchDashboardLinks();
  closeLinkModal();
}

async function onLinkDelete(linkId: string) {
  await remove(linkId);
  await fetchDashboardLinks();
}

const onLinkChangeIsActive = async (linkId: string, isActive: boolean) => {
  await update(linkId, { isActive });
};

const debouncedChangeIsActive = utils.debounce(onLinkChangeIsActive, 500);

</script>

<template>
<section class="dashboard-section">
  <div class="dashboard-container">
    <h1 class="title">Links</h1>

    <DashboardLinkModalComponent v-if="isLinkModalOpen" @submit="onLinkModalSubmit" @close="closeLinkModal" />

    <BaseButtonComponent label="Add new" @click="openLinkModal"/>

    <DashboardLinkComponent
      v-for="link in dashboardLinks?.links"
      :key="link.id"
      :link="link"

      @delete="onLinkDelete(link.id ?? '')"
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
