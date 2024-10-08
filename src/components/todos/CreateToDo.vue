<script setup>
import { ref } from 'vue'
import { useToDoStore } from '@/stores/toDosStore'

const store = useToDoStore()
const loading = ref(false)
const newTask = ref('')

const addTodo = async () => {
  if (newTask.value) {
    loading.value = true
    await store.addToDo(newTask.value)
    newTask.value = ''
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <h3>Agregar nueva tarea</h3>
    <input v-model="newTask" placeholder="Nueva tarea" :disabled="loading.value" />
    <button type="submit" :disabled="loading.value">Agregar</button>
  </form>
</template>
  

  