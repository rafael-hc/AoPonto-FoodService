import React, { useState } from 'react'
import { Outlet } from 'react-router'
import { modulesConfig } from './config'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { SubNavigation } from './SubNavigation'
import { useHotkeysConfig } from '../../hooks/use-hotkeys-config'

export const MainLayout: React.FC = () => {
  const [activeModule, setActiveModule] = useState('principal')
  const [activeAction, setActiveAction] = useState('dashboard')

  // Registrar atalhos de teclado globais
  useHotkeysConfig({
    onModuleChange: (moduleId) => handleModuleChange(moduleId),
    onActionChange: (actionId) => setActiveAction(actionId)
  })

  const handleModuleChange = (moduleId: string) => {
    setActiveModule(moduleId)
    // Auto-select the first action of the new module
    const firstAction = modulesConfig[moduleId].groups[0].items[0]
    setActiveAction(firstAction.id || firstAction.name)
  }

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
          onActionChange={setActiveAction}
        />

        <div className="flex-1 overflow-y-auto p-8 relative">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
