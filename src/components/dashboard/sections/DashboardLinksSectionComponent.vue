<script setup lang="ts">
import DraggableSVG from '@/assets/icons/DraggableSVG.vue';
import EditSVG from '@/assets/icons/EditSVG.vue';
import BaseButtonComponent from '@/components/common/BaseButtonComponent.vue';


</script>

<template>
<section class="dashboard-section">
  <div class="test">
    <h1 class="title">Links</h1>

    <!-- <div class="profile">

    </div> -->

    <BaseButtonComponent label="Add new" />

    <div class="link-container">
      <div class="link-drag">
        <DraggableSVG size="16" />
      </div>
      <div class="link-properties">
        <p class="link-title">Title <EditSVG size="16" /></p>
        <p class="link-url">https://teste.com <EditSVG size="16" /></p>
        <p class="link-clicks">0 clicks</p>
      </div>
    </div>

  </div>
  <div class="preview">
    <iframe src="http://localhost:2001/littlesekii"></iframe>
  </div>
</section>
</template>


<style scoped>
.dashboard-section {
  overflow-y: auto;

  display: flex;

  background-color: var(--color-highlight);
}
.test {
  padding: 30px;

  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.preview {
  padding: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-left: 1px solid var(--lc-white-mute);
}

.preview iframe {
  height: 70%;

  border: 1px solid var(--lc-white-mute);
  border-radius: 10px;
}

.title {
  color: var(--color-text);
  font-size: 24px;
  font-weight: 600;
}

.link-container {
  padding: 15px 0;

  display: flex;
  gap: 15px;

  background-color: var(--color-background);

  border: 1px solid var(--lc-white-mute);
  border-radius: 10px;
}

.link-drag {
  padding: 0 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
}

.link-properties {
  display: flex;
  flex-direction: column;
  gap: 5px;

  font-size: 14px;
  color: var(--color-text);
}
.link-title {
  align-self: flex-start;

  display: flex;
  gap: 5px;

  font-weight: 600;

  cursor: pointer;
}
.link-url {
  align-self: flex-start;

  display: flex;
  gap: 5px;

  cursor: pointer;
}
.link-clicks {
  color: var(--color-text-secondary);
}
</style>
