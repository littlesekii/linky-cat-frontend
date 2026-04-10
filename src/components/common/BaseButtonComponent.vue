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
  padding: 13px;

  color: white;
  background-color: #4E2F68;

  font-weight: 600;
  font-size: 14px;

  border: 1px solid #4E2F68;
  border-radius: 10px;

  cursor: pointer;
}
.button:disabled {
  color: #666;
  background-color: #DDD;
  border: 1px solid #DDD;
  cursor: default;
}
</style>
