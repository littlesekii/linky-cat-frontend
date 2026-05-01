<script setup lang="ts">

</script>

<template>
<button class="back-button"> &larr; Back</button>
</template>

<style scoped>
.back-button {
  display: inline-flex;
  align-self: flex-start;

  padding: 8px 10px;

  color: var(--color-primary);
  font-size: 16px;
  font-weight: 600;

  background: none;

  border-radius: 20px;
  border: none;

  cursor: pointer;
}

.back-button:hover {
  background-color: var(--color-highlight);
}
</style>
