import { Avatar, Sidebar as SidebarKit } from '@aoponto/ui-kit'
import { ChefHat, LogOut } from 'lucide-react'
import type React from 'react'
import { useAuthStore } from '../../store/auth-store'
import { modulesConfig } from './config'

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
    <SidebarKit.Root>
      <SidebarKit.Header>
        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30 shrink-0">
          <ChefHat size={24} />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight tracking-tight text-slate-900">
            AoPonto
          </h1>
          <p className="text-xs text-slate-500 font-medium">Food Service</p>
        </div>
      </SidebarKit.Header>

      <SidebarKit.Content>
        <SidebarKit.GroupLabel>Módulos</SidebarKit.GroupLabel>

        {Object.values(modulesConfig).map((module) => (
          <SidebarKit.Item
            key={module.id}
            active={activeModule === module.id}
            onClick={() => onModuleChange(module.id)}
          >
            <module.icon
              size={20}
              className={activeModule === module.id ? 'text-orange-400' : ''}
            />
            {module.title}
          </SidebarKit.Item>
        ))}
      </SidebarKit.Content>

      <SidebarKit.Footer>
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-50 border border-slate-100 mb-2">
          <Avatar.Root className="w-9 h-9 border-slate-200 shadow-none">
            <Avatar.Image
              src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.login || 'User'}&backgroundColor=f97316`}
              alt="Profile"
            />
            <Avatar.Fallback>
              {user?.login?.[0]?.toUpperCase() || 'U'}
            </Avatar.Fallback>
          </Avatar.Root>
          <div className="text-left overflow-hidden">
            <p className="text-sm font-bold text-slate-800 truncate">
              {user?.login || 'Usuário'}
            </p>
            <p className="text-xs text-slate-500 truncate">Gerente Geral</p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium cursor-pointer"
        >
          <LogOut size={16} />
          Bloquear Sessão
        </button>
      </SidebarKit.Footer>
    </SidebarKit.Root>
  )
}
