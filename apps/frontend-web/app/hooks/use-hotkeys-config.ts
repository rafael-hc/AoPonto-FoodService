import { useHotkeys } from 'react-hotkeys-hook'
import type { ModuleConfigMap } from '../components/layout/types'

interface UseHotkeysConfigProps {
  onModuleChange: (moduleId: string) => void
  onActionChange: (actionId: string) => void
  allowedModules: ModuleConfigMap
}

/**
 * Hook para registrar globalmente os atalhos definidos na configuração dos módulos.
 * Percorre a allowedModules e registra teclas como F3, F4, F5, F11, etc.
 */
export function useHotkeysConfig({
  onModuleChange,
  onActionChange,
  allowedModules
}: UseHotkeysConfigProps) {
  // Mapeamos todos os itens que possuem shortcut
  const itemsWithShortcut = Object.values(allowedModules).flatMap((module) =>
    module.groups.flatMap((group) =>
      group.items.reduce(
        (acc, item) => {
          if (item.shortcut) {
            acc.push({
              shortcut: item.shortcut,
              moduleId: module.id,
              actionId: item.id || item.name
            })
          }
          return acc
        },
        [] as { shortcut: string; moduleId: string; actionId: string }[]
      )
    )
  )

  // 1. Extraímos todos os shortcuts únicos
  const shortcuts = itemsWithShortcut.map((i) => i.shortcut.toLowerCase())

  // 2. Registramos todos atalhos em uma única chamada de Hook 🛸⚡
  useHotkeys(
    shortcuts,
    (e, handler) => {
      e.preventDefault()

      // Encontramos o item correspondente à tecla pressionada
      const pressedKey = handler.keys?.join('+').toLowerCase() || ''
      const matchedItem = itemsWithShortcut.find(
        (item) => item.shortcut.toLowerCase() === pressedKey
      )

      if (matchedItem) {
        onModuleChange(matchedItem.moduleId)
        onActionChange(matchedItem.actionId)
      }
    },
    {
      enableOnFormTags: false,
      preventDefault: true
    }
  )
}
