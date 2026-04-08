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
    <div v-if="isLoading">Loading...</div>
    <ProfileComponent v-else-if="profile" />
    <div v-else> 404 - Not Found</div>
</main>
</template>

<style scoped>
.profile {
  min-height: inherit;
}
</style>
