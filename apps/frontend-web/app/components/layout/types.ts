import { LucideIcon } from 'lucide-react'

export interface NavigationItem {
  id?: string
  name: string
  icon: LucideIcon
  shortcut?: string
  actionType?: 'route' | 'modal'
}

export interface NavigationGroup {
  name: string
  items: NavigationItem[]
}

export interface ModuleConfig {
  id: string
  title: string
  icon: LucideIcon
  groups: NavigationGroup[]
}

export type ModuleConfigMap = Record<string, ModuleConfig>

export interface StatItem {
  title: string
  value: string
  trend: string
  isPositive: boolean
}

export interface RecentOrder {
  id: string
  customer: string
  items: string
  total: string
  status: 'novo' | 'preparando' | 'pronto' | 'concluido'
  time: string
}

export interface TopItem {
  name: string
  sales: number
  revenue: string
}
