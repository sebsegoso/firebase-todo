<script setup>
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
</script>

<template>
  <button @click="authStore.login" type="button">Iniciar sesión con google</button>
</template>

<style scoped>
button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>