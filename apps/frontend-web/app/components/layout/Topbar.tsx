import React from 'react'
import { Search, Bell, LucideIcon } from 'lucide-react'
import { Input, Topbar as TopbarKit } from '@aoponto/ui-kit'

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
        <div className="relative w-80 hidden lg:block">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10"
            size={16}
          />
          <Input
            type="text"
            placeholder="Pesquisar no sistema..."
            className="pl-9 bg-slate-100 border-transparent focus:bg-white text-sm"
          />
        </div>
        <div className="w-px h-6 bg-slate-200"></div>
        <button className="relative p-2 text-slate-400 hover:text-orange-500 transition-colors rounded-lg hover:bg-orange-50">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white"></span>
        </button>
      </TopbarKit.Actions>
    </TopbarKit.Root>
  )
}
