import { Avatar } from '@aoponto/ui-kit'
import { useNavigate } from 'react-router'
import { useRefreshTokenControllerHandle } from '../api/generated/sessions/sessions'
import { useGetProfileControllerHandle } from '../api/generated/users/users'
import { ProtectedRoute } from '../components/protected-route'
import { useAuthStore } from '../store/auth-store'

export default function Profile() {
  const { user: storeUser, getProfile: syncStore } = useAuthStore()
  const navigate = useNavigate()

  const { data, isLoading } = useGetProfileControllerHandle()
  const refreshTokenMutation = useRefreshTokenControllerHandle({
    mutation: {
      onSuccess: () => {
        syncStore()
        alert('Token atualizado com sucesso via cookie!')
      },
      onError: () => {
        alert('Erro ao atualizar token.')
        navigate('/login')
      }
    }
  })

  const user = data?.user || storeUser

  async function handleRefresh() {
    refreshTokenMutation.mutate()
  }

  if (isLoading)
    return (
      <div className="text-center py-10 text-gray-400">
        Carregando perfil...
      </div>
    )

  return (
    <ProtectedRoute>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar.Root className="h-16 w-16 text-2xl font-bold text-orange-600 bg-orange-100 border-none shadow-none">
            <Avatar.Fallback className="bg-transparent">
              {user?.contact?.name?.[0]?.toUpperCase()}
            </Avatar.Fallback>
          </Avatar.Root>
          <div>
            <h2 className="text-2xl font-bold">{user?.contact?.name}</h2>
            <p className="text-gray-500">{user?.role}</p>
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <p>
            <strong>ID:</strong> {user?.id}
          </p>
          <p>
            <strong>Login:</strong> {user?.login}
          </p>
          <p>
            <strong>Email:</strong> {user?.contact?.email}
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleRefresh}
            className="flex-1 py-2 px-4 border border-orange-600 rounded-md text-orange-600 hover:bg-orange-50 font-medium"
          >
            Atualizar Token
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 py-2 px-4 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200 font-medium"
          >
            Voltar
          </button>
        </div>
      </div>
    </ProtectedRoute>
  )
}
