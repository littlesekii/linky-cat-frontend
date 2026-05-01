<script setup lang="ts">
import LoginFormComponent from '@/components/auth/LoginFormComponent.vue';


</script>

<template>
<main class="main">
  <section class="left-container">
    <LoginFormComponent class="form-component" />
  </section>
  <aside class="right-container">
    <!-- <img src="@/assets/images/a.svg" alt=""> -->
  </aside>
</main>
</template>

<style scoped>
.main {
  min-height: inherit;
  display: flex;
}

.left-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-component {
  max-width: 540px;
  padding: 0 20px;
}

.right-container {
  flex: 1;
  background-image: url('@/assets/images/b.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

@media (max-width: 800px) {
    .right-container {
      display: none;
    }
  }
</style>
