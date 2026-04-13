import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useAuthStore } from '../store/auth-store'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, passwordChangeRequired } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Redireciona para o login se o carregamento terminar e não estiver autenticado
    if (!isLoading && !isAuthenticated) {
      navigate('/login')
      return
    }

    // Se autenticado mas precisa trocar senha, força o redirecionamento
    if (
      isAuthenticated &&
      passwordChangeRequired &&
      location.pathname !== '/alterar-senha'
    ) {
      navigate('/alterar-senha')
    }
  }, [
    isLoading,
    isAuthenticated,
    passwordChangeRequired,
    location.pathname,
    navigate
  ])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-20 text-gray-500">
        Verificando permissões...
      </div>
    )
  }

  return isAuthenticated ? children : null
}
