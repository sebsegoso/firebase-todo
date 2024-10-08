<script setup>
import { computed, onMounted } from 'vue'
import ToDoItem from './ToDoItem.vue'
import { useToDoStore } from '@/stores/toDosStore'
const toDosStore = useToDoStore()

const { filter } = defineProps({
  title: String,
  filter: {
    default: 'all',
    type: String
  }
})

const filteredTodos = computed(() => {
  switch (filter) {
    case 'completed':
      return toDosStore.completedTodos // Cambiado a toDosStore
    case 'pending':
      return toDosStore.pendingTodos // Cambiado a toDosStore
    default:
      return toDosStore.todos // Se mantiene
  }
})

onMounted(async () => {
  await toDosStore.fetchToDos() // Cargar tareas al montarse
})
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <ul v-if="filteredTodos.length">
      <li v-for="todo in filteredTodos" :key="todo.id">
        <ToDoItem :todo="todo" />
      </li>
    </ul>
    <p v-else-if="toDosStore.loading">Cargando...</p>
    <p v-else>No hay tareas que mostrar</p>
  </div>
</template>
