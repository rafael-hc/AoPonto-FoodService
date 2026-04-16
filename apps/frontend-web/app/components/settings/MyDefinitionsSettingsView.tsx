import {
  Button,
  Checkbox,
  Input,
  SelectItem,
  SelectSimple
} from '@aoponto/ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowLeft,
  Check,
  ClipboardList,
  Package,
  Search,
  ShieldCheck,
  Truck
} from 'lucide-react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const myDefinitionsSettingsSchema = z
  .object({
    // Pedidos e Busca
    enableCustomCodeSearch: z.boolean().default(true),
    chargeHighestValueHalfAndHalf: z.boolean().default(false),
    autoRemoveEmptyOrders: z.boolean().default(true),
    allowPaymentsClosedBox: z.boolean().default(false),
    assignLoggedUserAsAttendant: z.boolean().default(true),
    assignLoggedUserAsDeliveryman: z.boolean().default(false),
    chargeServiceFeeOnCounter: z.boolean().default(true),
    linkAddonAnswersToMainProduct: z.boolean().default(true),

    // Delivery e Bina
    useMapsForDelivery: z.boolean().default(true),
    binaIgnoreInitialDigits: z.boolean().default(false),
    binaIgnoreDigitsCount: z.number().default(1),
    defaultDeliverymanId: z.string().default('Maycon'),
    autoChangeStatusToInProduction: z.boolean().default(true),

    // Produtos e Estoque
    allowNegativeProductStock: z.boolean().default(true),
    allowNegativeIngredientStock: z.boolean().default(true),
    autoUpdateCostPriceByIngredients: z.boolean().default(true),
    enableEAN13Search: z.boolean().default(false),
    allowRemoveIngredientsOnOrder: z.boolean().default(true),
    requireAddonsOnOrder: z.boolean().default(false),

    // Permissões e Outros
    adminOnlyPermissions: z.boolean().default(true)
  })
  .required()

export type MyDefinitionsSettingsData = z.infer<
  typeof myDefinitionsSettingsSchema
>

interface MyDefinitionsSettingsViewProps {
  onBack: () => void
  onSave: (data: MyDefinitionsSettingsData) => void
}

const SectionHeader = ({
  icon: Icon,
  title,
  className = ''
}: {
  icon: React.ElementType
  title: string
  className?: string
}) => (
  <div className={cn('flex items-center gap-2 mb-6', className)}>
    <div className="p-1.5 bg-slate-100 text-slate-600 rounded-lg">
      <Icon size={16} />
    </div>
    <h3 className="font-bold text-slate-800 text-sm tracking-tight capitalize">
      {title}
    </h3>
  </div>
)

const GroupContainer = ({
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div
    className={cn(
      'bg-white rounded-4xl border border-slate-200 p-8 shadow-sm flex flex-col h-full',
      className
    )}
  >
    {children}
  </div>
)

import { cn } from '@aoponto/ui-kit'

export const MyDefinitionsSettingsView: React.FC<
  MyDefinitionsSettingsViewProps
> = ({ onBack, onSave }) => {
  const { register, handleSubmit, control } =
    useForm<MyDefinitionsSettingsData>({
      resolver: zodResolver(myDefinitionsSettingsSchema),
      defaultValues: {
        enableCustomCodeSearch: true,
        chargeHighestValueHalfAndHalf: false,
        autoRemoveEmptyOrders: true,
        allowPaymentsClosedBox: false,
        assignLoggedUserAsAttendant: true,
        assignLoggedUserAsDeliveryman: false,
        chargeServiceFeeOnCounter: true,
        linkAddonAnswersToMainProduct: true,
        useMapsForDelivery: true,
        binaIgnoreInitialDigits: false,
        binaIgnoreDigitsCount: 1,
        defaultDeliverymanId: 'Maycon',
        autoChangeStatusToInProduction: true,
        allowNegativeProductStock: true,
        allowNegativeIngredientStock: true,
        autoUpdateCostPriceByIngredients: true,
        enableEAN13Search: false,
        allowRemoveIngredientsOnOrder: true,
        requireAddonsOnOrder: false,
        adminOnlyPermissions: true
      }
    })

  return (
    <form
      onSubmit={handleSubmit(onSave)}
      className="flex flex-col h-full bg-slate-50/50 overflow-hidden"
    >
      {/* Header Premium (Identical to GeneralSettingsView) */}
      <div className="bg-slate-900 px-8 py-3.5 flex items-center justify-between border-b border-white/10 shrink-0">
        <button
          type="button"
          onClick={onBack}
          className="group flex items-center gap-3 text-white hover:text-orange-400 font-bold transition-all text-xs"
        >
          <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-orange-50/10 border border-white/10 transition-colors">
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

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Section: Pedidos e Busca */}
            <GroupContainer className="md:col-span-2">
              <SectionHeader icon={Search} title="Pedidos e Busca" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                <Checkbox
                  label="Ativar busca de produto pelo código personalizado"
                  {...register('enableCustomCodeSearch')}
                />
                <Checkbox
                  label="Novo pedido - atribuir o usuário logado como atendente (mesas e comandas)"
                  {...register('assignLoggedUserAsAttendant')}
                />
                <Checkbox
                  label="Itens meio a meio - cobrar pelo item de maior valor quando houver mais de um sabor"
                  {...register('chargeHighestValueHalfAndHalf')}
                />
                <Checkbox
                  label="Novo pedido - atribuir o usuário logado como entregador (delivery)"
                  {...register('assignLoggedUserAsDeliveryman')}
                />
                <Checkbox
                  label="Remover automaticamente pedido sem consumo (mesas e delivery)"
                  {...register('autoRemoveEmptyOrders')}
                />
                <Checkbox
                  label="Pedido Balcão - cobrar taxa de serviço em pedidos no balcão"
                  {...register('chargeServiceFeeOnCounter')}
                />
                <Checkbox
                  label="Permitir lançar pagamentos previstos quando o caixa está fechado"
                  {...register('allowPaymentsClosedBox')}
                />
                <Checkbox
                  label="Vincular as respostas (complementos e observações) no produto principal ao adicionar com pergunta"
                  {...register('linkAddonAnswersToMainProduct')}
                />
              </div>
            </GroupContainer>

            {/* Section: Delivery e Bina */}
            <GroupContainer>
              <SectionHeader icon={Truck} title="Delivery e Bina" />
              <div className="flex flex-col gap-6">
                <Checkbox
                  label="Delivery - usar mapas para mostrar local da entrega"
                  {...register('useMapsForDelivery')}
                />
                <div className="flex items-center gap-4">
                  <Checkbox
                    label="Bina - Ignorar dígitos iniciais no IC Box"
                    {...register('binaIgnoreInitialDigits')}
                  />
                  <Input.Root className="w-20 bg-slate-50 border-slate-200 h-8 rounded-lg mt-1">
                    <Input.Control
                      type="number"
                      className="text-center font-bold text-xs"
                      {...register('binaIgnoreDigitsCount', {
                        valueAsNumber: true
                      })}
                    />
                  </Input.Root>
                </div>

                <Controller
                  name="defaultDeliverymanId"
                  control={control}
                  render={({ field }) => (
                    <SelectSimple
                      label="Entregador Padrão"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectItem value="Maycon">Maycon</SelectItem>
                      <SelectItem value="Joao">João Silva</SelectItem>
                      <SelectItem value="Outro">A definir...</SelectItem>
                    </SelectSimple>
                  )}
                />

                <Checkbox
                  label="Delivery - alterar status do pedido para 'Em Produção' após impressão do cupom na cozinha"
                  {...register('autoChangeStatusToInProduction')}
                />
              </div>
            </GroupContainer>

            {/* Section: Produtos e Estoque */}
            <GroupContainer>
              <SectionHeader icon={Package} title="Produtos e Estoque" />
              <div className="flex flex-col gap-6">
                <Checkbox
                  label="Permitir estoque negativo para produtos"
                  {...register('allowNegativeProductStock')}
                />
                <Checkbox
                  label="Produtos acabados - ativar cadastro e busca pelo código de barras (EAN13)"
                  {...register('enableEAN13Search')}
                />
                <Checkbox
                  label="Permitir estoque negativo para insumos"
                  {...register('allowNegativeIngredientStock')}
                />
                <Checkbox
                  label="Permitir remover insumos da ficha técnica ao inserir o item no pedido"
                  description="(Itens removidos não são baixados do estoque)"
                  {...register('allowRemoveIngredientsOnOrder')}
                />
                <Checkbox
                  label="Atualizar automaticamente preço de custo do produto baseado nos insumos"
                  {...register('autoUpdateCostPriceByIngredients')}
                />
                <Checkbox
                  label="Tornar obrigatório adicionar ou editar item no pedido com as perguntas (se houver)"
                  {...register('requireAddonsOnOrder')}
                />
              </div>
            </GroupContainer>

            {/* Section: Permissões e Outros */}
            <GroupContainer className="md:col-span-2">
              <SectionHeader icon={ShieldCheck} title="Permissões e Outros" />
              <Checkbox
                label="Liberação de permissões para operações apenas por usuários Administradores"
                {...register('adminOnlyPermissions')}
              />
            </GroupContainer>
          </div>

          <div className="flex justify-center pb-8 pt-4">
            <p className="flex items-center gap-2 text-[10px] uppercase font-black tracking-[0.2em] text-slate-300">
              <ClipboardList size={14} className="opacity-50" />
              Configurações Locais de Funcionamento
            </p>
          </div>
        </div>
      </div>
    </form>
  )
}
