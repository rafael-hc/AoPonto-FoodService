import { create } from 'zustand'
import { getProfileControllerHandle } from '../api/generated/get-profile/get-profile'
import type {
  GetProfileResponseDtoUser as User,
  AuthenticateResponseDto
} from '../api/generated/model'
import {
  authenticateControllerHandle,
  logoutControllerHandle
} from '../api/generated/session/session'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  passwordChangeRequired: boolean
  signIn: (login: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  getProfile: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  passwordChangeRequired: false,

  signIn: async (login, password) => {
    const responseAuth = await authenticateControllerHandle({ login, password })
    const { passwordChangeRequired } = responseAuth
    
    // Após o login, buscamos o perfil para preencher o estado
    const response = await getProfileControllerHandle()

    set({
      user: response.user,
      isAuthenticated: true,
      isLoading: false,
      passwordChangeRequired
    })
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
      set({
        user: response.user,
        isAuthenticated: true,
        passwordChangeRequired: response.user.passwordChangeRequired
      })
    } catch {
      set({ user: null, isAuthenticated: false })
    } finally {
      set({ isLoading: false })
    }
  }
}))
