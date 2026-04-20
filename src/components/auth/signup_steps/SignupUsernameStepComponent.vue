<script setup lang="ts">
import BaseButtonComponent from '@/components/common/BaseButtonComponent.vue';
import BaseInputComponent from '@/components/common/BaseInputComponent.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import AuthHeaderComponent from '../AuthHeaderComponent.vue';
import AuthBackButtonComponent from '../AuthBackButtonComponent.vue';
import { useAuth } from '@/composables/useAuth';
import { ApiError } from '@/types/error/ApiError';
import { ERROR_MESSAGE } from '@/utils/messages/error';
import { utils } from '@/utils/utils';
import { useSignupData } from '@/stores/useSignupData';

const { username: usernameData, setUsername } = useSignupData();
const { checkUsername, isLoading } = useAuth();

const emit = defineEmits(['next', 'prev']);

const errorMessage = ref<string>('');
const isValid = ref(false);

const username = ref(usernameData.value || '');

const validateInput = async () => {
  const currentUsername = username.value;

  const sanitizedUsername = currentUsername.trim();

  if (sanitizedUsername.length > 32) {
    errorMessage.value = 'Username length cannot be over 32 characters';
    return;
  }

  if (/.*[^A-Za-z0-9._].*/.test(sanitizedUsername)) {
    errorMessage.value = 'Username can only contain letters (A-Z, a-z), numbers, underscores, and periods';
    return;
  }

  if(!/.*[A-Za-z0-9].*/.test(sanitizedUsername)) {
    errorMessage.value = 'Username must contain at least one letter (A-Z, a-z) or number';
    return;
  }

  if(sanitizedUsername.includes('..')) {
    errorMessage.value = 'Username cannot contain more than one period in a row';
    return;
  }

  if (sanitizedUsername.startsWith('.') || sanitizedUsername.endsWith('.')) {
    errorMessage.value = 'Username cannot start or end with a period';
    return;
  }

  try {
    await checkUsername(currentUsername);

    //resolve race conditions
    if (currentUsername === username.value) {
      isValid.value = true;
    }
  } catch (error: unknown) {
    if (currentUsername === username.value) {
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
  if (username.value) {
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

  setUsername(username.value);
  emit('next');
}

</script>

<template>
<div class="signup-form" >
  <AuthBackButtonComponent class="back-button" @click="emit('prev')" />
  <AuthHeaderComponent
    class="fade-in"
    title="Choose your username"
    subtitle="This is how people find your page! ✨"
    textAlign="left"
  />
  <form class="form fade-in" @submit.prevent="onSubmit">
    <div class="inputs">
      <BaseInputComponent
        v-model="username"
        label="linky.cat/"
        type="text"
        :fixedLabel="true"
        :fixedPadding="75"
        :errorMessage="errorMessage"
        :isLoading="isLoading"
        @input="onInput"
      />
    </div>
    <BaseButtonComponent label="Continue" type="submit" :disabled="!isValid" />
    <!-- <p class="error-message">{{ errorMessage }}</p> -->
  </form>
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
</style>
