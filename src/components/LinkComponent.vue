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
  display: inline-flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;
  padding: 15px 20px;
  cursor: pointer;

  background-color: #222;
  border: 2px solid #222;
  /* border-radius: 5px; */
}

.title {
  color: #FFF;
  font-weight: 500;
}

</style>
