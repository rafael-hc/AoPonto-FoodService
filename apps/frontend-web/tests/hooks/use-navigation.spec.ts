import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useNavigation } from '../../app/hooks/use-navigation'
import * as authStore from '../../app/store/auth-store'

// Controla o mock do Zustand store da auth para as simulações
vi.mock('../../app/store/auth-store', () => ({
  useAuthStore: vi.fn()
}))

describe('useNavigation Hook (RBAC Filtering)', () => {
  it('Deve ocultar os módulos "financeiro" e "configuracoes" (restringidos para admin) para usuários de nível CASHIER', () => {
    vi.mocked(authStore.useAuthStore).mockReturnValue({
      user: { role: 'CASHIER' }
    } as any)

    const { result } = renderHook(() => useNavigation())
    const { allowedModules } = result.current

    // Valida exclusão de modulos ADMIN-only
    expect(allowedModules).not.toHaveProperty('financeiro')
    expect(allowedModules).not.toHaveProperty('configuracoes')

    // Valida que módulos abertos devem ser exibidos (ex: principal)
    expect(allowedModules).toHaveProperty('principal')
  })

  it('Deve exibir TODOS os módulos (financeiros, configuracoes, etc) para usuários de nível ADMIN', () => {
    vi.mocked(authStore.useAuthStore).mockReturnValue({
      user: { role: 'ADMIN' }
    } as any)

    const { result } = renderHook(() => useNavigation())
    const { allowedModules } = result.current

    expect(allowedModules).toHaveProperty('financeiro')
    expect(allowedModules).toHaveProperty('configuracoes')
    expect(allowedModules).toHaveProperty('principal')
  })

  it('Deve exibir de forma fallback (ou vazia) os módulos quando ainda não tem usuário ou o RBAC é default', () => {
    vi.mocked(authStore.useAuthStore).mockReturnValue({
      user: null
    } as any)

    const { result } = renderHook(() => useNavigation())
    const { allowedModules } = result.current

    // Sem usuário defindo (por precaução/loading), a lógica renderiza o não restrito, ou poderíamos escolher renderizar vazio 
    // Como a lógica atual mostra menus abertos na ausência de User, validamos a premissa de que os restritos ficam bloqueados:
    expect(allowedModules).not.toHaveProperty('financeiro')
    expect(allowedModules).toHaveProperty('principal')
  })
})
