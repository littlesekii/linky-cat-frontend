<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseButtonComponent from '../common/BaseButtonComponent.vue';
import BaseInputComponent from '../common/BaseInputComponent.vue';
import { useAuth } from '@/composables/useAuth';
import type { AuthLoginRequest } from '@/types/dto/AuthDTO';
import { ApiError } from '@/types/error/ApiError';
import { ERROR_MESSAGE } from '@/utils/messages/error';

const { login, isLoading } = useAuth();

const errorMessage = ref<string>(' ');
const credentials = ref<AuthLoginRequest>({
  username: '',
  password: ''
});

const validateInputs = computed(() => {
  return credentials.value.username.length >= 3
    && credentials.value.password.length >= 3;
});

async function submit() {
  if (!validateInputs.value)
    return;

  errorMessage.value = '';

  try {
    await login(credentials.value);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      errorMessage.value = ERROR_MESSAGE.fromCode(error.errorCode);
    } else {
      errorMessage.value = ERROR_MESSAGE.getDefault();
    }
  }
}

</script>

<template>
<form class="form" @submit.prevent="submit">
  <div class="inputs">
    <BaseInputComponent v-model="credentials.username" label="Username" type="text" />
    <BaseInputComponent v-model="credentials.password" label="Password" type="password" />
  </div>
  <BaseButtonComponent v-if="!isLoading" label="LOGIN" type="submit" :disabled="!validateInputs" />
  <img v-else class="loading-icon" src="@/assets/loading.svg">
  <p class="error-message">{{ errorMessage }}</p>
</form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.loading-icon {
  height: 47px;
}
.error-message {
  min-height: 25px;

  font-weight: 600;
  color: #F53A3A;
  text-align: center;
}
</style>
