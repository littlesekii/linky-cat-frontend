<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';
import { useAuthStore } from '@/stores/useAuthStore';
import { ref } from 'vue';

const { login, isLoading } = useAuth();

const username = ref('');
const password = ref('');

function executeLogin() {
  login({ username: username.value, password: password.value });
}

</script>

<template>
<div class="background">
  <div class="container">
    <form class="form" @submit.prevent="executeLogin">
      <div class="input-group">
        <label for="username">Username</label>
        <input v-model="username" id="username" type="text">
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input v-model="password" id="password" type="password">
      </div>
      <button class="submit-button">LOGIN</button>
      <div style="word-wrap: break-word;">{{ useAuthStore().token }}</div>
    </form>
  </div>
</div>
</template>

<style scoped>

.background {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


  min-height: inherit;
  /* background-color: aliceblue; */
}

.container {
  width: 100%;
  max-width: 460px;

  padding: 30px;


  background-color: #FFF;
  /* border: 2px solid #333; */
  border-radius: 15px;

  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  margin-bottom: 5px;
  color: #222;
  font-weight: 600;
}

.input-group input {
  padding: 12px 10px;

  border: none;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}

.submit-button {
  padding: 12px 10px;
  margin-top: 15px;

  color: #222;
  font-weight: 600;
  cursor: pointer;

  border: none;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}
</style>
