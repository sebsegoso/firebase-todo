import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  doc,
  orderBy
} from 'firebase/firestore'
import { $db, $auth } from '@/firebase' // La referencia a Firestore configurada

export class ToDosService {
  // Obtener todas las tareas del usuario autenticado
  async fetchToDos() {
    try {
      const userId = $auth.currentUser?.uid
      if (!userId) {
        throw new Error('UserId no existe')
      }

      // Crear la consulta inicial
      let q = query(
        collection($db, 'todos'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      )

      const querySnapshot = await getDocs(q)
      const todos = []
      querySnapshot.forEach((doc) => {
        todos.push({ id: doc.id, ...doc.data() })
      })
      return todos
    } catch (error) {
      console.error('Error fetching todos:', error)
      return []
    }
  }

  // Agregar una nueva tarea
  async addToDo(todo) {
    try {
      const userId = $auth.currentUser?.uid
      if (!userId) {
        throw new Error('UserId no existe')
      }
      const newTodo = {
        ...todo,
        userId, // Asociar la tarea con el usuario autenticado
        isCompleted: false,
        createdAt: new Date().toLocaleString()
      }
      await addDoc(collection($db, 'todos'), newTodo)
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  // Editar una tarea
  async editToDo(id, updatedFields) {
    try {
      const todoRef = doc($db, 'todos', id)
      await updateDoc(todoRef, updatedFields)
    } catch (error) {
      console.error('Error editing todo:', error)
    }
  }

  // Eliminar una tarea
  async deleteToDo(id) {
    try {
      const todoRef = doc($db, 'todos', id)
      await deleteDoc(todoRef)
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }
}
