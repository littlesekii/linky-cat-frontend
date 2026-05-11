<script setup lang="ts">
import BaseButtonComponent from '@/components/common/BaseButtonComponent.vue';
import BaseModalComponent from '@/components/common/BaseModalComponent.vue';

defineProps<{
  title: string,
  cancelText?: string
  confirmText?: string
}>();

const emit = defineEmits(['close', 'confirm']);
</script>

<template>
<BaseModalComponent :title="title" :is-open="true" @close="emit('close')">
  <div class="modal">
    <BaseButtonComponent class="cancel-button" :label="cancelText || 'Cancel'" @click="emit('close')" />
    <BaseButtonComponent :label="confirmText || 'Confirm'" @click="emit('confirm')" />
  </div>
</BaseModalComponent>
</template>


<style scoped>
.modal {
  display: flex;
  gap: 10px;
}

.cancel-button {
  background-color: var(--lc-background);
  color: var(--color-primary);

  box-shadow: inset 0 0 0 2px var(--color-primary);
}
</style>
