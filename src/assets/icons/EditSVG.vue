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
      d="M14.8587 9.76096L18.1717 6.44803L18.1727 6.44704C18.6295 5.99035 18.8579 5.76191 18.9435 5.49841C19.0188 5.26646 19.0189 5.01661 18.9435 4.78466C18.8578 4.52097 18.629 4.29219 18.1717 3.83483L16.1624 1.82557C15.707 1.37018 15.4788 1.14202 15.2157 1.05653C14.9837 0.981158 14.7339 0.981158 14.5019 1.05653C14.2386 1.14208 14.0101 1.3705 13.5542 1.82654L13.5521 1.82851L10.2392 5.14146L1 14.3805V19H5.61958L14.8587 9.76096ZM10.2392 5.14146L14.8587 9.76096"
      stroke="currentColor"
      stroke-width="2.05315"
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
