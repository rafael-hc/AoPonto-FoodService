import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { refreshTokenControllerHandle } from '../api/generated/session/session'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// Mutator para o Orval
export const api = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = axios.CancelToken.source()
  const promise = axiosInstance({
    ...config,
    cancelToken: source.token
  }).then((response: AxiosResponse<T>) => response.data)

  // @ts-expect-error - Orval espera que a promise tenha um método cancel🛸⚡
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}

interface FailedRequest {
  resolve: (token: string | null) => void
  reject: (error: unknown) => void
}

// Fila para gerenciar múltiplas requisições paralelas durante o refresh
let isRefreshing = false
let failedQueue: FailedRequest[] = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

// Adiciona os interceptores na instância do Axios
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Evita loop infinito se a própria requisição de refresh retornar erro
    if (originalRequest.url?.includes('/session/refresh')) {
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Se já está dando refresh, entra na fila e espera
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => {
            return axiosInstance(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        await refreshTokenControllerHandle()

        processQueue(null)
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError)
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)
