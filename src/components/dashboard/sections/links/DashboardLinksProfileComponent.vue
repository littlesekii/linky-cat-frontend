<script setup lang="ts">
import type { ProfileResponse } from '@/types/dto/ProfileDTO';
import { useTemplateRef } from 'vue';

const props = defineProps<{
  profile: ProfileResponse
}>();

const fileInput = useTemplateRef('file-input');

const emit = defineEmits(['edit', 'changeProfileImage']);

function onFileInputChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files && files.length > 0) {
    const selectedFile = files[0];
    emit('changeProfileImage', selectedFile);
  }
}
</script>

<template>
<div class="profile-wrapper">
  <div class="profile-image" @click="fileInput?.click" :style="`background-image: url('${props.profile.imageUrl}')`"></div>
  <input
      ref="file-input"
      type="file"
      accept="image/*"
      @change="onFileInputChange"
      v-show="false"
    />

  <div class="profile-properties-grid">
    <div class="profile-property-row">
      <button class="profile-property" @click="emit('edit', 'displayName')">
        <p class="profile-name">{{ props.profile.displayName }}</p>
      </button>
    </div>

    <div class="profile-property-row">
      <button class="profile-property" @click="emit('edit', 'bio')">
        <p class="profile-bio">{{ props.profile.bio }}</p>
      </button>
    </div>
  </div>


</div>
</template>


<style scoped>

button {
  display: inline-block;
  background: none;
  border: none;
  cursor: pointer;
}

button:hover {
  text-decoration: underline;
}

.profile-wrapper {
  /* padding: 15px 0; */
  padding-right: 15px;

  display: flex;
  align-items: center;
  gap: 15px;
}

.profile-image {
  width: 76px;
  height: 76px;

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  border-radius: 100%;
}

.profile-properties-grid {
  flex: 1;
  display: grid;
  grid-template-rows: repeat(3, minmax(0, max-content));
  gap: 5px;
}

.profile-property-row {
  display: grid;
  grid-template-columns: minmax(0, max-content) minmax(0, max-content);
}

.profile-property {
  text-align: left;

  color: var(--color-text);
  font-size: 14px;
}

.profile-name {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-weight: 600;
}

.profile-bio {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: var(--color-text-secondary);
}

</style>
