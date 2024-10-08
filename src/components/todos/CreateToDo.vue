<script setup>
import { ref } from 'vue'
import { useToDoStore } from '@/stores/toDosStore'

const store = useToDoStore()

const newTask = ref('')

const addTodo = async () => {
  if (newTask.value) {
    await store.addToDo(newTask.value)
    newTask.value = ''
  }
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <h3>Agregar nueva tarea</h3>
    <input v-model="newTask" placeholder="Nueva tarea" />
    <button type="submit">Agregar</button>
  </form>
</template>
  

  