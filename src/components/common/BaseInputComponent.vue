<script setup lang="ts">
defineProps<{
  label: string,
  type?: string,
  placeholder?: string
}>();
</script>

<template>
<div class="input">
  <label :for="label">{{ label }}</label>
  <input
    :id="label"
    :type="type || 'text'"
    :placeholder="placeholder">
</div>
</template>

<style scoped>
.input {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input label {
  font-weight: 600;
  color: #333;
}

.input input {
  font-size: 14px;
  padding: 13px;

  border: none;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}
</style>
