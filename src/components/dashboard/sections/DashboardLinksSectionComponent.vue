<script setup lang="ts">
import BaseButtonComponent from '@/components/common/BaseButtonComponent.vue';
import BaseConfirmationDialogComponent from '@/components/common/BaseConfirmationDialogComponent.vue';
import { useDashboard } from '@/composables/useDashboard';
import { useLink } from '@/composables/useLink';
import type { LinkReorderRequest, LinkResponse } from '@/types/dto/LinkDTO';
import type { ProfileResponse } from '@/types/dto/ProfileDTO';
import { utils } from '@/utils/utils';
import { nextTick, onMounted, ref, useTemplateRef, watch } from 'vue';
import draggableComponent from 'vuedraggable';
import DashboardLinksLinkComponent from './links/DashboardLinksLinkComponent.vue';
import DashboardLinksLinkModalComponent from './links/DashboardLinksLinkModalComponent.vue';
import DashboardLinksProfileComponent from './links/DashboardLinksProfileComponent.vue';
import DashboardLinksProfileImageModalComponent from './links/DashboardLinksProfileImageModalComponent.vue';
import DashboardLinksProfileModalComponent from './links/DashboardLinksProfileModalComponent.vue';


const { fetchDashboardLinks, dashboardLinks, isLoading } = useDashboard();
const { remove, update, reorder } = useLink();

onMounted( async () => {
  await fetchDashboardLinks();
  console.log(dashboardLinks.value);
});

const localLinks = ref<LinkResponse[]>([]);
watch(() => dashboardLinks.value,
  (newValue) => {
    if (newValue) {
      localLinks.value = [...newValue.links];
    }
  },
  { immediate: true}
);

const isProfileModalOpen = ref(false);
const isProfileImageModalOpen = ref(false);
const isLinkModalOpen = ref(false);
const isLinkDeleteConfirmationOpen = ref(false);

const linkModal = useTemplateRef('link-modal');
const profileModal = useTemplateRef('profile-modal');
const profileImageModal = useTemplateRef('profile-image-modal');

const currentDeletingLinkId = ref('');

const errorMessage = ref('');

const openProfileModal = () => isProfileModalOpen.value = true;
const openProfileModalEdit = async (profileId: string, profile: ProfileResponse, field: 'displayName' | 'bio' ) => {
  openProfileModal();
  await nextTick();
  profileModal.value?.prepareModalEdit(profileId, profile, field);
};
const closeProfileModal = () => isProfileModalOpen.value = false;

const openProfileImageModal = () => isProfileImageModalOpen.value = true;
const openProfileImageModalEdit = async (profileId: string, image: File) => {
  openProfileImageModal();
  await nextTick();
  profileImageModal.value?.prepareModalEdit(profileId, image);
};
const closeProfileImageModal = () => isProfileImageModalOpen.value = false;

const openLinkModal = () => isLinkModalOpen.value = true;
const openLinkModalCreate = async () => {
  openLinkModal();
  await nextTick();
  linkModal.value?.prepareModalCreate();
};
const openLinkModalEdit = async (linkId: string, link: LinkResponse, field: 'title' | 'url') => {
  openLinkModal();
  await nextTick();
  linkModal.value?.prepareModalEdit(linkId, link, field);
};
const closeLinkModal = () => isLinkModalOpen.value = false;

const openLinkDeleteConfirmation = (linkId: string) => {
  isLinkDeleteConfirmationOpen.value = true;
  currentDeletingLinkId.value = linkId;
};
const closeLinkDeleteConfirmation = () => isLinkDeleteConfirmationOpen.value = false;

async function onProfileModalSubmit() {
  await fetchDashboardLinks();
  closeProfileModal();
}

async function onProfileImageModalSubmit() {
  await fetchDashboardLinks();
  closeProfileImageModal();
}

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

const onLinkOrderChange = async () => {

  const body: LinkReorderRequest[] = [];
  for(let i: number = 0; i < localLinks.value.length; i++) {
    const currentId = localLinks.value[localLinks.value.length - 1 - i]?.id;
    body.push({
      id: currentId,
      sortOrder: i
    });
  }

  await reorder(body);
};

const debouncedChangeIsActive = utils.debounce(onLinkChangeIsActive, 600);

</script>

<template>
<section class="section-wrapper">
  <!-- <header class="section-header">
    <h1 class="title">Links</h1>
  </header> -->

  <div class="section-container">

    <DashboardLinksLinkModalComponent
      v-if="isLinkModalOpen"
      ref="link-modal"
      @submit="onLinkModalSubmit"
      @close="closeLinkModal"
    />
    <DashboardLinksProfileModalComponent
      v-if="isProfileModalOpen"
      ref="profile-modal"
      @submit="onProfileModalSubmit"
      @close="closeProfileModal"
    />
    <DashboardLinksProfileImageModalComponent
      v-if="isProfileImageModalOpen"
      ref="profile-image-modal"
      @submit="onProfileImageModalSubmit"
      @close="closeProfileImageModal"
    />
    <BaseConfirmationDialogComponent
      v-if="isLinkDeleteConfirmationOpen"
      title="Delete link?"
      confirm-text="Delete"
      @confirm="onLinkDelete"
      @close="closeLinkDeleteConfirmation"
    />

    <DashboardLinksProfileComponent
      :profile="{ displayName: dashboardLinks?.displayName, bio: dashboardLinks?.bio, imageUrl: dashboardLinks?.imageUrl }"
      @edit="(field) => openProfileModalEdit(
        dashboardLinks?.profileId ?? '',
        { displayName: dashboardLinks?.displayName, bio: dashboardLinks?.bio },
         field)"
      @change-profile-image="(image) => openProfileImageModalEdit(dashboardLinks?.profileId ?? '', image)"
    />

    <BaseButtonComponent label="Add new" @click="openLinkModalCreate"/>

    <draggableComponent
      v-model="localLinks"
      item-key="id"
      handle=".drag-handle"

      class="links-container"
      :animation="260"
      @end="onLinkOrderChange"
    >
      <template #item="{element: link}">
        <DashboardLinksLinkComponent
          :link="link"

          @delete="openLinkDeleteConfirmation(link.id ?? '')"
          @edit="(field) => openLinkModalEdit(link.id ?? '', link, field)"
          @change-is-active="(isActive) => debouncedChangeIsActive(link.id ?? '', isActive)"
        />
      </template>
    </draggableComponent>
  </div>
  <!-- <div class="preview">
    <iframe src="http://localhost:2001/littlesekii"></iframe>
  </div> -->
</section>
</template>


<style scoped>
.section-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: var(--color-highlight);
  overflow-y: auto;
}

.section-header {
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid var(--lc-white-softer);
}
.section-container {
  width: 100%;
  max-width: 600px;
  padding: 20px;

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

.links-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
