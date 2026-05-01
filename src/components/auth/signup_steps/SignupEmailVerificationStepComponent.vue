<script setup lang="ts">
import BaseButtonComponent from '@/components/common/BaseButtonComponent.vue';
import BaseInputComponent from '@/components/common/BaseInputComponent.vue';
import { useEmailVerification } from '@/composables/useEmailVerification';
import { useSignupData } from '@/stores/useSignupData';
import type { EmailVerificationSendRequest, EmailVerificationVerifyRequest } from '@/types/dto/EmailVerificationDTO';
import { ApiError } from '@/types/error/ApiError';
import { ERROR_MESSAGE } from '@/utils/messages/error';
import { onMounted, onUnmounted, ref } from 'vue';
import AuthBackButtonComponent from '../AuthBackButtonComponent.vue';
import AuthHeaderComponent from '../AuthHeaderComponent.vue';

const {
  email: emailData,
  setEmailVerified,
  firstEmailVerificationSent: firstEmailVerificationSentData,
  setFirstEmailVerificationSent,
  verificationTimeout: verificationTimeoutData,
  setVerificationTimeout,
  startVerificationTimeoutTimer
} = useSignupData();
const { send, verify, isLoading } = useEmailVerification();

const emit = defineEmits(['next', 'prev']);

const errorMessage = ref<string>('');
const isValid = ref(false);

const verificationCode = ref('');

const sendVerificationCode = async () => {
  const body: EmailVerificationSendRequest = {
    email: emailData.value
  };

  try {
    await send(body);
    setVerificationTimeout(60);
    startVerificationTimeoutTimer();
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      if (error.errorCode === 'service.email_verification.already_verified') {
        setEmailVerified(true);
      }

      if (error.errorCode === 'service.email_verification.verification_timeout') {
        const match = error.message.match(/\[(\d+)\]/) ?? [];
        const seconds = match && match[1] ? parseInt(match[1]) : 0;
        setVerificationTimeout(seconds);
        startVerificationTimeoutTimer();
      }

      // errorMessage.value = error.message;
    } else {
      errorMessage.value = ERROR_MESSAGE.getDefault();
    }
    console.log(errorMessage.value);
  }
};

const verifyEmail = async (): Promise<boolean> => {
  const currentVerificationCode = verificationCode.value;

  const body: EmailVerificationVerifyRequest = {
    email: emailData.value,
    verificationCode: currentVerificationCode.replace('-', '')
  };

  try {
    await verify(body);
    setEmailVerified(true);
    return currentVerificationCode === verificationCode.value;
  } catch (error: unknown) {
    if (currentVerificationCode === verificationCode.value) {
      if (error instanceof ApiError) {
        errorMessage.value = error.message;
      } else {
        errorMessage.value = ERROR_MESSAGE.getDefault();
      }
    }
    return false;
  }
};

const validateInput = () => {
  if (verificationCode.value.match('^[A-Z0-9]{3}-[A-Z0-9]{3}$')) {
    isValid.value = true;
  }
};

onMounted(() => {
  if (!firstEmailVerificationSentData.value) {
    sendVerificationCode();
    setFirstEmailVerificationSent(true);
  }
});

onUnmounted(() => {

  // verificationTimeoutTimer.cancel();
});

function formatInput() {
  let formattedInput = verificationCode.value;

  formattedInput = formattedInput.toUpperCase();
  formattedInput = formattedInput.replace(/[^A-Z0-9-]/g, '');

  if (formattedInput.length > 0) {
    formattedInput = formattedInput.replace(/-/g, '');
    if (formattedInput.length > 3) {
      formattedInput = formattedInput.slice(0, 6);
      formattedInput = formattedInput.slice(0, 3) + '-' + formattedInput.slice(3);
    }
  }

  verificationCode.value = formattedInput;
}

async function resendVerification() {
  await sendVerificationCode();
}

function onInput() {
  errorMessage.value = '';
  isValid.value = false;
  formatInput();
  validateInput();
}

async function onSubmit() {
  if (!isValid.value)
    return;

  if (!(await verifyEmail())) {
    return;
  }

  emit('next');
}

</script>

<template>
<div class="wrapper" >
  <AuthBackButtonComponent class="back-button" @click="emit('prev')" />
  <AuthHeaderComponent class="fade-in" textAlign="left">
    <template #title>Verify your email</template>
    <template #subtitle>We sent a email verification code to <strong class="strong">{{ emailData }}</strong>.</template>
  </AuthHeaderComponent>
  <form class="form fade-in" @submit.prevent="onSubmit">
    <div class="inputs">
      <BaseInputComponent
        label="Verification code"
        type="text"
        v-model="verificationCode"
        :errorMessage="errorMessage"
        @input="onInput"
      />
    </div>
    <BaseButtonComponent v-if="!isLoading" label="Continue" type="submit" :disabled="!isValid" />
    <img v-else class="loading-icon" src="@/assets/loading.svg">
  </form>
  <p class="additional-info">
    Did not receive the email?
    <span v-if="verificationTimeoutData > 0">Please wait {{ verificationTimeoutData }} seconds.</span>
    <button v-else @click.prevent="resendVerification">Resend</button>
  </p>
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

.strong {
  font-weight: 500;
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
  height: 3rem;
}

.additional-info {
  color: var(--color-text-secondary);

  text-align: center;
  font-size: 14px;
}
.additional-info button {
  color: var(--color-link);

  font-size: inherit;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
}
.additional-info button:hover {
  text-decoration: underline;
}
</style>
