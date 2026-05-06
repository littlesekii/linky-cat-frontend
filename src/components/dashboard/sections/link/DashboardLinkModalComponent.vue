<script setup lang="ts">
import BaseButtonComponent from '@/components/common/BaseButtonComponent.vue';
import BaseInputComponent from '@/components/common/BaseInputComponent.vue';
import BaseModalComponent from '@/components/common/BaseModalComponent.vue';
import { useLink } from '@/composables/useLink';
import type { LinkCreateRequest, LinkUpdateRequest } from '@/types/dto/LinkDTO';
import { ApiError } from '@/types/error/ApiError';
import { ERROR_MESSAGE } from '@/utils/messages/error';
import { onMounted, onUnmounted, onUpdated, ref } from 'vue';

const props = defineProps<{
  linkId?: string,
  initialData?: {
    title: string,
    url: string,
    sortOrder: number,
    isActive: boolean
  }
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

function resetForm() {
  errorMessage.value = '';
  inputData.value = {
    title: '',
    url: '',
    sortOrder: 0,
    isActive: true
  };
}

onMounted(() => {
  resetForm();
});

async function onSubmit() {

  const body = { ...inputData.value };

  isLoading.value = true;
  try {
    if (props.linkId) {
      await update(props.linkId, body as LinkUpdateRequest);
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

</script>

<template>
<BaseModalComponent title="Add new link" :is-open="true" @close="emit('close')">

  <form class="modal-form" @submit.prevent="onSubmit">
    <div class="inputs">
      <BaseInputComponent label="Title" v-model="inputData.title" :error-message="errorMessage" />
      <BaseInputComponent label="Url" v-model="inputData.url" />
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
