<script setup>
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
</script>

<template>
  <button @click="authStore.logoutUser" type="button">Cerrar sesión</button>
</template>

<style scoped>
button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>