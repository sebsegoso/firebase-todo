<script setup>
import { useAuthStore } from '@/stores/authStore'
import LoginWithGoogleBtn from '@/components/auth/LoginWithGoogleBtn.vue'
import LogoutBtn from '@/components/auth/LogoutBtn.vue'
import { computed } from 'vue'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>

<template>
  <main>
    <h1>To do app</h1>
    <h2>Una app para almacenar tus pendientes</h2>
    <hr />
    <div v-if="user">
      Ya iniciaste sesión
      <LogoutBtn />
    </div>
    <div v-else>
      <h3>Debes iniciar sesión para poder usar la app</h3>
      <LoginWithGoogleBtn />
    </div>
  </main>
</template>
