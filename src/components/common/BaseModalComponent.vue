<script setup lang="ts">
import CrossSVG from '@/assets/icons/CrossSVG.vue';

defineProps<{
  title: string,
  isOpen: boolean
}>();

const emit = defineEmits(['close']);
</script>

<template>
<Teleport to="body">
  <div v-if="isOpen" class="modal-wrapper" @mousedown.self="emit('close')">
    <div class="modal-container">

      <div class="modal-header">
        <div style="width: 2rem; height: inherit;"></div>
        <h2 class="modal-title">
          {{ title }}
        </h2>
        <div class="modal-close-button" @click="emit('close')">
          <CrossSVG :size="24"/>
        </div>
      </div>

      <div class="modal-content">
        <slot></slot>
      </div>

    </div>
  </div>
</Teleport>
</template>

<style scoped>
.modal-wrapper {
  width: 100dvw;
  height: 100dvh;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #00000044;
}

.modal-container {
  width: 100%;
  max-width: 33.75rem;
  max-height: 33.75rem;

  overflow-y: auto;

  padding: 20px;
  margin: 30px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  background-color: var(--color-background);

  border-radius: 10px;

  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
}

.modal-header {
  height: 2rem;

  display: flex;
  align-items: center;
  gap: 25px;
}

.modal-title {
  flex-grow: 1;

  font-size: 16px;
  font-weight: 500;

  text-align: center;
}

.modal-close-button {
  width: 2rem;
  height: inherit;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;

  cursor: pointer;
}

.modal-close-button:hover {
  background-color: var(--color-highlight);
}

.modal-content {
  display: flex;
  flex-direction: column;
}

</style>
