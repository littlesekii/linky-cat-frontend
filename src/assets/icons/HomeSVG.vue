<script setup lang="ts">
const props = defineProps(['size']);
</script>

<template>
  <svg
    :style="`width: ${props.size}px`"
    aria-hidden="true"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 8.41177L10 1L19 8.41177V19H13.375V14.7647C13.375 13.9223 13.0194 13.1143 12.3865 12.5186C11.7535 11.9229 10.8951 11.5882 10 11.5882C9.10484 11.5882 8.24647 11.9229 7.61352 12.5186C6.98059 13.1143 6.62501 13.9222 6.62501 14.7647V19H1.00001L1 8.41177Z"
      stroke="currentColor"
      stroke-width="1.875"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<style scoped>
  svg {
    path {
      stroke: var(--color-text);
    }
  }
</style>
