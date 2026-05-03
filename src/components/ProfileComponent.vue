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
  min-height: inherit;

  display: flex;
  flex-direction: column;

  background-color: var(--lc-black);
}

.container {
  width: 100%;
  max-width: 480px;

  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-self: center;

  margin-top: 60px;
  padding: 30px;
  gap: 1.5em;

  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  /* border: 2px solid var(--lc-black); */
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  background-color: var(--lc-white);
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
  gap: 15px;

  color: var(--color-text);
}

.header-image {
  width: 100px;
  height: 100px;

  align-self: center;

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
  gap: 10px;
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
  color: var(--color-text-secondary);
}
</style>
