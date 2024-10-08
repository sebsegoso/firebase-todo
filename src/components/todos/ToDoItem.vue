<script setup>
import { ref } from 'vue'
import { useToDoStore } from '@/stores/toDosStore.js'

const props = defineProps({
  todo: Object
})

const store = useToDoStore()
const isEditing = ref(false)
const editTask = ref(props.todo.task)

const startEdit = () => {
  isEditing.value = true
}
const saveEdit = async () => {
  isEditing.value = false
  await store.editToDo(props.todo.id, { task: editTask.value })
}

const toggleComplete = async (event) => {
  await store.editToDo(props.todo.id, { isCompleted: event.target.checked })
}

const deleteTodo = async () => {
  await store.deleteToDo(props.todo.id)
}
</script>

<template>
  <div>
    <input
      type="checkbox"
      :value="todo.isCompleted"
      :checked="todo.isCompleted"
      @change="toggleComplete"
    />
    <span v-if="!isEditing">{{ todo.task }}</span>
    <input v-else type="text" v-model="editTask" />
    <button @click="isEditing ? saveEdit() : startEdit()">
      {{ isEditing ? 'Guardar' : 'Editar' }}
    </button>
    <button @click="deleteTodo">Eliminar</button>
  </div>
</template>
  
 