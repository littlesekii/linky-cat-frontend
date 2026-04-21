<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseButtonComponent from '../common/BaseButtonComponent.vue';
import BaseInputComponent from '../common/BaseInputComponent.vue';
import { useAuth } from '@/composables/useAuth';
import type { AuthLoginRequest } from '@/types/dto/AuthDTO';
import { ApiError } from '@/types/error/ApiError';
import { ERROR_MESSAGE } from '@/utils/messages/error';
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
<div class="login-form">
  <AuthHeaderComponent
    title="Welcome back"
    subtitle="Log in to your account 🐈‍⬛"
  />
  <form class="form" @submit.prevent="submit">
    <div class="inputs">
      <BaseInputComponent v-model="credentials.username" :error-message="errorMessage" label="Username" type="text" />
      <BaseInputComponent v-model="credentials.password" :error-message="errorMessage ? ' ' : ''" label="Password" type="password" />
    </div>
    <BaseButtonComponent v-if="!isLoading" label="Login" type="submit" :disabled="!validateInputs" />
    <img v-else class="loading-icon" src="@/assets/loading.svg">
  </form>
  <p class="signup-link">
    Don't have a account? <RouterLink class="link" to="/signup">Sign up</RouterLink>
  </p>
</div>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.loading-icon {
  height: 48px;
}
.error-message {
  min-height: 25px;

  font-weight: 600;
  color: #F53A3A;
  text-align: center;
}
.signup-link {
  text-align: center;
  color: #333;
  font-size: 14px;
}
</style>
