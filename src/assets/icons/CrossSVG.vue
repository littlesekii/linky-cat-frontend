<script setup lang="ts">
const props = defineProps(['size']);
</script>

<template>
  <svg
    :style="`width: ${props.size}px`"
    aria-hidden="true"
    viewBox="0 0 32 32"
  >
    <path d="M18.8 16l5.5-5.5c.8-.8.8-2 0-2.8l0 0c-.4-.4-.9-.7-1.4-.7s-1 .2-1.4.6L16 13.2l-5.5-5.5c-.8-.8-2.1-.8-2.8 0-.4.4-.7.9-.7 1.5s.2 1 .6 1.4l5.5 5.5-5.5 5.5c-.4.4-.7.9-.7 1.5 0 .5.2 1 .6 1.4.4.4.9.6 1.4.6s1-.2 1.4-.6l5.5-5.5 5.5 5.5c.8.8 2.1.8 2.8 0 .8-.8.8-2.1 0-2.8L18.8 16z"></path>
  </svg>
</template>

<style scoped>
  svg {
    path {
      fill: var(--color-text);
    }
  }
</style>
