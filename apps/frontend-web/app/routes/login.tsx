import { Button, Input } from '@aoponto/ui-kit'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuthenticateControllerHandle } from '../api/generated/session/session'
import { useAuthStore } from '../store/auth-store'

export default function Login() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { getProfile } = useAuthStore()

  const loginMutation = useAuthenticateControllerHandle({
    mutation: {
      onSuccess: async () => {
        await getProfile()
        navigate('/')
      },
      onError: (
        err: Error & { response?: { data?: { message?: string } } }
      ) => {
        setError(
          err.response?.data?.message ||
            'Erro ao entrar. Verifique suas credenciais.'
        )
      }
    }
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    loginMutation.mutate({ data: { login, password } })
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Acessar Conta</h2>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input.Wrapper className="space-y-1.5">
          <Input.Label
            htmlFor="login"
            className="text-sm font-medium text-gray-700 mb-0 capitalize select-none cursor-pointer"
          >
            Login
          </Input.Label>
          <Input.Root>
            <Input.Control
              id="login"
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              placeholder="Nome de usuário"
            />
          </Input.Root>
        </Input.Wrapper>

        <Input.Wrapper className="space-y-1.5">
          <Input.Label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 mb-0 capitalize select-none cursor-pointer"
          >
            Senha
          </Input.Label>
          <Input.Root>
            <Input.Control
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Input.Root>
        </Input.Wrapper>

        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full bg-orange-600 hover:bg-orange-700 focus-visible:ring-orange-500"
        >
          {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </div>
  )
}
