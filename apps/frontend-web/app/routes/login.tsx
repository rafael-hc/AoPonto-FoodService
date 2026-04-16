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

  const { signIn } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await signIn(login, password)
      navigate('/')
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          'Erro ao entrar. Verifique suas credenciais.'
      )
    } finally {
      setIsLoading(false)
    }
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
          disabled={isLoading}
          className="w-full bg-orange-600 hover:bg-orange-700 focus-visible:ring-orange-500"
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </div>
  )
}
