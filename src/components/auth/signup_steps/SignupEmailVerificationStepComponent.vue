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
<div class="signup-form" >
  <AuthBackButtonComponent class="back-button" @click="emit('prev')" />
  <AuthHeaderComponent
    class="fade-in"
    title="Verify your email"
    :subtitle="'We sent a email verification code to ' + emailData + '.'"
    textAlign="left"
  />
  <form class="form fade-in" @submit.prevent="onSubmit">
    <div class="inputs">
      <BaseInputComponent
        v-model="verificationCode"
        label="Verification code"
        type="text"
        :errorMessage="errorMessage"
        @input="onInput"
      />
    </div>
    <BaseButtonComponent v-if="!isLoading" label="Continue" type="submit" :disabled="!isValid" />
    <img v-else class="loading-icon" src="@/assets/loading.svg">
    <!-- <p class="error-message">{{ errorMessage }}</p> -->
  </form>
  <p class="resend-email">
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
		transform: translateX(10px); /* Start off-screen to the left */
	}
	100% {
		opacity: 1;
		transform: translateX(0); /* End at the original position */
	}
}

/* Apply the animation to the element */
.fade-in {
	animation: fadeInLeftToRight 0.2s ease-out forwards;
}

.signup-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}

.back-button {
  margin-left: -10px;
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
  text-align: center;
}

.resend-email {
  text-align: center;
  color: #333;
  font-size: 14px;
}

.resend-email button {

  text-decoration: underline;
  font-size: inherit;
  background: none;
  border: none;
  cursor: pointer;
}
.loading-icon {
  height: 48px;
}
</style>
