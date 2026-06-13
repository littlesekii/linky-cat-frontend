<script setup lang="ts">
import LinkSVG from '@/assets/icons/LinkSVG.vue';
import ProfileSVG from '@/assets/icons/ProfileSVG.vue';
import { ref } from 'vue';

const emit = defineEmits(['changeSection']);

interface SidebarSection {
  id: string;
  label: string;
  icon: unknown;
}

const sections: SidebarSection[] = [
  { id: 'links', label: 'Links', icon: LinkSVG },
  { id: 'design', label: 'Design', icon: ProfileSVG },
];

const currentSection = ref(sections[0]?.id);

function onSectionChange(sectionId: string) {
  currentSection.value = sectionId;
  emit('changeSection', sectionId);
}

</script>

<template>
<aside class="sidebar-wrapper">
  <nav class="navigator">
    <button
      v-for="section in sections"
      :key="section.id"
      :class="['button', { 'active': currentSection === section.id }]"
      @click="onSectionChange(section.id)"
    >
      <component :is="section.icon" size="18" /> {{ section.label }}
    </button>
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
.button.active {
  background-color: var(--color-highlight);
  font-weight: 600;
}
.button:hover {
  background-color: var(--color-highlight-strong);
}
</style>
