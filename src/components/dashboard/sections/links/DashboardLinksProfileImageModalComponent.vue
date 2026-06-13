<script setup lang="ts">
import BaseButtonComponent from '@/components/common/BaseButtonComponent.vue';
import BaseImageCropper from '@/components/common/BaseImageCropper.vue';
import BaseModalComponent from '@/components/common/BaseModalComponent.vue';
import { useProfile } from '@/composables/useProfile';
import { ApiError } from '@/types/error/ApiError';
import { ERROR_MESSAGE } from '@/utils/messages/error';
import { ref, useTemplateRef } from 'vue';


const editData = ref<{
  profileId: string
}>();

const emit = defineEmits(['close', 'submit']);

const { updateImage } = useProfile();

const imageCropper = useTemplateRef('image-cropper');

const isLoading = ref(false);
const errorMessage = ref('');

const modalTitle = ref('Edit profile image');

async function onSubmit() {
  const image = await imageCropper.value?.crop();

  if (!image) {
    errorMessage.value = 'Invalid image';
    return;
  }

  const formData = new FormData();
  formData.append('image', image);

  isLoading.value = true;
  try {
    if (editData.value) {
      await updateImage(editData.value.profileId, formData);
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

const prepareModalEdit = async (profileId: string, image: File) => {
  editData.value = {
    profileId
  };
  imageCropper.value?.prepare(image);
};

defineExpose({ prepareModalEdit });

</script>

<template>
<BaseModalComponent :title="modalTitle" :is-open="true" @close="emit('close')">
  <form class="modal-form" @submit.prevent="onSubmit">
    <div class="inputs">
      <BaseImageCropper ref="image-cropper" />
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
