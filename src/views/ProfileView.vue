<script setup lang="ts">
import LinkComponent from '@/components/LinkComponent.vue';
import router from '@/router';
import type { Profile } from '@/types/types';
import { onMounted, ref } from 'vue';

const username: string = router.currentRoute.value.path.replace('/', '');

const profileData = ref<Profile>();

onMounted(async () => {
  const res = await fetch(`http://localhost:1001/api/profiles/${username}`);
  const data = await res.json();

  profileData.value = {
    displayName: data.displayName,
    bio: data.bio,
    links: data.links
  };
});

</script>

<template>
<main class="profile">

  <header class="profile-header">
    <p class="profile-name">
      {{ profileData?.displayName }}
    </p>
    <p class="profile-bio">
      {{ profileData?.bio }}
    </p>
  </header>

  <div class="profile-links">
    <LinkComponent
      v-for="link in profileData?.links"
      :key="link.id"
      :link="link"
    />
  </div>

</main>
</template>

<style scoped>

.profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.profile-header {
  display: flex;
  flex-direction: column;

  padding: 10px;

  .profile-name {
    display: flex;
    justify-content: center;
  }
  .profile-bio {
    display: flex;
    justify-content: center;
  }
}

.profile-links {
  display: flex;
  flex-direction: column;

  margin: 10px;
  width: 400px;
  gap: 10px;

  }
</style>
