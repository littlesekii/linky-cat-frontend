<script setup lang="ts">
import SignupFormComponent from '@/components/auth/SignupFormComponent.vue';


</script>

<template>
<main class="signup">
  <section class="left-container">
    <SignupFormComponent class="signup-form" />
  </section>
  <aside class="right-container">
    <!-- <img src="@/assets/images/a.svg" alt=""> -->
  </aside>
</main>
</template>

<style scoped>
.signup {
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

@media (max-width: 800px) {
    .right-container {
      display: none;
    }
  }
</style>
