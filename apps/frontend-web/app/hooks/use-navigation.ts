import { useMemo } from 'react'
import { modulesConfig } from '../components/layout/navigation-schema'
import type { ModuleConfigMap } from '../components/layout/types'
import { useAuthStore } from '../store/auth-store'

export function useNavigation() {
  const { user } = useAuthStore()

  // Filtra os módulos baseados na permissões do usuário
  const allowedModules = useMemo(() => {
    // Se o usuário não tem role ainda (carregando), por precaução mostramos apenas o que não tem restrição
    const permissions = user?.permissions || []

    const filtered: ModuleConfigMap = {}

    for (const [key, module] of Object.entries(modulesConfig)) {
      // Se não tem restrição de permissão ou o usuário tem a permissão necessária
      if (
        !module.permissions ||
        module.permissions.some((p) => permissions.includes(p))
      ) {
        // Filtrar itens dentro dos grupos que possuam restrição
        const filteredGroups = module.groups
          .map((group) => ({
            ...group,
            items: group.items.filter(
              (item) =>
                !item.permissions ||
                item.permissions.some((p) => permissions.includes(p))
            )
          }))
          .filter((group) => group.items.length > 0) // Remove grupos ocultos/vazios

        if (filteredGroups.length > 0) {
          filtered[key] = {
            ...module,
            groups: filteredGroups
          }
        }
      }
    }

    return filtered
  }, [user?.permissions])

  return {
    allowedModules
  }
}
