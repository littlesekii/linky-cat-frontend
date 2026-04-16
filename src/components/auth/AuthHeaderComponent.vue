<script setup lang="ts">
defineProps<{
  title: string,
  subtitle?: string,
  textAlign?: 'left' | 'right' | 'center' | 'justify'
}>();
</script>

<template>
<header class="header" :style="'text-align: ' + textAlign || 'center'">
  <h1 class="title">{{ title }}</h1>
  <h2 class="subtitle">{{ subtitle }}</h2>
</header>
</template>

<style scoped>
.header {
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.title {
  margin-bottom: 15px;
  font-size: 45px;
  font-weight: bold;
  line-height: 45px;
}

.subtitle {
  font-size: 16px;
}

</style>
