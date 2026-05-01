<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';
import type { AuthLoginRequest } from '@/types/dto/AuthDTO';
import { ApiError } from '@/types/error/ApiError';
import { ERROR_MESSAGE } from '@/utils/messages/error';
import { computed, ref } from 'vue';
import BaseButtonComponent from '../common/BaseButtonComponent.vue';
import BaseInputComponent from '../common/BaseInputComponent.vue';
import AuthHeaderComponent from './AuthHeaderComponent.vue';

const { login, isLoading } = useAuth();

const errorMessage = ref<string>('');
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
      errorMessage.value = error.message;
    } else {
      errorMessage.value = ERROR_MESSAGE.getDefault();
    }
  }
}

</script>

<template>
<div class="wrapper">
  <AuthHeaderComponent>
    <template #title>Welcome back</template>
    <template #subtitle>Log in to your account 🐈‍⬛</template>
  </AuthHeaderComponent>
  <form class="form" @submit.prevent="submit">
    <div class="inputs">
      <BaseInputComponent
        label="Username"
        type="text"
        v-model="credentials.username"
        :error-message="errorMessage"
      />
      <BaseInputComponent
        label="Password"
        type="password"
        v-model="credentials.password"
        :error-message="errorMessage ? ' ' : ''"
      />
    </div>
    <BaseButtonComponent
      v-if="!isLoading"
      label="Login"
      type="submit"
      :disabled="!validateInputs" />
    <img v-else class="loading-icon" src="@/assets/loading.svg">
  </form>
  <p class="additional-info">
    Don't have an account? <RouterLink class="link" to="/signup">Sign-up</RouterLink>
  </p>
</div>
</template>

<style scoped>
.wrapper {
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
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
  height: 3rem;
}

.additional-info {
  color: var(--color-text-secondary);

  text-align: center;
  font-size: 14px;
}
.additional-info .link {
  color: var(--color-link);

  text-decoration: none;
}
.additional-info .link:hover {
  text-decoration: underline;
}
</style>
