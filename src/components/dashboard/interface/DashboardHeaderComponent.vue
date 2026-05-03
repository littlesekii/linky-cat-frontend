<script setup lang="ts">

</script>

<template>
<header class="header-wrapper">
  <div class="logo">
    <img
      src="@/assets/linkycat-logo.png"
      alt="Link Cat logo which is a pixelated cat image."
      height="32"
    >
    <p>LINKYCAT</p>
  </div>
</header>
</template>


<style scoped>
.header-wrapper {
  min-height: 4.375rem;
  display: flex;
  padding: 0 30px;

  border-bottom: 1px solid var(--lc-white-mute);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;

}
.logo p {
  color: var(--color-text);
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 5px;
}

</style>
