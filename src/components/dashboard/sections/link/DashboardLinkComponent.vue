<script setup lang="ts">
import DraggableSVG from '@/assets/icons/DraggableSVG.vue';
import EditSVG from '@/assets/icons/EditSVG.vue';
import TrashSVG from '@/assets/icons/TrashSVG.vue';
import type { LinkResponse } from '@/types/dto/LinkDTO';
import { ref } from 'vue';

const props = defineProps<{
  link: LinkResponse
}>();

const emit = defineEmits(['delete', 'edit', 'changeIsActive']);

const isActive = ref(props.link.isActive);

function onOptionActiveClick() {
  isActive.value = !isActive.value;
  emit('changeIsActive', isActive.value);
}

</script>

<template>
<div class="link-wrapper">
  <div class="link-drag">
    <DraggableSVG size="16" />
  </div>
  <div class="link-properties-grid">

    <div class="link-property-row">
      <button class="link-property" @click="emit('edit', 'title')">
        <p class="link-title">{{ link.title }}</p>
        <EditSVG size="16" />
      </button>
    </div>

    <div class="link-property-row">
      <button class="link-property" @click="emit('edit', 'url')">
        <p class="link-url">{{ link.url }}</p>
        <EditSVG size="16" />
      </button>
    </div>

    <div class="link-property-row">
      <div class="link-property">
        <p class="link-clicks">{{ link.clickCount }} clicks</p>
      </div>
    </div>

  </div>
  <div class="link-options">
    <button class="option-active" @click.prevent="onOptionActiveClick">
      <div class="switch-container" :class="isActive ? 'switch-active' : ''">
        <div class="switch-pin"></div>
      </div>
    </button>
    <button class="option-delete">
      <TrashSVG size="18" @click="emit('delete')" />
    </button>

  </div>
</div>
</template>


<style scoped>

button {
  background: none;
  border: none;
  cursor: pointer;
}

.link-wrapper {
  padding: 15px 0;
  padding-right: 15px;

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

.link-properties-grid {
  flex: 1;
  display: grid;
  grid-template-rows: repeat(3, minmax(0, max-content));
  gap: 5px;
}

.link-property-row {
  display: grid;
  grid-template-columns: minmax(0, max-content) minmax(0, max-content);
}

.link-property {
  display: flex;
  align-items: center;
  gap: 5px;

  font-size: 14px;
  color: var(--color-text);
}

.link-title {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-weight: 600;
}

.link-url {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.link-clicks {
  color: var(--color-text-secondary);
}

.link-options {
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;
}

.switch-container {
  width: 36px;
  height: 18px;

  display: flex;
  align-items: center;

  background-color: var(--lc-black-soft);

  border-radius: 1em;
}

.switch-pin {
  height: 14px;
  width: 14px;

  margin: 2px;

  background-color: var(--color-background);
  transition: all 0.1s ease;

  border-radius: 100%;
}

.switch-active {
  background-color: var(--color-success);
}

.switch-active > .switch-pin {
  translate: 18px;
}
</style>
