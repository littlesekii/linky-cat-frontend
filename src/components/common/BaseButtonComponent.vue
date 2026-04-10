<script setup lang="ts">
defineProps<{
  label: string,
}>();
</script>

<template>
<button class="button">
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
</style>
