import type React from 'react'
export type BadgeStatus = 'novo' | 'preparando' | 'pronto' | 'concluido'

interface StatusBadgeProps {
  status: BadgeStatus
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles: Record<BadgeStatus, string> = {
    novo: 'bg-blue-100 text-blue-700 border-blue-200',
    preparando: 'bg-orange-100 text-orange-700 border-orange-200',
    pronto: 'bg-green-100 text-green-700 border-green-200',
    concluido: 'bg-slate-100 text-slate-600 border-slate-200'
  }

  const labels: Record<BadgeStatus, string> = {
    novo: 'Novo',
    preparando: 'Preparando',
    pronto: 'Pronto',
    concluido: 'Concluído'
  }

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full border ${styles[status]}`}
    >
      {labels[status]}
    </span>
  )
}
