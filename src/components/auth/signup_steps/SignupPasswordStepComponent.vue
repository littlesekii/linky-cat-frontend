<script setup lang="ts">
import BaseButtonComponent from '@/components/common/BaseButtonComponent.vue';
import BaseInputComponent from '@/components/common/BaseInputComponent.vue';
import { useSignupData } from '@/stores/useSignupData';
import { utils } from '@/utils/utils';
import { computed, onUnmounted, ref } from 'vue';
import AuthBackButtonComponent from '../AuthBackButtonComponent.vue';
import AuthHeaderComponent from '../AuthHeaderComponent.vue';
import CheckSVG from '@/assets/icons/CheckSVG.vue';

const { setPassword } = useSignupData();

const emit = defineEmits(['next', 'prev']);

const passwordErrorMessage = ref<string>('');
const passwordConfirmationErrorMessage = ref<string>('');
const isValid = ref(false);

const password = ref('');
const passwordConfirmation = ref('');

const lengthConditionMet = computed(() => password.value.length >= 8);
const caseConditionMet = computed(() => /[A-Z]/.test(password.value) && /[a-z]/.test(password.value));
const numberConditionMet = computed(() => /[0-9]/.test(password.value));
const specialConditionMet = computed(() => /[!@#$%^&*()_+\-=[\]{};':",./<>?]/.test(password.value));

const validateInput = async () => {
  if (!lengthConditionMet.value) {
    passwordErrorMessage.value = 'Password must contain at least 8 characters';
    return;
  }

  if (!/[A-Z]/.test(password.value)) {
    passwordErrorMessage.value = 'Password must contain at least one uppercase letter (A-Z)';
    return;
  }

  if (!/[a-z]/.test(password.value)) {
    passwordErrorMessage.value = 'Password must contain at least one lowercase letter (a-z)';
    return;
  }

  if (!numberConditionMet.value) {
    passwordErrorMessage.value = 'Password must contain at least one number';
    return;
  }

  if (!specialConditionMet.value) {
    passwordErrorMessage.value = 'Password must contain at least one special character (e.g. @, ! or #)';
    return;
  }

  if (passwordConfirmation.value.length > 0 && password.value !== passwordConfirmation.value) {
    passwordConfirmationErrorMessage.value = 'Password does not match';
    return;
  }

  if (passwordConfirmation.value.length <= 0) {
    return;
  }

  isValid.value = true;
};

const debouncedValidate = utils.debounce(validateInput, 700);

onUnmounted(() => {
  debouncedValidate.cancel();
});

function onInput() {
  passwordErrorMessage.value = '';
  passwordConfirmationErrorMessage.value = '';
  isValid.value = false;
  debouncedValidate();
}

function onSubmit() {
  if (!isValid.value)
    return;

  setPassword(password.value);
  emit('next');
}

</script>

<template>
<div class="signup-form" >
  <AuthBackButtonComponent class="back-button" @click="emit('prev')" />
  <AuthHeaderComponent
    class="fade-in"
    title="Create a password"
    subtitle="Ensure it is strong, unique, and not used elsewhere. 🔐"
    textAlign="left"
  />
  <form class="form fade-in" @submit.prevent="onSubmit">
    <div class="inputs">
      <BaseInputComponent
        v-model="password"
        label="Password"
        type="password"
        :errorMessage="passwordErrorMessage"
        @input="onInput"
      />
      <BaseInputComponent
        v-model="passwordConfirmation"
        label="Confirm password"
        type="password"
        :errorMessage="passwordConfirmationErrorMessage"
        @input="onInput"
      />
    </div>
    <BaseButtonComponent label="Continue" type="submit" :disabled="!isValid" />
  </form>
  <ul class="conditions fade-in">
				<li class="condition" :class="{ 'condition-met': lengthConditionMet }">
					<span class="condition-icon" v-if="lengthConditionMet">
						<CheckSVG size="16"/>
					</span>
					<span class="condition-icon" v-else>
						•
					</span>
					Min 8 characters
				</li>
				<li class="condition" :class="{ 'condition-met': caseConditionMet }">
					<span class="condition-icon" v-if="caseConditionMet">
						<CheckSVG size="16"/>
					</span>
					<span class="condition-icon" v-else>
						•
					</span>
					Upper and lowercase letters
				</li>
				<li class="condition" :class="{ 'condition-met': numberConditionMet }">
					<span class="condition-icon" v-if="numberConditionMet">
						<CheckSVG size="16"/>
					</span>
					<span class="condition-icon" v-else>
						•
					</span>
					A number
				</li>
				<li class="condition" :class="{ 'condition-met': specialConditionMet }">
					<span class="condition-icon" v-if="specialConditionMet">
						<CheckSVG size="16"/>
					</span>
					<span class="condition-icon" v-else>
						•
					</span>
					A symbol (e.g. @, ! or #)
				</li>
			</ul>
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

.conditions {
  display: flex;
  margin-bottom: 10px;

  color: #333;
  font-size: 14px;

  list-style: none;
  flex-wrap: wrap;
}
.condition {
  display: flex;
  width: 50%;
  padding: 3px;
  transition: color 0.2s;
  align-items: center;
}
.condition-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 16px;
  margin: 0 5px;
}
.condition-met {
  color: #007c3e;
}

@media (max-width: 510px) {
  .conditions {
    flex-direction: column;
  }
  .condition {
    width: 100%;
  }
}
</style>
