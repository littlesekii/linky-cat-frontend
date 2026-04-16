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

  font-weight: 700;
  font-size: 16px;

  border: none;
  border-radius: 100px;

  cursor: pointer;
}
.button:disabled {
  color: #3B3D40;
  background-color: #CACCCE;
  cursor: default;
}
</style>
