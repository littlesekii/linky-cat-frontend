<script setup lang="ts">
import SignupFormComponent from '@/components/auth/SignupFormComponent.vue';


</script>

<template>
<main class="main">
  <section class="left-container">
    <SignupFormComponent class="form-component" />
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
