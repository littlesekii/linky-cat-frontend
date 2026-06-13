<script setup lang="ts">
import { ref, onBeforeUnmount, nextTick, useTemplateRef } from 'vue';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const imageRef = useTemplateRef('image');

const cropperInstance = ref<Cropper | null>(null);
const imageUrl = ref<string>('');

const prepare = (image: File) : void => {
  if (!image)
    return;

  // 1. Limpa a instância anterior para evitar sobreposição
  if (cropperInstance.value) {
    cropperInstance.value.destroy();
  }

  // 2. Cria uma URL temporária na memória do navegador
  imageUrl.value = URL.createObjectURL(image);

  // 3. O nextTick brilha aqui: garante que a tag <img> com o novo src
  // já foi renderizada pelo Vue antes de instanciar o Cropper
  nextTick(() => {
    if (imageRef.value) {
      cropperInstance.value = new Cropper(imageRef.value, {
        aspectRatio: 1, // Mude para 16/9, 4/3, etc., conforme seu design
        viewMode: 1,
        autoCropArea: 1,
        minCropBoxWidth: 100,
        background: true,
        zoomable: false
      });
    }
  });
};

const crop = () : Promise<Blob | null> => {
  return new Promise((resolve) => {
    if (!cropperInstance.value) {
      resolve(null);
      return;
    }

    const canvas = cropperInstance.value.getCroppedCanvas({
      width: 300,
      height: 300
    });

    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/jpeg', 0.9);

  });
};

// 4. Limpeza de memória: crucial em SPAs e Dashboards
onBeforeUnmount(() => {
  if (cropperInstance.value) {
    cropperInstance.value.destroy();
  }
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value);
  }
});

defineExpose({ prepare, crop });
</script>

<template>
  <div class="cropper-wrapper">
    <div v-if="imageUrl" class="image-container">
      <img ref="image" :src="imageUrl" alt="Image crop preview" />
    </div>
  </div>
</template>

<style scoped>
.cropper-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 500px;
}

.image-container {
  width: 100%;
  max-height: 400px;
}

.image-container img {
  display: block;
  max-width: 100%;
}
</style>
