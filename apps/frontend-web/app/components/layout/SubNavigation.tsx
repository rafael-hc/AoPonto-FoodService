import React from 'react'
import { NavigationGroup } from './types'

interface SubNavigationProps {
  groups: NavigationGroup[]
  activeAction: string
  onActionChange: (actionId: string) => void
}

export const SubNavigation: React.FC<SubNavigationProps> = ({
  groups,
  activeAction,
  onActionChange
}) => {
  return (
    <div className="bg-white border-b border-t border-slate-100 shadow-sm z-10 shrink-0">
      <div className="flex overflow-x-auto px-6 py-4 gap-8">
        {groups.map((group, idx) => (
          <div key={idx} className="flex flex-col gap-3 relative shrink-0">
            <div className="flex gap-1.5">
              {group.items.map((item, i) => {
                const actionId = item.id || item.name
                const isActive = activeAction === actionId
                return (
                  <button
                    key={i}
                    onClick={() => onActionChange(actionId)}
                    className={`flex flex-col items-center justify-start gap-1.5 p-2.5 rounded-xl transition-all min-w-[80px] group/btn border ${
                      isActive
                        ? 'bg-orange-50 border-orange-200 shadow-sm text-orange-700'
                        : 'bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-200 text-slate-600'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'bg-slate-100 text-slate-500 group-hover/btn:bg-white group-hover/btn:shadow-sm'}`}
                    >
                      <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                    <div className="text-center flex flex-col items-center gap-1 mt-1">
                      <span
                        className={`text-[11px] leading-tight ${isActive ? 'font-bold' : 'font-medium'}`}
                      >
                        {item.name}
                      </span>
                      {item.shortcut && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${isActive ? 'bg-orange-200/50 text-orange-700' : 'bg-slate-100 text-slate-400'}`}
                        >
                          {item.shortcut}
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
            {/* Label do Grupo */}
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center border-t border-slate-100 pt-2 w-full mt-auto">
              {group.name}
            </div>
            {/* Divisor Visual */}
            {idx < groups.length - 1 && (
              <div className="absolute right-[-1rem] top-2 bottom-6 w-px bg-slate-100"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
