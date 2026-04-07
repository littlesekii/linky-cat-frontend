<script setup lang="ts">
import type { Link } from '@/types/types';

defineProps<{link:Link}>();
</script>

<template>
<a class="link-wrapper" :href="link.url" target="_blank">
  <p class="link-title">{{ link.title }}</p>
</a>
</template>

<style scoped>

.link-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 10px 20px;
  cursor: pointer;

  background-color: #222;
  border: 2px solid #222;
  /* border-radius: 5px; */


  .link-title {
    color: #FFF;
    font-weight: 500;
  }
}

</style>
