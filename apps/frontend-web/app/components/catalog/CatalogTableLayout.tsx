import { Badge, Button, Card } from '@aoponto/ui-kit'
import { LayoutGrid, List, Search } from 'lucide-react'
import React, { createContext, useContext } from 'react'

interface CatalogContextProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  isLoading: boolean
}

const CatalogContext = createContext<CatalogContextProps | undefined>(undefined)

function useCatalog() {
  const context = useContext(CatalogContext)
  if (!context) {
    throw new Error(
      'CatalogTableLayout components must be used within CatalogTableLayout.Root'
    )
  }
  return context
}

export const CatalogTableLayout = {
  Root: ({
    children,
    searchTerm,
    onSearchChange,
    isLoading
  }: {
    children: React.ReactNode
    searchTerm: string
    onSearchChange: (value: string) => void
    isLoading: boolean
  }) => (
    <CatalogContext.Provider value={{ searchTerm, onSearchChange, isLoading }}>
      <div className="flex-1 flex flex-col min-h-0 h-full space-y-8 animate-in fade-in duration-500 overflow-hidden">
        {children}
      </div>
    </CatalogContext.Provider>
  ),

  Header: ({
    title,
    description,
    totalCount,
    newButtonLabel,
    onNewClick
  }: {
    title: string
    description: string
    totalCount: number | string
    newButtonLabel?: string
    onNewClick?: () => void
  }) => {
    const { isLoading } = useCatalog()
    return (
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h1>
            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 font-bold px-3">
              {isLoading ? '...' : `${totalCount} itens`}
            </Badge>
          </div>
          <p className="text-slate-500 font-medium">{description}</p>
        </div>
        <CatalogTableLayout.Actions
          newButtonLabel={newButtonLabel}
          onNewClick={onNewClick}
        />
      </div>
    )
  },

  Actions: ({
    newButtonLabel,
    onNewClick,
    searchPlaceholder = 'Buscar...'
  }: {
    newButtonLabel?: string
    onNewClick?: () => void
    searchPlaceholder?: string
  }) => {
    const { searchTerm, onSearchChange } = useCatalog()
    return (
      <div className="flex items-center gap-4">
        <div className="relative group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all w-full md:w-80 shadow-sm font-medium"
          />
        </div>

        {newButtonLabel && onNewClick && (
          <Button
            onClick={onNewClick}
            className="h-[46px] px-6 gap-2 shadow-xl shadow-orange-500/20 active:scale-95 transition-all text-sm font-bold bg-orange-500 hover:bg-orange-600 border-none"
          >
            <span className="text-lg">+</span>
            <span className="hidden sm:inline">{newButtonLabel}</span>
          </Button>
        )}
      </div>
    )
  },

  Table: ({
    headers,
    children,
    isEmpty,
    emptyState
  }: {
    headers: string[]
    children: React.ReactNode
    isEmpty: boolean
    emptyState: React.ReactNode
  }) => {
    const { isLoading } = useCatalog()

    return (
      <Card.Root className="flex-1 flex flex-col min-h-0 overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/40 rounded-2xl bg-white border-none">
        <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-3 flex items-center justify-between">
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-slate-600 bg-slate-200/50 hover:bg-slate-200 gap-2 border-transparent shadow-none font-bold text-xs"
            >
              <List size={14} /> Tabela
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-slate-400 hover:text-slate-600 gap-2 border-transparent shadow-none hover:bg-slate-100/50 font-bold text-xs"
            >
              <LayoutGrid size={14} /> Cards
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-white border-b border-slate-100 shadow-sm">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={header}
                    className={`px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap ${index === headers.length - 1 ? 'text-right' : ''}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading
                ? ['sk-1', 'sk-2', 'sk-3', 'sk-4', 'sk-5'].map((id) => (
                    <tr
                      key={id}
                      className="animate-pulse bg-white border-b border-slate-50"
                    >
                      {headers.map((header) => (
                        <td
                          key={`skeleton-cell-${header}`}
                          className="px-6 py-5"
                        >
                          <div className="h-4 bg-slate-100 rounded w-full" />
                        </td>
                      ))}
                    </tr>
                  ))
                : children}
            </tbody>
          </table>
        </div>

        {!isLoading && isEmpty && emptyState}
      </Card.Root>
    )
  },

  EmptyState: ({
    icon: Icon,
    title,
    description,
    buttonLabel,
    onButtonClick
  }: {
    icon: React.ElementType
    title: string
    description: string
    buttonLabel?: string
    onButtonClick?: () => void
  }) => (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center animate-in zoom-in-95 duration-500">
      <div className="w-20 h-20 bg-orange-50 text-orange-200 rounded-4xl flex items-center justify-center mb-6 transform rotate-6 scale-110 shadow-inner">
        <Icon size={40} className="transform -rotate-6" />
      </div>
      <h3 className="text-slate-900 font-extrabold text-xl tracking-tight">
        {title}
      </h3>
      <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto leading-relaxed font-medium">
        {description}
      </p>
      {buttonLabel && onButtonClick && (
        <Button
          variant="outline"
          onClick={onButtonClick}
          className="mt-8 border-slate-200 text-slate-700 hover:bg-slate-50 font-bold shadow-sm"
        >
          {buttonLabel}
        </Button>
      )}
    </div>
  )
}
