import { create } from 'zustand'
import type { GetProfileControllerHandle200User as User } from '../api/generated/model'
import {
  authenticateControllerHandle,
  logoutControllerHandle
} from '../api/generated/sessions/sessions'
import { getProfileControllerHandle } from '../api/generated/users/users'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: (login: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  getProfile: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  signIn: async (login, password) => {
    await authenticateControllerHandle({ login, password })

    // Após o login, buscamos o perfil para preencher o estado
    const response = await getProfileControllerHandle()
    set({ user: response.user, isAuthenticated: true, isLoading: false })
  },

  signOut: async () => {
    try {
      await logoutControllerHandle()
    } catch (error) {
      console.error('Erro ao fazer logout no servidor', error)
    } finally {
      set({ user: null, isAuthenticated: false, isLoading: false })
    }
  },

  getProfile: async () => {
    try {
      set({ isLoading: true })
      const response = await getProfileControllerHandle()
      set({ user: response.user, isAuthenticated: true })
    } catch {
      set({ user: null, isAuthenticated: false })
    } finally {
      set({ isLoading: false })
    }
  }
}))
