import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { useHotkeysConfig } from '../../hooks/use-hotkeys-config'
import { useNavigation } from '../../hooks/use-navigation'
import { Sidebar } from './Sidebar'
import { SubNavigation } from './SubNavigation'
import { Topbar } from './Topbar'
import { SystemSettingsModal } from '../settings/SystemSettingsModal'

export const MainLayout: React.FC<{ children?: React.ReactNode }> = ({
  children
}) => {
  const [activeModule, setActiveModule] = useState('principal')
  const [activeAction, setActiveAction] = useState('dashboard')
  const [isSystemSettingsOpen, setIsSystemSettingsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const { allowedModules } = useNavigation()

  // Sincronizar activeAction com a URL
  useEffect(() => {
    const path = location.pathname.substring(1) // remove leading slash
    if (path) {
      setActiveAction(path)

      // Tentar encontrar qual módulo contém essa ação
      const moduleId = Object.keys(allowedModules).find((key) => {
        const mod = allowedModules[key]
        return mod.groups.some((group) =>
          group.items.some((item) => (item.id || item.name) === path)
        )
      })

      if (moduleId) {
        setActiveModule(moduleId)
      }
    } else {
      setActiveAction('dashboard')
      if (allowedModules['principal']) {
        setActiveModule('principal')
      } else {
        const firstModule = Object.keys(allowedModules)[0]
        if (firstModule) setActiveModule(firstModule)
      }
    }
  }, [location.pathname, allowedModules])

  // Se o activeModule não está mais permitido (ou mudou perfil de auth), seleciona o primeiro listado
  useEffect(() => {
    const moduleKeys = Object.keys(allowedModules)
    if (moduleKeys.length > 0 && !allowedModules[activeModule]) {
      setActiveModule(moduleKeys[0])
    }
  }, [allowedModules, activeModule])

  const handleModuleChange = (moduleId: string) => {
    setActiveModule(moduleId)
  }

  const handleActionClick = (
    actionId: string,
    actionType?: 'route' | 'modal'
  ) => {
    if (actionType === 'modal') {
      if (actionId === 'system-settings') {
        setIsSystemSettingsOpen(true)
      }
      return
    }

    if (actionType === 'route') {
      navigate(`/${actionId}`)
    }

    setActiveAction(actionId)
  }

  // Registrar atalhos de teclado globais
  useHotkeysConfig({
    onModuleChange: (moduleId) => handleModuleChange(moduleId),
    onActionChange: (actionId) => handleActionClick(actionId),
    allowedModules
  })

  const currentModule = allowedModules[activeModule]

  if (!currentModule) {
    return <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800" />
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      <Sidebar
        activeModule={activeModule}
        onModuleChange={handleModuleChange}
        allowedModules={allowedModules}
      />
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50/50">
        <Topbar title={currentModule.title} Icon={currentModule.icon} />

        <SubNavigation
          groups={currentModule.groups}
          activeAction={activeAction}
          onActionChange={handleActionClick}
        />

        <div className="flex-1 overflow-y-auto p-8 relative">
          {children || <Outlet />}
        </div>

        <SystemSettingsModal
          open={isSystemSettingsOpen}
          onOpenChange={setIsSystemSettingsOpen}
        />
      </main>
    </div>
  )
}
