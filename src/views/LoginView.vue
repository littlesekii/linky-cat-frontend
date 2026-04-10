<script setup lang="ts">
import LoginFormComponent from '@/components/auth/LoginFormComponent.vue';


</script>

<template>
<main class="login">
  <section class="left-container">
    <header class="header">
      <h1 class="title">Welcome back</h1>
      <p class="text">Log in to your account</p>
    </header>

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

  /* padding: 100px; */
}
.right-container {
  flex: 1;
  background-image: url('@/assets/images/b.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.header {
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
  color: #333;

  .title {
    margin-bottom: 15px;
    font-size: 45px;
    font-weight: bold;
    line-height: 45px;
  }
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
