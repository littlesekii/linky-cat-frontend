<script setup lang="ts">
import { shallowRef } from 'vue';
import DashboardHeaderComponent from './interface/DashboardHeaderComponent.vue';
import DashboardSidebarComponent from './interface/DashboardSidebarComponent.vue';
import DashboardLinksSectionComponent from './sections/DashboardLinksSectionComponent.vue';
import DashboardDesignSectionComponent from './sections/DashboardDesignSectionComponent.vue';

const currentSection = shallowRef(DashboardLinksSectionComponent);

function onSectionChange(section: string) {

  if (section === 'links')
    currentSection.value = DashboardLinksSectionComponent;
  if (section === 'design')
    currentSection.value = DashboardDesignSectionComponent;
}

</script>

<template>
<div class="wrapper">
  <DashboardHeaderComponent />
  <div class="dashboard-container">
    <DashboardSidebarComponent class="dashboard-sidebar" @changeSection="(section) => onSectionChange(section)" />
    <keep-alive>
      <component :is="currentSection" />
    </keep-alive>
  </div>
</div>
</template>

<style scoped>
.wrapper {
  height: 100dvh;
  display: flex;
  flex-direction: column;
}

.dashboard-container {
  overflow-y: hidden;
  flex-grow: 1;
  display: flex;
}

@media (max-width: 800px) {
  .dashboard-sidebar {
    display: none;
  }
}

.dashboard-section {
  flex-grow: 1;
}
</style>
