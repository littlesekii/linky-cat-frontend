<script setup lang="ts">
import BaseButtonComponent from '@/components/common/BaseButtonComponent.vue';
import BaseInputComponent from '@/components/common/BaseInputComponent.vue';
import { useAuth } from '@/composables/useAuth';
import { useSignupData } from '@/stores/useSignupData';
import { ApiError } from '@/types/error/ApiError';
import { ERROR_MESSAGE } from '@/utils/messages/error';
import { utils } from '@/utils/utils';
import { onMounted, onUnmounted, ref } from 'vue';
import AuthBackButtonComponent from '../AuthBackButtonComponent.vue';
import AuthHeaderComponent from '../AuthHeaderComponent.vue';

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
<div class="wrapper">
  <AuthBackButtonComponent class="back-button" @click="emit('prev')" />
  <AuthHeaderComponent class="fade-in" textAlign="left">
    <template #title>Choose your username</template>
    <template #subtitle>This is how people find your page! ✨</template>
  </AuthHeaderComponent>
  <form class="form fade-in" @submit.prevent="onSubmit">
    <div class="inputs">
      <BaseInputComponent
        label="linky.cat/"
        type="text"
        v-model="username"
        :fixedLabel="true"
        :fixedPadding="75"
        :errorMessage="errorMessage"
        :isLoading="isLoading"
        @input="onInput"
      />
    </div>
    <BaseButtonComponent label="Continue" type="submit" :disabled="!isValid" />
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
</style>
