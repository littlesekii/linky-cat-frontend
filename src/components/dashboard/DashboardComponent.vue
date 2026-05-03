<script setup lang="ts">
import DashboardHeaderComponent from './interface/DashboardHeaderComponent.vue';
import DashboardSidebarComponent from './interface/DashboardSidebarComponent.vue';
import DashboardLinksSectionComponent from './sections/DashboardLinksSectionComponent.vue';


</script>

<template>
<div class="wrapper">
  <DashboardHeaderComponent />
  <div class="dashboard-container">
    <DashboardSidebarComponent class="dashboard-sidebar" />
    <DashboardLinksSectionComponent class="dashboard-section" />
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
