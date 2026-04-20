<script setup lang="ts">
const props = defineProps(['size']);
</script>

<template>
  <svg :style="props.size" aria-hidden="true" viewBox="0 0 24 24">
    <path fill="#007c3e" d="m19.77 6.637-9.5 11.5-1.544-.004-4.5-5.5 1.548-1.266 3.73 4.558L18.23 5.363l1.54 1.274Z"></path>
  </svg>
</template>

<style scoped>
  svg {
    path {
      fill: #007c3e;
    }
  }
</style>
