<script setup lang="ts">
import CheckSVG from '@/assets/icons/CheckSVG.vue'; // Ou o ícone que você tiver
import BaseButtonComponent from '@/components/common/BaseButtonComponent.vue';
import { useSignupData } from '@/stores/useSignupData';
import AuthHeaderComponent from '../AuthHeaderComponent.vue';
import { useAuth } from '@/composables/useAuth';
import { ApiError } from '@/types/error/ApiError';
import type { AuthLoginRequest } from '@/types/dto/AuthDTO';

import confetti from 'canvas-confetti';
import { onMounted } from 'vue';

const { displayName, username, password } = useSignupData();
const { login, isLoading } = useAuth();

const start = async () => {

  const body: AuthLoginRequest = {
    username: username.value,
    password: password.value
  };

  try {
    await login(body);
  } catch (error: unknown) {
    if (error instanceof ApiError) {

    }
  }
};

onMounted(() => {

  const screenWidth: number = window.innerWidth;
  const originX: number = (screenWidth > 800) ? 0.25 : 0.5;

  confetti({
    particleCount: 200,
    spread: 180,
    origin: { x: originX,  y: 0.55 },
    scalar: 0.5,
    colors: ['#5e25c0', '#f472b6', '#ffffff']
  });

});
</script>

<template>
  <div class="wrapper">
    <div class="success-icon">
      <div class="icon-circle-bg">
        <CheckSVG size="48" color="#007c3e" />
      </div>
    </div>

    <AuthHeaderComponent class="fade-in">
      <template #title>Welcome, {{ displayName }}!</template>
      <template #subtitle>
        Your account has been created successfully. The Linky Cat world is now yours to explore. 🐈‍⬛✨
      </template>
    </AuthHeaderComponent>

    <BaseButtonComponent
      v-if="!isLoading"
      label="Get Started"
      class="fade-in"
      @click="start"
    />
    <img v-else class="loading-icon" src="@/assets/loading.svg">

    <p class="additional-info fade-in">
      Check your profile to add a bio and your links!
    </p>
  </div>
</template>

<style scoped>
@keyframes popIn {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes fadeInDownToUp {
	0% {
		opacity: 0;
		transform: translateY(10px);
	}
	100% {
		opacity: 1;
		transform: translateX(0);
	}
}

.fade-in {
  animation: fadeInDownToUp 0.3s ease-out forwards;
}

.success-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.icon-circle-bg {
  width: 80px;
  height: 80px;
  background-color: rgba(0, 124, 62, 0.1);
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper {
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
}

.loading-icon {
  height: 48px;
}

.additional-info {
  color: var(--color-text-secondary);

  text-align: center;
  font-size: 14px;
}

</style>
