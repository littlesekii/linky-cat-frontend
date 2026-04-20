<script setup lang="ts">
import BaseButtonComponent from '@/components/common/BaseButtonComponent.vue';
import BaseInputComponent from '@/components/common/BaseInputComponent.vue';
import { useAuth } from '@/composables/useAuth';
import { useSignupData } from '@/stores/useSignupData';
import { ref } from 'vue';
import AuthBackButtonComponent from '../AuthBackButtonComponent.vue';
import AuthHeaderComponent from '../AuthHeaderComponent.vue';
import type { AuthRegisterRequest } from '@/types/dto/AuthDTO';
import { ApiError } from '@/types/error/ApiError';
import { ERROR_MESSAGE } from '@/utils/messages/error';

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
<div class="signup-form" >
  <AuthBackButtonComponent class="back-button" @click="emit('prev')" />
  <AuthHeaderComponent
    class="fade-in"
    title="Enter your name"
    subtitle="This name will be displayed as your page title. 🏷️"
    textAlign="left"
  />
  <form class="form fade-in" @submit.prevent="onSubmit">
    <div class="inputs">
      <BaseInputComponent
        v-model="displayName"
        label="Name"
        type="text"
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
.loading-icon {
  height: 48px;
}
</style>
