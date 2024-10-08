// ToDoList.spec.js
import { mount } from '@vue/test-utils'
import ToDoList from './ToDoList.vue'
import { createPinia } from 'pinia'
import { useToDoStore } from '@/stores/toDosStore'
import { beforeEach, describe, expect, it } from 'vitest'

describe('ToDoList.vue', () => {
  let store

  beforeEach(() => {
    // Crea un nuevo Pinia para cada prueba
    store = createPinia()
  })

  it('Renderiza correctamente las toDos', async () => {
    // Configura el store y añade algunos todos
    const testTodos = [
      { id: 1, task: 'Test Task 1', isCompleted: false },
      { id: 2, task: 'Test Task 2', isCompleted: true }
    ]

    const toDoStore = useToDoStore(store)
    toDoStore.todos = testTodos

    const wrapper = mount(ToDoList, {
      global: {
        plugins: [store]
      },
      props: {
        title: 'My Todos',
        filter: 'all'
      }
    })

    // Verifica que el título se renderice
    expect(wrapper.find('h2').text()).toBe('My Todos')

    // Verifica que se rendericen los todos
    const todoItems = wrapper.findAll('li')
    expect(todoItems).toHaveLength(testTodos.length)
  })

  it('Muestra mensaje "Cargando..." cuando está cargando', async () => {
    const toDoStore = useToDoStore(store)
    toDoStore.loading = true

    const wrapper = mount(ToDoList, {
      global: {
        plugins: [store]
      },
      props: {
        title: 'My Todos',
        filter: 'all'
      }
    })

    // Verifica que el texto "Cargando..." se muestre
    expect(wrapper.text()).toContain('Cargando...')
  })

  it('El mensaje "No hay tareas que mostrar" se muestra cuando no hay tareas', async () => {
    const toDoStore = useToDoStore(store)
    toDoStore.todos = [] // No hay tareas

    const wrapper = mount(ToDoList, {
      global: {
        plugins: [store]
      },
      props: {
        title: 'My Todos',
        filter: 'all'
      }
    })

    // Verifica que el mensaje "No hay tareas que mostrar" se muestre
    expect(wrapper.text()).toContain('No hay tareas que mostrar')
  })
})
