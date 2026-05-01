<script setup lang="ts">
import { computed, ref } from 'vue';

const model = defineModel<string>();

const props = defineProps<{
  isLoading?: boolean,
  type?: string,
  label?: string,
  errorMessage?: string,
  fixedLabel?: boolean
  fixedPadding?: number
}>();

const isFocused = ref(false);

const inputClasses = computed(() => ({
  'shake-animation': props.errorMessage,
  'input-error': props.errorMessage,
  'fixed-label': props.fixedLabel,
  'default-label': !props.fixedLabel,
  'label-moved' : !props.fixedLabel && (isFocused.value || model.value && model.value.length > 0)
}));

</script>

<template>
<div class="input-wrapper">
  <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
  <div class="input" :class="inputClasses">
    <label
      :for="label"
    >
      {{ label }}
    </label>
    <input
      :style="fixedLabel ? `padding-left: ${fixedPadding}px` : ''"
      :id="label"
      v-model="model"
      :type="type || 'text'"
      @focusin="isFocused = true"
      @focusout="isFocused = false"
    >
    <img v-if="isLoading" class="loading-icon" src="@/assets/loading-small.svg">
  </div>
</div>
</template>

<style scoped>

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-2px); }
    40%, 80% { transform: translateX(2px); }
}

.shake-animation {
  animation: shake 0.3s ease-in-out;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.error-message {
  color: var(--color-error);
  font-size: 14px;
  font-weight: 600;
}

.input {
  height: 3rem;
  display: flex;

  background-color: var(--color-highlight);
  color: var(--color-text);

  border: none;
  border-radius: 12px;
}

.input label {
  font-size: 14px;
  position: absolute;
  padding: 0 13px;
  padding-top: 15px;

  cursor: text;
  color: var(--color-text-secondary);

  transition: padding 0.2s, font-size 0.2s;
  user-select: none;
  -moz-user-select: none;
}

.input input {
  flex: 1;
  font-size: 14px;
  outline: none;

  border: inherit;
  background-color: inherit;
  border-radius: inherit;
}

/* remove autocomplete background */
.input input:-webkit-autofill,
.input input:-webkit-autofill:hover,
.input input:-webkit-autofill:focus,
.input input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px var(--color-highlight) inset !important;
}

.loading-icon {
  width: 48px;
}

.default-label input {
  padding: 0 13px;
  padding-top: 22px;
  padding-bottom: 6px;
}

.fixed-label input {
  padding: 14px;
}

.label-moved label {
  padding-top: 6px;
  font-size: 12px;
}

.input-error {
  box-shadow: 0 0 0 2px var(--color-error);
}

.input-error label {
  color: var(--color-error);
}

</style>
