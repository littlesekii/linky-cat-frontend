<script setup lang="ts">
import { computed, markRaw, ref } from 'vue';
import SignupEmailStepComponent from './signup_steps/SignupEmailStepComponent.vue';
import SignupEmailVerificationStepComponent from './signup_steps/SignupEmailVerificationStepComponent.vue';
import SignupPasswordStepComponent from './signup_steps/SignupPasswordStepComponent.vue';
import SignupUsernameStepComponent from './signup_steps/SignupUsernameStepComponent.vue';
import SignupDisplayNameStepComponent from './signup_steps/SignupDisplayNameStepComponent.vue';
import { useSignupData } from '@/stores/useSignupData';
import SignupWelcomeStepComponent from './signup_steps/SignupWelcomeStepComponent.vue';

const { emailVerified } = useSignupData();

const currentStep = ref(0);
const steps = computed(() => {
  const steps = [
    markRaw(SignupEmailStepComponent),
    markRaw(SignupUsernameStepComponent),
    markRaw(SignupEmailVerificationStepComponent),
    markRaw(SignupPasswordStepComponent),
    markRaw(SignupDisplayNameStepComponent),
    markRaw(SignupWelcomeStepComponent),
  ];

  if (emailVerified.value)
    steps.splice(2, 1);

  return steps;
});

function nextStep() {
  if (currentStep.value < steps.value.length - 1)
    currentStep.value++;
}

function prevStep() {
  if (currentStep.value > 0)
    currentStep.value--;
}

</script>

<template>
  <component
    class="signup-form"
    :is="steps[currentStep]"
    @next="nextStep"
    @prev="prevStep"
  />
</template>

<style scoped>
.signup-form {
  max-width: 540px;
  padding: 0 20px;
}
</style>
