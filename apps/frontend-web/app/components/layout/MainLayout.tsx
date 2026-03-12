import type React from 'react'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { useHotkeysConfig } from '../../hooks/use-hotkeys-config'
import { modulesConfig } from './config'
import { Sidebar } from './Sidebar'
import { SubNavigation } from './SubNavigation'
import { Topbar } from './Topbar'

export const MainLayout: React.FC = () => {
  const [activeModule, setActiveModule] = useState('principal')
  const [activeAction, setActiveAction] = useState('dashboard')
  const navigate = useNavigate()

  const handleModuleChange = (moduleId: string) => {
    setActiveModule(moduleId)
  }

  const handleActionClick = (
    actionId: string,
    actionType?: 'route' | 'modal'
  ) => {
    if (actionType === 'modal') {
      // Manter lógica para modais globais se houver (ex: Abrir/Fechar Caixa)
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
    onActionChange: (actionId) => handleActionClick(actionId)
  })

  const currentModule = modulesConfig[activeModule]

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      <Sidebar
        activeModule={activeModule}
        onModuleChange={handleModuleChange}
      />
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50/50">
        <Topbar title={currentModule.title} Icon={currentModule.icon} />

        <SubNavigation
          groups={currentModule.groups}
          activeAction={activeAction}
          onActionChange={handleActionClick}
        />

        <div className="flex-1 overflow-y-auto p-8 relative">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
