import { Button, Input } from '@aoponto/ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowLeft,
  Check,
  CreditCard,
  Database,
  ExternalLink,
  History,
  Laptop,
  ShieldCheck
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const generalSettingsSchema = z.object({
  systemType: z.enum(['Mesa', 'Comanda']),
  quantity: z.number().min(1),
  serviceFee: z.number().min(0).max(100),
  backupPath: z.string().optional()
})

export type GeneralSettingsData = z.infer<typeof generalSettingsSchema>

const MOCK_SUBSCRIPTION = {
  fantasyName: 'Pop Açaí',
  socialName: 'RCA COMERCIO DE ALIMENTOS LTDA',
  cnpj: '41.687.186/0001-86',
  phone: '(22) 9978-73798',
  address: 'Rua das Flores, Atafona',
  number: '123',
  city: 'São João da Barra',
  state: 'RJ',
  zipcode: '28200-000'
}

interface GeneralSettingsViewProps {
  onBack: () => void
  onSave: (data: GeneralSettingsData) => void
}

const DataDisplayField = ({
  label,
  value,
  className = ''
}: {
  label: string
  value: string
  className?: string
}) => (
  <div className={`space-y-1 ${className}`}>
    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-0.5">
      {label}
    </span>
    <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 truncate">
      {value || '—'}
    </div>
  </div>
)

export const GeneralSettingsView: React.FC<GeneralSettingsViewProps> = ({
  onBack,
  onSave
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<GeneralSettingsData>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      systemType: 'Comanda',
      quantity: 15,
      serviceFee: 0,
      backupPath: 'C:\\Users\\popac\\OneDrive\\Documentos'
    }
  })

  const systemType = watch('systemType')

  return (
    <form
      onSubmit={handleSubmit(onSave)}
      className="flex flex-col h-full bg-white overflow-hidden"
    >
      {/* Compact Header */}
      <div className="bg-slate-900 px-8 py-3.5 flex items-center justify-between border-b border-white/10 shrink-0">
        <button
          type="button"
          onClick={onBack}
          className="group flex items-center gap-3 text-white hover:text-orange-400 font-bold transition-all text-xs"
        >
          <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-orange-500/10 border border-white/10 transition-colors">
            <ArrowLeft size={16} />
          </div>
          Voltar
        </button>

        <div className="flex items-center gap-3">
          <Button
            type="submit"
            className="h-10 px-5 bg-white/5 hover:bg-white/10 text-white border-white/10 gap-2 font-bold shadow-none active:scale-95 transition-all text-[11px]"
          >
            <Check size={16} className="text-orange-400" />
            Salvar e Voltar
          </Button>
          <Button
            type="submit"
            className="h-10 px-7 bg-white/10 hover:bg-orange-500 hover:text-white text-orange-400 border-white/10 gap-2 font-bold shadow-none active:scale-95 transition-all text-[11px]"
          >
            <Check size={16} />
            Salvar
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-6 md:p-8 bg-slate-50/50">
        <div className="max-w-6xl mx-auto h-full grid grid-cols-12 gap-6 lg:gap-8 overflow-hidden">
          {/* Main Area (Col 8) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 overflow-hidden">
            {/* Subscription Section (Compact) */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-orange-100 text-orange-600 rounded-lg">
                    <CreditCard size={18} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm">
                    Dados da Assinatura
                  </h3>
                </div>
                <button
                  type="button"
                  className="text-[10px] font-black uppercase tracking-widest text-orange-500 hover:text-orange-600 flex items-center gap-1.5 transition-colors"
                >
                  Alterar <ExternalLink size={12} />
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <DataDisplayField
                  label="Nome Fantasia"
                  value={MOCK_SUBSCRIPTION.fantasyName}
                />
                <DataDisplayField label="CNPJ" value={MOCK_SUBSCRIPTION.cnpj} />
                <DataDisplayField
                  label="Razão Social"
                  value={MOCK_SUBSCRIPTION.socialName}
                  className="md:col-span-2"
                />

                <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-50 pt-4 mt-2">
                  <DataDisplayField
                    label="Endereço"
                    value={MOCK_SUBSCRIPTION.address}
                    className="col-span-2"
                  />
                  <DataDisplayField
                    label="Número"
                    value={MOCK_SUBSCRIPTION.number}
                  />
                  <DataDisplayField
                    label="Cidade"
                    value={MOCK_SUBSCRIPTION.city}
                  />
                  <DataDisplayField
                    label="Fone"
                    value={MOCK_SUBSCRIPTION.phone}
                  />
                  <DataDisplayField
                    label="Estado"
                    value={MOCK_SUBSCRIPTION.state}
                  />
                  <DataDisplayField
                    label="CEP"
                    value={MOCK_SUBSCRIPTION.zipcode}
                    className="col-span-2 md:col-span-1"
                  />
                </div>
              </div>
            </div>

            {/* Operational Settings (Compact Card) */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center gap-2.5">
                <div className="p-1.5 bg-white/10 text-white rounded-lg">
                  <Laptop size={18} />
                </div>
                <h3 className="font-bold text-white text-sm">
                  Outras Configurações
                </h3>
              </div>

              <div className="p-6 flex flex-wrap items-end gap-x-10 gap-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="system-type"
                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-0.5"
                  >
                    Modo do Sistema
                  </label>
                  <div
                    id="system-type"
                    className="flex p-1 bg-slate-100 rounded-xl w-fit"
                  >
                    {(['Mesa', 'Comanda'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setValue('systemType', type)}
                        className={`px-8 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                          systemType === type
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="quantity"
                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-0.5"
                  >
                    Disponibilidade
                  </label>
                  <div className="flex items-center gap-2">
                    <Input.Root
                      error={!!errors.quantity}
                      className="w-24 bg-white border-slate-200 h-9 rounded-xl"
                    >
                      <Input.Control
                        id="quantity"
                        type="number"
                        {...register('quantity', { valueAsNumber: true })}
                        className="text-center font-extrabold text-sm"
                      />
                    </Input.Root>
                    <span className="text-[11px] font-bold text-slate-400 lowercase">
                      {systemType}(s)
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="service-fee"
                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-0.5"
                  >
                    Taxa de Serviço (%)
                  </label>
                  <Input.Root
                    error={!!errors.serviceFee}
                    className="w-24 bg-white border-slate-200 h-9 rounded-xl"
                  >
                    <Input.Control
                      id="service-fee"
                      type="number"
                      {...register('serviceFee', { valueAsNumber: true })}
                      className="text-center font-extrabold text-sm"
                    />
                  </Input.Root>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area (Col 4) */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 overflow-hidden">
            {/* Status Plan Card (Smaller and Compact) */}
            <div className="bg-orange-500 rounded-3xl p-6 text-white shadow-xl shadow-orange-500/10 flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck size={80} />
              </div>
              <div className="relative">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">
                  Assinatura Ativa
                </p>
                <h3 className="text-xl font-bold italic tracking-tight">
                  Edição Premium
                </h3>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-60">
                    Validade
                  </p>
                  <p className="font-bold text-sm">12 Out 2026</p>
                </div>
                <Button
                  size="sm"
                  className="bg-white text-orange-600 hover:bg-orange-50 font-bold border-none h-8 px-4 text-[10px] shadow-sm"
                >
                  RENOVAR
                </Button>
              </div>
            </div>

            {/* Backup Settings (Moved to Sidebar) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 bg-slate-100 text-slate-600 rounded-lg">
                  <Database size={16} />
                </div>
                <h3 className="font-bold text-slate-800 text-sm tracking-tight">
                  Gerenciamento de Backup
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
                    Caminho Atual
                  </p>
                  <p className="text-[10px] font-mono text-slate-500 break-all leading-relaxed">
                    C:\Users\popac\OneDrive\Documentos
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <Button
                    variant="outline"
                    className="h-9 rounded-xl text-[10px] font-bold border-slate-200"
                  >
                    ALTERAR
                  </Button>
                  <Button
                    variant="outline"
                    className="h-9 rounded-xl text-[10px] font-bold border-slate-200 gap-2"
                  >
                    <History size={14} /> HISTÓRICO
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-auto pb-4 px-2 space-y-2">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">
                Suporte Técnico
              </p>
              <button
                type="button"
                className="text-xs font-bold text-slate-500 hover:text-orange-500 transition-colors flex items-center gap-2"
              >
                Manual do Sistema <ExternalLink size={12} />
              </button>
              <button
                type="button"
                className="text-xs font-bold text-slate-500 hover:text-orange-500 transition-colors flex items-center gap-2"
              >
                Central de Ajuda <ExternalLink size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
