<script setup lang="ts">
import LinkSVG from '@/assets/icons/LinkSVG.vue';
import ProfileSVG from '@/assets/icons/ProfileSVG.vue';


</script>

<template>
<aside class="sidebar-wrapper">
  <nav class="navigator">
    <button class="button"><ProfileSVG size="18" /> Profile</button>
    <button class="button"><LinkSVG size="18" /> Links</button>
    <!-- <button class="button">Style</button> -->
  </nav>
</aside>
</template>


<style scoped>
.sidebar-wrapper {
  overflow-y: auto;
  min-width: 13.750rem;
  border-right: 1px solid var(--lc-white-mute);
}
.navigator {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
}

.button {
  height: 2.5rem;
  padding: 0px 10px;

  display: flex;
  align-items: center;
  gap: 10px;

  border: none;
  border-radius: 10px;

  background: none;
  color: var(--color-text);

  font-size: 14px;
  font-weight: 450;
  text-align: left;

  cursor: pointer;

  transition: background 0.3s ease;
}
.button:hover {
  background-color: var(--color-highlight-strong);
}
</style>
