<script setup lang="ts">
defineProps<{
  textAlign?: 'left' | 'right' | 'center' | 'justify'
}>();
</script>

<template>
<header class="header-wrapper" :style="'text-align: ' + (textAlign ?? 'center')">
  <h1 class="title">
    <slot name="title"></slot>
  </h1>
  <h2 class="subtitle">
    <slot name="subtitle"></slot>
  </h2>
</header>
</template>

<style scoped>
.header-wrapper {
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 15px;

  color: var(--color-text);
}

.title {
  font-size: 42px;
  line-height: 42px;

  font-weight: 800;
}

.subtitle {
  font-size: 16px;
}

</style>
