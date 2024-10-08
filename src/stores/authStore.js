import { ref } from 'vue'
import { loginWithGoogle, logout } from '@/firebase'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  const login = async () => {
    try {
      const result = await loginWithGoogle()

      user.value = result.user
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.error(`Error ${errorCode}: ${errorMessage}`)
    }
  }

  const logoutUser = async () => {
    await logout()
    user.value = null
  }

  return { user, login, logoutUser }
})
