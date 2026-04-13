import { ActionTile } from '@aoponto/ui-kit'
import type React from 'react'
import type { NavigationGroup } from './types'

interface SubNavigationProps {
  groups: NavigationGroup[]
  activeAction: string
  onActionChange: (actionId: string, actionType?: 'route' | 'modal') => void
}

export const SubNavigation: React.FC<SubNavigationProps> = ({
  groups,
  activeAction,
  onActionChange
}) => {
  return (
    <div className="bg-white border-b border-t border-slate-100 shadow-sm z-10 shrink-0">
      <div className="flex overflow-x-auto px-6 py-4 gap-8 no-scrollbar">
        {groups.map((group, idx) => (
          <div
            key={group.name}
            className="flex flex-col gap-3 relative shrink-0"
          >
            <div className="flex gap-4">
              {group.items.map((item) => {
                const actionId = item.id || item.name
                const isActive = activeAction === actionId
                return (
                  <ActionTile.Root
                    key={actionId}
                    active={isActive}
                    onClick={() => onActionChange(actionId, item.actionType)}
                  >
                    <ActionTile.Icon>
                      <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                    </ActionTile.Icon>
                    <ActionTile.LabelGroup>
                      <ActionTile.Label>{item.name}</ActionTile.Label>
                      {item.shortcut && (
                        <ActionTile.Shortcut>
                          {item.shortcut}
                        </ActionTile.Shortcut>
                      )}
                    </ActionTile.LabelGroup>
                  </ActionTile.Root>
                )
              })}
            </div>
            {/* Label do Grupo */}
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center border-t border-slate-100 pt-2 w-full mt-auto">
              {group.name}
            </div>
            {/* Divisor Visual */}
            {idx < groups.length - 1 && (
              <div className="absolute -right-4 top-2 bottom-6 w-px bg-slate-100"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
