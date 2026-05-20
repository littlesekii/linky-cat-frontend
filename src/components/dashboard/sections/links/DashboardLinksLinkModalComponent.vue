<script setup lang="ts">
import BaseButtonComponent from '@/components/common/BaseButtonComponent.vue';
import BaseInputComponent from '@/components/common/BaseInputComponent.vue';
import BaseModalComponent from '@/components/common/BaseModalComponent.vue';
import { useLink } from '@/composables/useLink';
import type { LinkCreateRequest, LinkResponse, LinkUpdateRequest } from '@/types/dto/LinkDTO';
import { ApiError } from '@/types/error/ApiError';
import { ERROR_MESSAGE } from '@/utils/messages/error';
import { computed, nextTick, ref, useTemplateRef } from 'vue';


const editData = ref<{
  linkId: string,
  link: LinkUpdateRequest
}>();

const emit = defineEmits(['close', 'submit']);

const { create, update } = useLink();

const isLoading = ref(false);
const errorMessage = ref('');
const inputData = ref<LinkCreateRequest | LinkUpdateRequest>({
  title: '',
  url: '',
  sortOrder: 0,
  isActive: true
});

const titleInputRef = useTemplateRef('title-input');
const urlInputRef = useTemplateRef('url-input');

const modalTitle = computed(() => editData.value?.linkId ? 'Edit link' : 'Add new link');

function resetForm() {
  errorMessage.value = '';
  inputData.value = {
    title: '',
    url: '',
    sortOrder: 0,
    isActive: true
  };
}

async function onSubmit() {

  const body = { ...inputData.value };

  isLoading.value = true;
  try {
    if (editData.value) {
      await update(editData.value.linkId, body as LinkUpdateRequest);
    } else {
      await create(body as LinkCreateRequest);
    }
    emit('submit');
  } catch (error: unknown) {
    isLoading.value = false;
    if (error instanceof ApiError) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = ERROR_MESSAGE.getDefault();
    }
  }
}

const prepareModalCreate = () => {
  editData.value = undefined;
  resetForm();
};

const prepareModalEdit = async (linkId: string, link: LinkResponse, field: 'title' | 'url') => {
  editData.value = {
    linkId,
    link
  };
  resetForm();

  if (editData.value) {
    inputData.value = { ...editData.value.link };
  }

  await nextTick(); //
  if (field === 'title') {
    titleInputRef.value?.setFocus();
  }
  if (field === 'url') {
    urlInputRef.value?.setFocus();
  }
};
defineExpose({ prepareModalCreate, prepareModalEdit });

</script>

<template>
<BaseModalComponent :title="modalTitle" :is-open="true" @close="emit('close')">

  <form class="modal-form" @submit.prevent="onSubmit">
    <div class="inputs">
      <BaseInputComponent label="Title" ref="title-input" v-model="inputData.title" :error-message="errorMessage" />
      <BaseInputComponent label="Url" ref="url-input" v-model="inputData.url" />
    </div>
    <BaseButtonComponent v-if="!isLoading" label="Save" type="submit" :disabled="false" />
    <img v-else class="loading-icon" src="@/assets/loading.svg">
  </form>

</BaseModalComponent>
</template>

<style scoped>
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.loading-icon {
  height: 3rem;
}
</style>
