<script setup lang="ts">
import { ref } from 'vue';

const model = defineModel<string>();

defineProps<{
  type?: string,
  label?: string,
  fixedLabel?: boolean
  fixedPadding?: number
}>();

const isFocused = ref(false);

</script>

<template>
<div class="input">
  <label
    class="label"
    :class="!fixedLabel && (isFocused || model && model.length > 0) ? 'label-moved' : ''"
    :for="label"
  >
    {{ label }}
  </label>
  <input
    :class="fixedLabel ? 'fixed-label-input' : 'default-label-input'"
    :style="fixedLabel ? `padding-left: ${fixedPadding}px` : ''"
    :id="label"
    v-model="model"
    :type="type || 'text'"
    @focusin="isFocused = true"
    @focusout="isFocused = false"
  >
</div>
</template>

<style scoped>
.input {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.label {
  font-size: 15px;
  position: absolute;
  padding: 0 13px;
  padding-top: 14px;

  cursor: text;
  color: #676B6F;

  transition: padding 0.2s, font-size 0.2s;
  user-select: none;
  -moz-user-select: none;
}

.label-moved {
  padding-top: 6px;
  font-size: 12px;
}

.input input {
  font-size: 15px;

  background-color: #ECEEEE;
  color: #18181A;

  border: none;
  border-radius: 10px;
}

.default-label-input {
  padding: 0 13px;
  padding-top: 22px;
  padding-bottom: 6px;
}

.fixed-label-input {
  padding: 14px;
}
</style>
