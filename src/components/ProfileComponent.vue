<script setup lang="ts">
import { useProfile } from '@/composables/useProfile';
import LinkComponent from './LinkComponent.vue';

const { profile } = useProfile();
</script>

<template>
<div class="background">
  <div class="container">

    <header class="header">
      <div class="header-image"></div>
      <div class="header-info">
        <h1 class="header-info-name">
          {{ profile?.displayName }}
        </h1>
        <!-- <p class="profile-username">
          @{{ username }}
        </p> -->
        <h2 class="header-info-bio">
          {{ profile?.bio }}
        </h2>
      </div>
    </header>

    <nav class="links">
      <ul v-if="profile?.links && profile.links.length > 0">
        <li v-for="link in profile?.links" :key="link.id">
          <LinkComponent :link="link" />
        </li>
      </ul>

      <div class="links-empty" v-else>
        <p>No links yet.</p>
      </div>
    </nav>
  </div>
</div>
</template>


<style scoped>
.background {
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: inherit;

  background-color: #222;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: calc(100dvh - 60px);

  margin-top: 60px;
  padding: 30px;
  gap: 1.5em;

  width: 100%;
  max-width: 490px;

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  background-color: #ffffff;
}

@media (max-width: 490px) {
  .container {
    margin-top: 0px;
    min-height: 100dvh;
    border-radius: 0px;
  }
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  width: 100%;

  color: #333;
}

.header-image {
  width: 100px;
  height: 100px;

  border-radius: 100%;

  background-image: url("@/assets/profile.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.header-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-info h1 {
  font-size: 24px;
  font-weight: 700;

  text-align: center;
}

.header-info-username {
  font-size: 12pt;
}

.header-info h2 {
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}

.links {
  width: 100%;
}

.links ul {
  display: flex;
  flex-direction: column;
  gap: 10px;

  list-style: none;
}

.links li {
  width: 100%;
}

.links-empty p {
  text-align: center;
  color: #666;
}
</style>
