import type { LucideIcon } from 'lucide-react'

export interface NavigationItem {
  id?: string
  name: string
  icon: LucideIcon
  shortcut?: string
  actionType?: 'route' | 'modal'
  permissions?: string[]
}

export interface NavigationGroup {
  name: string
  items: NavigationItem[]
}

export interface ModuleConfig {
  id: string
  title: string
  icon: LucideIcon
  permissions?: string[]
  groups: NavigationGroup[]
}

export type ModuleConfigMap = Record<string, ModuleConfig>

