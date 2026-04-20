<script setup lang="ts">
import BaseButtonComponent from '@/components/common/BaseButtonComponent.vue';
import BaseInputComponent from '@/components/common/BaseInputComponent.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import AuthHeaderComponent from '../AuthHeaderComponent.vue';
import { utils } from '@/utils/utils';
import { useAuth } from '@/composables/useAuth';
import { ApiError } from '@/types/error/ApiError';
import { ERROR_MESSAGE } from '@/utils/messages/error';
import { useSignupData } from '@/stores/useSignupData';

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
<div class="signup-form">
  <AuthHeaderComponent
    title="Join Linky Cat"
    subtitle="Create you account for free! 🐈‍⬛"
  />
  <form class="form" @submit.prevent="onSubmit">
    <div class="inputs">
      <BaseInputComponent
        v-model="email"
        label="Email"
        type="text"
        :errorMessage="errorMessage"
        :isLoading="isLoading"
        @input="onInput"
      />
    </div>
    <BaseButtonComponent label="Continue" type="submit" :disabled="!isValid" />
    <!-- <p class="error-message">{{ errorMessage }}</p> -->
  </form>
  <p class="login-link">
    Already have an account? <RouterLink class="link" to="/login">Log in</RouterLink>
  </p>
</div>
</template>

<style scoped>
.signup-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}

.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}
.inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.error-message {
  min-height: 25px;

  font-weight: 600;
  color: #F53A3A;
  /* text-align: center; */
}
.login-link {
  text-align: center;
  color: #333;
  font-size: 14px;
}
.loading-icon {
  height: 48px;
}
</style>
