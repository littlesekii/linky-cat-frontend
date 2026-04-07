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

  <div class="profile-container">

    <header class="profile-header">
      <div class="profile-image"></div>
      <div class="profile-info">
        <h1 class="profile-name">
          {{ profileData?.displayName }}
        </h1>
        <!-- <p class="profile-username">
          @{{ username }}
        </p> -->
        <h2 class="profile-bio">
          {{ profileData?.bio }}
        </h2>
      </div>
    </header>

    <nav class="profile-links">
      <ul>
        <li v-for="link in profileData?.links" :key="link.id">
          <LinkComponent :link="link" />
        </li>
      </ul>
    </nav>

  </div>

</main>
</template>

<style scoped>

.profile {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  height: inherit;

  background-color: #222;

  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    min-height: calc(100dvh - 30px);

    margin-top: 30px;
    padding: 30px;
    gap: 1.5em;

    width: 100%;
    max-width: 490px;

    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    background-color: #ffffff;
  }
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;

  color: #222;

  .profile-image {
    width: 100px;
    height: 100px;

    border-radius: 100%;

    background-image: url("@/assets/profile.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .profile-info {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 5px;

    .profile-name {
      font-size: 24px;
      font-weight: 600;

      text-align: center;
    }

    .profile-username {
      font-size: 12pt;
    }

    .profile-bio {
      font-size: 16px;
      font-weight: 400;
      text-align: center;
    }
  }
}

.profile-links {
  width: 100%;
}

.profile-links ul {
  display: flex;
  flex-direction: column;
  gap: 10px;

  list-style: none;
}

.profile-links li {
  width: 100%;
}


</style>
