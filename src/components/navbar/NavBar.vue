<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useToDoStore } from '@/stores/toDosStore'
import LoginWithGoogleBtn from '@/components/auth/LoginWithGoogleBtn.vue'
import LogoutBtn from '@/components/auth/LogoutBtn.vue'

const authStore = useAuthStore()
const toDosStore = useToDoStore()
const user = computed(() => authStore.user)
</script>

<template>
  <nav>
    <RouterLink :to="{ name: 'home' }">Home</RouterLink>
    <RouterLink v-if="user" :to="{ name: 'completed' }"
      >Tareas completadas ({{ toDosStore.completedTodos?.length || 0 }})</RouterLink
    >
    <RouterLink v-if="user" :to="{ name: 'pending' }"
      >Tareas pendientes ({{ toDosStore.pendingTodos?.length || 0 }})</RouterLink
    >
    <LogoutBtn v-if="user" />
    <LoginWithGoogleBtn v-else />
  </nav>
</template>

<style>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>