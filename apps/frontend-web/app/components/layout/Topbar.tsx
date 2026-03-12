import { Input, Topbar as TopbarKit } from '@aoponto/ui-kit'
import { Bell, type LucideIcon, Search } from 'lucide-react'
import type React from 'react'

interface TopbarProps {
  title: string
  Icon: LucideIcon
}

export const Topbar: React.FC<TopbarProps> = ({ title, Icon }) => {
  return (
    <TopbarKit.Root>
      <TopbarKit.Title>
        <Icon size={24} className="text-orange-500" />
        {title}
      </TopbarKit.Title>

      <TopbarKit.Actions>
        <div className="w-80 hidden lg:block">
          <Input.Root className="bg-slate-100 border-transparent focus-within:bg-white transition-colors">
            <Input.Icon>
              <Search size={16} />
            </Input.Icon>
            <Input.Control
              type="text"
              placeholder="Pesquisar no sistema..."
              aria-label="Pesquisar no sistema"
              className="text-sm"
            />
          </Input.Root>
        </div>
        <div className="w-px h-6 bg-slate-200"></div>
        <button
          type="button"
          className="relative p-2 text-slate-400 hover:text-orange-500 transition-colors rounded-lg hover:bg-orange-50"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white"></span>
        </button>
      </TopbarKit.Actions>
    </TopbarKit.Root>
  )
}
