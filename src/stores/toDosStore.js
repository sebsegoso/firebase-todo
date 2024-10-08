import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { ToDosService } from '@/services/toDos.service'

export const useToDoStore = defineStore('todo', () => {
  const service = new ToDosService()
  const todos = ref([])
  const loading = ref(false)

  // Getters
  const completedTodos = computed(() => todos.value.filter((todo) => todo.isCompleted))
  const pendingTodos = computed(() => todos.value.filter((todo) => !todo.isCompleted))

  // Cargar tareas
  async function fetchToDos() {
    loading.value = true
    todos.value = await service.fetchToDos()
    loading.value = false
  }

  // Agregar una nueva tarea
  async function addToDo(task) {
    const newToDo = await service.addToDo({ task }) // Espera el objeto que se agrega
    todos.value.push(newToDo) // Agrega el nuevo todo a la lista
  }

  // Editar tarea
  async function editToDo(id, updatedFields) {
    await service.editToDo(id, updatedFields)
    await fetchToDos() // Recargar la lista después de editar
  }

  // Eliminar tarea
  async function deleteToDo(id) {
    await service.deleteToDo(id)
    await fetchToDos() // Recargar la lista después de eliminar
  }

  return {
    todos,
    loading,
    fetchToDos,
    addToDo,
    editToDo,
    deleteToDo,
    completedTodos,
    pendingTodos
  }
})
