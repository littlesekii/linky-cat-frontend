<script setup lang="ts">
import BaseButtonComponent from '@/components/common/BaseButtonComponent.vue';
import BaseInputComponent from '@/components/common/BaseInputComponent.vue';
import { useAuth } from '@/composables/useAuth';
import { useSignupData } from '@/stores/useSignupData';
import { ApiError } from '@/types/error/ApiError';
import { ERROR_MESSAGE } from '@/utils/messages/error';
import { utils } from '@/utils/utils';
import { onMounted, onUnmounted, ref } from 'vue';
import AuthHeaderComponent from '../AuthHeaderComponent.vue';

const { email: emailData, setEmail, setEmailVerified, setFirstEmailVerificationSent, setVerificationTimeout } = useSignupData();
const { checkEmail, isLoading } = useAuth();

const emit = defineEmits(['next']);

const errorMessage = ref<string>('');
const isValid = ref(false);

const email = ref(emailData.value || '');

const validateInput = async () => {
  const currentEmail = email.value;

  const sanitizedEmail = currentEmail.trim();

  if (!/^(?=.{1,64}@)[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(sanitizedEmail)) {
    errorMessage.value = 'Please enter a valid email';
    return;
  }

  try {
    await checkEmail(currentEmail);

    //resolve race conditions
    if (currentEmail === email.value) {
      isValid.value = true;
    }
  } catch (error: unknown) {
    if (currentEmail === email.value) {
      isValid.value = false;
      if (error instanceof ApiError) {
        errorMessage.value = error.message;
      } else {
        errorMessage.value = ERROR_MESSAGE.getDefault();
      }
    }
  }
};

const debouncedValidate = utils.debounce(validateInput, 500);

onMounted(() => {
  setFirstEmailVerificationSent(false);
  setEmailVerified(false);
  setVerificationTimeout(0);
  if (emailData.value) {
    validateInput();
  }
});

onUnmounted(() => {
  debouncedValidate.cancel();
});

function onInput() {
  errorMessage.value = '';
  isValid.value = false;
  debouncedValidate();
}

function onSubmit() {
  if (!isValid.value)
    return;

  setEmail(email.value);
  emit('next');
}

</script>

<template>
<div class="wrapper">
  <AuthHeaderComponent>
    <template #title>Join Linky Cat</template>
    <template #subtitle>Create you account for free! 🐈‍⬛</template>
  </AuthHeaderComponent>
  <form class="form" @submit.prevent="onSubmit">
    <div class="inputs">
      <BaseInputComponent
        label="Email"
        type="text"
        v-model="email"
        :errorMessage="errorMessage"
        :isLoading="isLoading"
        @input="onInput"
      />
    </div>
    <BaseButtonComponent label="Continue" type="submit" :disabled="!isValid" />
  </form>
  <p class="additional-info">
    Already have an account? <RouterLink class="link" to="/login">Log-in</RouterLink>
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
