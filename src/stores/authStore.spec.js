import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuthStore } from './authStore'
import { loginWithGoogle, logout } from '@/firebase'
import { createPinia, setActivePinia } from 'pinia'

vi.mock('@/firebase', () => ({
  loginWithGoogle: vi.fn(),
  logout: vi.fn()
}))

describe('Auth Store', () => {
  let authStore

  beforeEach(() => {
    setActivePinia(createPinia())
    authStore = useAuthStore()
  })

  it('Inicio de sesión y seteo de usuario en store', async () => {
    const mockUser = { uid: '123', displayName: 'Test User' }
    loginWithGoogle.mockResolvedValue({ user: mockUser }) // Simula la respuesta de login

    await authStore.login()

    expect(authStore.user?.uid).toEqual(mockUser.uid) // Verifica que el usuario sea el correcto
    expect(loginWithGoogle).toHaveBeenCalled() // Asegura que se llamó a la función de login
  })

  it('error en login', async () => {
    const errorMessage = 'Error de autenticación'
    loginWithGoogle.mockRejectedValue(new Error({ code: 'firebase-error', message: errorMessage })) // Simula un error en login

    await authStore.login()

    expect(authStore.user).toBeNull() // El usuario no debe ser establecido
    expect(loginWithGoogle).toHaveBeenCalled() // Asegura que se llamó a la función de login
  })

  it('logout y limpia usuario de store', async () => {
    const mockUser = { uid: '123', displayName: 'Test User' }
    authStore.user = mockUser // Establece un usuario mock

    await authStore.logoutUser()

    expect(authStore.user).toBeNull() // Verifica que el estado del usuario sea null
    expect(logout).toHaveBeenCalled() // Asegura que se llamó a la función de logout
  })
})
