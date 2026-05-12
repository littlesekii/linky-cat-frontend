<script setup lang="ts">
import { computed, ref } from 'vue';

const model = defineModel<string>();

const props = defineProps<{
  isLoading?: boolean,
  type?: string,
  label?: string,
  errorMessage?: string,
  fixedLabel?: boolean
  fixedPadding?: number,
  maxLength?: number
}>();

const isFocused = ref(false);

const inputId = computed(() => props.label?.toLowerCase());

const inputClasses = computed(() => ({
  'shake-animation': props.errorMessage,
  'input-error': props.errorMessage,
  'textarea-label': props.type === 'textarea',
  'fixed-label': props.fixedLabel,
  'default-label': !props.fixedLabel,
  'label-moved' : !props.fixedLabel && (isFocused.value || model.value && model.value.length > 0)
}));

const setFocus = () => {
  if (inputId.value) {
    document.getElementById(inputId.value)?.focus();
  }
};

defineExpose({ setFocus });

</script>

<template>
<div class="input-wrapper">
  <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
  <div class="input-container" :class="inputClasses">
    <label
      :for="inputId"
    >
      {{ label }}
    </label>
    <input
      class="input"
      v-if="type !== 'textarea'"
      :style="fixedLabel ? `padding-left: ${fixedPadding}px` : ''"
      :id="inputId"
      v-model="model"
      :type="type || 'text'"
      :maxlength="maxLength"
      @focusin="isFocused = true"
      @focusout="isFocused = false"
    >
    <textarea
      class="input"
      v-else-if="type === 'textarea'"
      :name="label"
      :id="inputId"
      v-model="model"
      :maxlength="maxLength"
      @focusin="isFocused = true"
      @focusout="isFocused = false"
    >
    </textarea>
    <img v-if="isLoading" class="loading-icon" src="@/assets/loading-small.svg">
  </div>
  <p class="max-length" v-if="maxLength">{{ model?.length ?? 0 }}/{{ maxLength }}</p>
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
  font-weight: 500;
}

.max-length {
  text-align: right;
  font-size: 12px;
  font-weight: 400;
  color: var(--color-text-secondary);
}

.input-container {
  min-height: 3rem;

  position: relative;

  display: flex;

  background-color: var(--color-highlight);
  color: var(--color-text);

  border: none;
  border-radius: 10px;
}

.input-container label {
  width: 100%;

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

.input-container input {
  flex: 1;
  font-size: 14px;
  outline: none;

  border: inherit;
  background-color: inherit;
  border-radius: inherit;
}

.input-container textarea {
  min-height: 4rem;

  margin-top: 24px;
  padding: 0 13px;

  flex: 1;
  font-size: 14px;
  outline: none;

  border: inherit;
  background-color: inherit;
  border-radius: inherit;
}

/* remove autocomplete background */
.input-container input:-webkit-autofill,
.input-container input:-webkit-autofill:hover,
.input-container input:-webkit-autofill:focus,
.input-container input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px var(--color-highlight) inset !important;
}

.input-container:hover {
  box-shadow: 0 0 0 2px var(--lc-gray);
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
  box-shadow: 0 0 0 2px var(--color-error) !important;
}

.input-error label {
  color: var(--color-error);
}

</style>
