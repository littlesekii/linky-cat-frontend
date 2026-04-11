<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';

const { logout } = useAuth();

</script>

<template>
<div>
  Dashboard <button @click="logout">logout</button>
</div>
</template>


<style scoped>
</style>
