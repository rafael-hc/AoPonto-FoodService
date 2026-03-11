import React from 'react'
import { ChefHat, LogOut } from 'lucide-react'
import { modulesConfig } from './config'
import { useAuthStore } from '../../store/auth-store'

interface SidebarProps {
  activeModule: string
  onModuleChange: (moduleId: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onModuleChange
}) => {
  const { user, signOut } = useAuthStore()

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-20">
      <div className="p-6 flex items-center gap-3 border-b border-slate-100">
        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30 shrink-0">
          <ChefHat size={24} />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight tracking-tight text-slate-900">
            AoPonto
          </h1>
          <p className="text-xs text-slate-500 font-medium">Food Service</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 mt-2 px-3">
          Módulos
        </div>

        {Object.values(modulesConfig).map((module) => (
          <button
            key={module.id}
            onClick={() => onModuleChange(module.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              activeModule === module.id
                ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 font-medium'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <module.icon
              size={20}
              className={activeModule === module.id ? 'text-orange-400' : ''}
            />
            {module.title}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-50 border border-slate-100 mb-2">
          <img
            src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.login || 'User'}&backgroundColor=f97316`}
            alt="Profile"
            className="w-9 h-9 rounded-full bg-white border border-slate-200"
          />
          <div className="text-left overflow-hidden">
            <p className="text-sm font-bold text-slate-800 truncate">
              {user?.login || 'Usuário'}
            </p>
            <p className="text-xs text-slate-500 truncate">Gerente Geral</p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium"
        >
          <LogOut size={16} />
          Bloquear Sessão
        </button>
      </div>
    </aside>
  )
}
