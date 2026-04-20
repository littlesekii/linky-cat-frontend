<script setup lang="ts">
import CheckSVG from '@/assets/icons/CheckSVG.vue'; // Ou o ícone que você tiver
import BaseButtonComponent from '@/components/common/BaseButtonComponent.vue';
import { useSignupData } from '@/stores/useSignupData';
import AuthHeaderComponent from '../AuthHeaderComponent.vue';
import { useAuth } from '@/composables/useAuth';
import { ApiError } from '@/types/error/ApiError';
import type { AuthLoginRequest } from '@/types/dto/AuthDTO';

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
</script>

<template>
  <div class="signup-form success-step">
    <div class="success-icon-container">
      <div class="circle-bg">
        <CheckSVG size="48" color="#007c3e" />
      </div>
    </div>

    <AuthHeaderComponent
      class="fade-in"
      :title="'Welcome, ' + displayName + '!'"
      subtitle="Your account has been created successfully. The Linky Cat world is now yours to explore. 🐈‍⬛✨"
      textAlign="center"
    />

    <div class="action-section fade-in">
      <BaseButtonComponent
        v-if="!isLoading"
        label="Get Started"
        @click="start"
      />
      <img v-else class="loading-icon" src="@/assets/loading.svg">

      <p class="hint-text">
        Check your profile later to add a bio and links!
      </p>
    </div>
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

.success-step {
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}

.success-icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.circle-bg {
  width: 80px;
  height: 80px;
  background-color: rgba(0, 124, 62, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-section {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.hint-text {
  text-align: center;
  font-size: 0.9rem;
  color: #666;
}

.signup-form {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.loading-icon {
  height: 48px;
}
</style>
