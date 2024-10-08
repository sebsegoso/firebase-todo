import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useToDoStore } from '@/stores/toDosStore'

vi.mock('@/services/toDos.service.js', () => ({
  ToDosService: vi.fn().mockImplementation(() => ({
    fetchToDos: vi.fn(() =>
      Promise.resolve([{ id: '1', task: 'Comprar leche', isCompleted: false }])
    )
  }))
}))

describe('ToDo Store', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useToDoStore()
  })

  it('fetch todos y actualiza arreglo de todos', async () => {
    expect(store.todos).toHaveLength(0)
    await store.fetchToDos()

    expect(store.todos).toHaveLength(1)
    expect(store.todos[0].task).toBe('Comprar leche')
  })
})
