import React from 'react'
import { Search, Bell, LucideIcon } from 'lucide-react'

interface TopbarProps {
  title: string
  Icon: LucideIcon
}

export const Topbar: React.FC<TopbarProps> = ({ title, Icon }) => {
  return (
    <header className="h-16 bg-white px-8 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Icon size={24} className="text-orange-500" />
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <div className="relative w-80 hidden lg:block">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Pesquisar no sistema..."
            className="w-full pl-9 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
          />
        </div>
        <div className="w-px h-6 bg-slate-200"></div>
        <button className="relative p-2 text-slate-400 hover:text-orange-500 transition-colors rounded-lg hover:bg-orange-50">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  )
}
