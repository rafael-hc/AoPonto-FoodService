import { Dialog } from '@aoponto/ui-kit'
import {
  Barcode,
  ChefHat,
  ClipboardList,
  Image as ImageIcon,
  MapPin,
  Monitor,
  Printer,
  Settings2,
  UserPlus,
  X
} from 'lucide-react'
import React, { useState } from 'react'
import {
  type GeneralSettingsData,
  GeneralSettingsView
} from './GeneralSettingsView'
import {
  type MyDefinitionsSettingsData,
  MyDefinitionsSettingsView
} from './MyDefinitionsSettingsView'

interface SettingsTileProps {
  icon: React.ElementType
  title: string
  description: string
  onClick?: () => void
}

const SettingsTile: React.FC<SettingsTileProps> = ({
  icon: Icon,
  title,
  description,
  onClick
}) => (
  <button
    type="button"
    onClick={onClick}
    className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 text-center min-h-[160px]"
  >
    <div className="p-4 bg-slate-50 text-slate-400 group-hover:bg-orange-100 group-hover:text-orange-600 rounded-2xl transition-colors mb-4 ring-4 ring-slate-500/0 group-hover:ring-orange-500/10">
      <Icon size={32} strokeWidth={1.5} />
    </div>
    <h3 className="font-bold text-slate-800 mb-1 group-hover:text-orange-700 transition-colors">
      {title}
    </h3>
    <p className="text-xs text-slate-400 font-medium leading-relaxed group-hover:text-orange-600/70 transition-colors">
      {description}
    </p>
  </button>
)

interface SystemSettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const SystemSettingsModal: React.FC<SystemSettingsModalProps> = ({
  open,
  onOpenChange
}) => {
  const [view, setView] = useState<'grid' | 'general' | 'my-definitions'>(
    'grid'
  )

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setView('grid') // Reset ao fechar
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-slate-900/60 backdrop-blur-md" />
        <Dialog.Content 
          className="max-w-[1000px] w-[95vw] p-0 overflow-hidden bg-white rounded-[2.5rem] shadow-2xl border-none"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          {view === 'grid' ? (
            <>
              {/* Botão de Fechar - Somente na Grade Principal */}
              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="absolute right-8 top-8 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all z-60"
              >
                <X size={24} />
              </button>

              {/* Header customizado conforme imagem */}
              <div className="relative px-12 pt-12 pb-8 flex flex-col items-center">
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight mb-2">
                  Configurações do Sistema
                </h2>
                <div className="h-1.5 w-24 bg-orange-500 rounded-full mb-8 shadow-lg shadow-orange-500/20" />
              </div>

              {/* Grid de Configurações conforme imagem de referência */}
              <div className="px-12 pb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <SettingsTile
                    icon={Settings2}
                    title="Geral"
                    description="Assinatura, numeração, taxa de serviço."
                    onClick={() => setView('general')}
                  />
                  <SettingsTile
                    icon={ClipboardList}
                    title="Minhas Definições"
                    description="Pedidos, busca, delivery, estoque."
                    onClick={() => setView('my-definitions')}
                  />
                  <SettingsTile
                    icon={Printer}
                    title="Ajustes do Cupom"
                    description="Conta, cozinha, cabeçalho e rodapé."
                  />
                  <SettingsTile
                    icon={ImageIcon}
                    title="Imagem de Fundo"
                    description="Papel de parede e cor de fundo."
                  />
                  <SettingsTile
                    icon={MapPin}
                    title="Áreas de Entrega"
                    description="Mapeamento das áreas, taxas."
                  />
                  <SettingsTile
                    icon={UserPlus}
                    title="Origem de Clientes"
                    description="Indicação, Facebook, Google, etc."
                  />
                  <SettingsTile
                    icon={ChefHat}
                    title="Locais / Cozinhas"
                    description="Impressão por área ou cozinha."
                  />
                  <SettingsTile
                    icon={Barcode}
                    title="Código de Barras por KG"
                    description="Código de barras impresso por balança."
                  />
                  <SettingsTile
                    icon={Monitor}
                    title="Sobre"
                    description="Informações do sistema."
                  />
                </div>
              </div>

              <div className="bg-slate-50 border-t border-slate-100 px-12 py-6 flex justify-center">
                <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400">
                  AoPonto Food Service • Edição Premium v2.4.0
                </p>
              </div>
            </>
          ) : (
            <div className="h-[85vh] max-h-[900px]">
              {view === 'general' ? (
                <GeneralSettingsView
                  onBack={() => setView('grid')}
                  onSave={(data: GeneralSettingsData) => {
                    console.log('Salvando configurações gerais:', data)
                    setView('grid')
                  }}
                />
              ) : (
                <MyDefinitionsSettingsView
                  onBack={() => setView('grid')}
                  onSave={(data: MyDefinitionsSettingsData) => {
                    console.log('Salvando minhas definições:', data)
                    setView('grid')
                  }}
                />
              )}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
