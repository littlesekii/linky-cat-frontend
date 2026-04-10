<script setup lang="ts">
import BaseButtonComponent from '../common/BaseButtonComponent.vue';
import BaseInputComponent from '../common/BaseInputComponent.vue';
</script>

<template>
<form class="form" action="">
  <div class="inputs">
    <BaseInputComponent label="Username" type="text" />
    <BaseInputComponent label="Password" type="password" />
  </div>
  <BaseButtonComponent label="LOGIN" />
</form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
