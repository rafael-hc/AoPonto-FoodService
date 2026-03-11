import { useHotkeys } from 'react-hotkeys-hook'
import { modulesConfig } from '../components/layout/config'

interface UseHotkeysConfigProps {
  onModuleChange: (moduleId: string) => void
  onActionChange: (actionId: string) => void
}

/**
 * Hook para registrar globalmente os atalhos definidos na configuração dos módulos.
 * Percorre a modulesConfig e registra teclas como F3, F4, F5, F11, etc.
 */
export function useHotkeysConfig({
  onModuleChange,
  onActionChange
}: UseHotkeysConfigProps) {
  // Mapeamos todos os itens que possuem shortcut
  const itemsWithShortcut = Object.values(modulesConfig).flatMap((module) =>
    module.groups.flatMap((group) =>
      group.items
        .filter((item) => !!item.shortcut)
        .map((item) => ({
          shortcut: item.shortcut!,
          moduleId: module.id,
          actionId: item.id || item.name
        }))
    )
  )

  // Registramos cada atalho
  // Nota: Embora Hooks em loops sejam desencorajados, a modulesConfig é estática
  // e o número de itens com shortcut não mudará entre as renderizações.
  itemsWithShortcut.forEach((item) => {
    useHotkeys(
      item.shortcut.toLowerCase(),
      (e) => {
        e.preventDefault()
        onModuleChange(item.moduleId)
        onActionChange(item.actionId)
      },
      {
        enableOnFormTags: false, // Não dispara se estiver em inputs/textareas
        preventDefault: true
      }
    )
  })
}
