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
      d="M2 4H18M14 4L13.7294 3.18807C13.4671 2.40125 13.3359 2.00784 13.0927 1.71698C12.8779 1.46013 12.6021 1.26132 12.2905 1.13878C11.9376 1 11.523 1 10.6936 1H9.3064C8.477 1 8.0624 1 7.70951 1.13878C7.39792 1.26132 7.12208 1.46013 6.90729 1.71698C6.66405 2.00784 6.53292 2.40125 6.27064 3.18807L6 4M16 4V14.2C16 15.8802 16 16.7202 15.673 17.362C15.3854 17.9265 14.9265 18.3854 14.362 18.673C13.7202 19 12.8802 19 11.2 19H8.8C7.11984 19 6.27976 19 5.63803 18.673C5.07354 18.3854 4.6146 17.9265 4.32698 17.362C4 16.7202 4 15.8802 4 14.2V4M12 8V15M8 8V15"
      stroke-width="2"
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
