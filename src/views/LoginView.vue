<script setup lang="ts">
import LoginFormComponent from '@/components/auth/LoginFormComponent.vue';


</script>

<template>
<main class="login">
  <section class="left-container">
    <LoginFormComponent class="login-form" />
  </section>
  <aside class="right-container">
    <!-- <img src="@/assets/images/a.svg" alt=""> -->
  </aside>
</main>
</template>

<style scoped>
.login {
  display: flex;
  min-height: inherit;
}

.left-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.right-container {
  flex: 1;
  background-image: url('@/assets/images/b.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.login-form {
  width: 100%;
  max-width: 500px;

  padding: 0 20px;
}

@media (max-width: 800px) {
    .right-container {
      display: none;
    }
  }
</style>
