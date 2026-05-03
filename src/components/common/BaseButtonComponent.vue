<script setup lang="ts">
defineProps<{
  label: string,
  disabled?: boolean
  type?: 'button' | 'submit'
}>();
</script>

<template>
<button class="button" :type="type || 'button'" :disabled="disabled">
  {{ label }}
</button>
</template>

<style scoped>
.button {
  width: 100%;
  height: 3rem;

  color: var(--lc-white);
  background-color: var(--color-primary);

  font-weight: 500;
  font-size: 16px;

  border: none;
  border-radius: 10px;

  cursor: pointer;
}
.button:disabled {
  color: var(--color-text);
  background-color: var(--color-disabled);
  cursor: default;
}
</style>
