<script setup lang="ts">
import BaseButtonComponent from '@/components/common/BaseButtonComponent.vue';
import BaseInputComponent from '@/components/common/BaseInputComponent.vue';
import BaseModalComponent from '@/components/common/BaseModalComponent.vue';
import { useProfile } from '@/composables/useProfile';
import type { ProfileResponse, ProfileUpdateRequest } from '@/types/dto/ProfileDTO';
import { ApiError } from '@/types/error/ApiError';
import { ERROR_MESSAGE } from '@/utils/messages/error';
import { nextTick, ref, useTemplateRef } from 'vue';


const editData = ref<{
  profileId: string,
  profile: ProfileUpdateRequest
}>();

const emit = defineEmits(['close', 'submit']);

const { update } = useProfile();

const isLoading = ref(false);
const errorMessage = ref('');
const inputData = ref<ProfileUpdateRequest>({
  displayName: '',
  bio: ''
});

const nameInputRef = useTemplateRef('name-input');
const bioInputRef = useTemplateRef('bio-input');

const modalTitle = ref('Edit profile');

function resetForm() {
  errorMessage.value = '';
  inputData.value = {
    displayName: '',
    bio: ''
  };
}

async function onSubmit() {

  const body = { ...inputData.value };

  isLoading.value = true;
  try {
    if (editData.value) {
      await update(editData.value.profileId, body as ProfileUpdateRequest);
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

const prepareModalEdit = async (profileId: string, profile: ProfileResponse, field: 'displayName' | 'bio') => {
  editData.value = {
    profileId,
    profile
  };
  resetForm();

  if (editData.value) {
    inputData.value = { ...editData.value.profile };
  }

  await nextTick();
  if (field === 'displayName') {
    nameInputRef.value?.setFocus();
  }
  if (field === 'bio') {
    bioInputRef.value?.setFocus();
  }
};
defineExpose({ prepareModalEdit });

</script>

<template>
<BaseModalComponent :title="modalTitle" :is-open="true" @close="emit('close')">

  <form class="modal-form" @submit.prevent="onSubmit">
    <div class="inputs">
      <BaseInputComponent
        label="Name"
        ref="name-input"
        :max-length="30"
        v-model="inputData.displayName"
        :error-message="errorMessage"
      />
      <BaseInputComponent
        label="Bio"
        type="textarea"
        :max-length="160"
        ref="bio-input"
        v-model="inputData.bio"
      />
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
