import { create } from 'zustand';
import { axiosInstance } from '../lib/api';

interface User {
  id: string;
  login: string;
  role: string;
  contact: {
    id: string;
    name: string;
    email: string;
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (login: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  signIn: async (login, password) => {
    await axiosInstance.post('/sessions', { login, password });

    // Após o login, buscamos o perfil para preencher o estado
    const response = await axiosInstance.get('/me');
    set({ user: response.data.user, isAuthenticated: true, isLoading: false });
  },

  signOut: async () => {
    try {
      await axiosInstance.post('/sessions/logout');
    } catch (error) {
      console.error('Erro ao fazer logout no servidor', error);
    } finally {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  getProfile: async () => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get('/me');
      set({ user: response.data.user, isAuthenticated: true });
    } catch {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
