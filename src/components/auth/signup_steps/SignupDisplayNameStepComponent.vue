<script setup lang="ts">
import BaseButtonComponent from '@/components/common/BaseButtonComponent.vue';
import BaseInputComponent from '@/components/common/BaseInputComponent.vue';
import { useAuth } from '@/composables/useAuth';
import { useSignupData } from '@/stores/useSignupData';
import type { AuthRegisterRequest } from '@/types/dto/AuthDTO';
import { ApiError } from '@/types/error/ApiError';
import { ERROR_MESSAGE } from '@/utils/messages/error';
import { ref } from 'vue';
import AuthBackButtonComponent from '../AuthBackButtonComponent.vue';
import AuthHeaderComponent from '../AuthHeaderComponent.vue';

const {
  email: emailData,
  username: usernameData,
  password: passwordData,
  displayName: displayNameData,
  bio: bioData,
  setDisplayName
} = useSignupData();
const { register, isLoading } = useAuth();

const emit = defineEmits(['next', 'prev']);

const errorMessage = ref<string>('');
const isValid = ref(false);

const displayName = ref('');

const validateInput = async () => {
  if (displayName.value.length <= 0) {
    return;
  }
  isValid.value = true;
};

const finalizeRegister = async (
  email: string,
  username: string,
  password: string,
  displayName: string,
  bio: string
) => {

  const body: AuthRegisterRequest = {
    email,
    username,
    password,
    displayName,
    bio
  };

  try {
    await register(body);
    return true;
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = ERROR_MESSAGE.getDefault();
    }
    return false;
  }
};

function onInput() {
  errorMessage.value = '';
  isValid.value = false;
  validateInput();
}

async function onSubmit() {
  if (!isValid.value)
    return;


  setDisplayName(displayName.value);
  if (!(await finalizeRegister(
    emailData.value,
    usernameData.value,
    passwordData.value,
    displayNameData.value,
    bioData.value))
  ) return;

  emit('next');
}

</script>

<template>
<div class="wrapper">
  <AuthBackButtonComponent class="back-button" @click="emit('prev')" />
  <AuthHeaderComponent class="fade-in" textAlign="left">
    <template #title>Enter your name</template>
    <template #subtitle>This name will be displayed as your page title. 🏷️</template>
  </AuthHeaderComponent>
  <form class="form fade-in" @submit.prevent="onSubmit">
    <div class="inputs">
      <BaseInputComponent
        label="Name"
        type="text"
        v-model="displayName"
        :errorMessage="errorMessage"
        @input="onInput"
      />
    </div>
    <BaseButtonComponent v-if="!isLoading" label="Finish" type="submit" :disabled="!isValid" />
    <img v-else class="loading-icon" src="@/assets/loading.svg">
  </form>
</div>
</template>

<style scoped>

@keyframes fadeInLeftToRight {
	0% {
		opacity: 0;
		transform: translateX(10px);
	}
	100% {
		opacity: 1;
		transform: translateX(0);
	}
}

.fade-in {
	animation: fadeInLeftToRight 0.2s ease-out forwards;
}

.wrapper {
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
}

.back-button {
  margin-left: -10px;
}

.form {
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
  height: 48px;
}
</style>
