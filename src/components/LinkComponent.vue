<script setup lang="ts">
import type { Link } from '@/types/types';

defineProps<{link:Link}>();
</script>

<template>
<a class="wrapper" :href="link.url" target="_blank">
  <p class="title">{{ link.title }}</p>
</a>
</template>

<style scoped>

.wrapper {
  width: inherit;
  height: 3.375rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;
  padding: 15px 20px;
  cursor: pointer;

  background-color: var(--lc-black);
  /* border-radius: 5px; */
}

.title {
  color: var(--lc-white);
  font-weight: 500;
}

</style>
