<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import LoginWithGoogleBtn from '@/components/auth/LoginWithGoogleBtn.vue'
import ToDoList from '@/components/todos/ToDoList.vue'
import CreateToDo from '@/components/todos/CreateToDo.vue'
import { useToDoStore } from '@/stores/toDosStore'
const authStore = useAuthStore()
const toDosStore = useToDoStore()
const user = computed(() => authStore.user)
</script>

<template>
  <main>
    <div v-if="!user">
      <h3>Debes iniciar sesión para poder usar la app</h3>
      <LoginWithGoogleBtn />
    </div>
    <div v-else>
      <CreateToDo />
      <ToDoList title="Mis tareas" :todos="toDosStore.todos" />
    </div>
  </main>
</template>
