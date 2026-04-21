<script setup lang="ts">
import ProfileComponent from '@/components/ProfileComponent.vue';
import { useProfile } from '@/composables/useProfile';
import router from '@/router';
import { onMounted } from 'vue';

const username: string = router.currentRoute.value.path.replace('/', '');

const { fetchByUsername, profile, isLoading } = useProfile();

onMounted(async () => {
  fetchByUsername(username);
});

</script>

<template>
<main class="profile">
    <div v-if="isLoading"></div>
    <ProfileComponent v-else-if="profile" />
    <div class="not-found" v-else>
      <h1>404 - Not Found</h1>
      <p>Why not make this page yours? <a href="/signup"> Signup to Linky Cat!</a></p>
    </div>
</main>
</template>

<style scoped>
.profile {
  min-height: inherit;
}

.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: inherit;

  font-size: 30px;
  font-weight: 700;

  color: #333;
}

.not-found p {
  font-size: 15px;
}
</style>
