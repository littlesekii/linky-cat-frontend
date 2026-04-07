<script setup lang="ts">
import { useProfile } from '@/composables/useProfile';
import LinkComponent from './LinkComponent.vue';

const { profile } = useProfile();
</script>

<template>
  <div class="profile-background">
    <div class="profile-container">

      <header class="profile-header">
        <div class="profile-image"></div>
        <div class="profile-info">
          <h1 class="profile-name">
            {{ profile?.displayName }}
          </h1>
          <!-- <p class="profile-username">
            @{{ username }}
          </p> -->
          <h2 class="profile-bio">
            {{ profile?.bio }}
          </h2>
        </div>
      </header>

      <nav class="profile-links">
        <ul v-if="profile?.links && profile.links.length > 0">
          <li v-for="link in profile?.links" :key="link.id">
            <LinkComponent :link="link" />
          </li>
        </ul>

        <div class="no-links" v-else>
          <p>No links yet.</p>
        </div>
      </nav>
    </div>
  </div>
</template>


<style scoped>
.profile-background {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  height: inherit;

  background-color: #222;
}

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

@media (max-width: 490px) {
  .profile-container {
    margin-top: 0px;
    min-height: 100dvh;
    border-radius: 0px;
  }
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

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

.no-links p {
  text-align: center;
}
</style>
