<script setup lang="ts">
import BaseButtonComponent from '@/components/common/BaseButtonComponent.vue';
import { useAuth } from '@/composables/useAuth';

const { logout } = useAuth();

</script>

<template>
<div class="dashboard">
  <h1>Welcome to Dashboard</h1>
  <h3>We are currently under construction...</h3>
  <a @click.prevent="logout">Logout</a>
</div>
</template>


<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 10px;

  justify-content: center;
  align-items: center;

  min-height: inherit;
  background-color: aliceblue;
}
.dashboard h1 {
  font-size: 45px;
  font-weight: bold;
  line-height: 45px;
}

.dashboard a {
  cursor: pointer;
  text-decoration: underline;
}
</style>
