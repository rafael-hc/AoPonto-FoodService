import {
  Badge,
  Button,
  Dialog,
  Input,
  ModalActionFooter,
  RadioGroupSimple,
  SelectItem,
  SelectSimple
} from '@aoponto/ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FetchProductsResponseDtoProductsItem as Product } from '../../api/generated/model/fetchProductsResponseDtoProductsItem'
import { FetchUnitsResponseDtoUnitsItem as Unit } from '../../api/generated/model/fetchUnitsResponseDtoUnitsItem'
import { useUnitsControllerFetch } from '../../api/generated/units/units'

const complementSchema = z.object({
  name: z.string().min(1, { error: 'O nome é obrigatório' }),
  barcode: z.string().optional(),
  price: z.number().min(0, { error: 'O preço mínimo é 0' }),
  costPrice: z.number().optional(),
  active: z.boolean().optional(),
  labelId: z.string().optional(),
  unitId: z.uuid({ error: 'Unidade inválida' }),
  // Campos técnicos mantidos para compatibilidade com a API
  description: z.string().optional(),
  methodOfPreparation: z.string().optional(),
  minStock: z.number().optional(),
  kitchenId: z.string().nullable().optional(),
  isKitchenItem: z.boolean().optional(),
  useMobileComanda: z.boolean().optional(),
  useDigitalMenu: z.boolean().optional()
})

export type ComplementFormData = z.infer<typeof complementSchema>

interface ComplementModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product | null
  onSave: (data: ComplementFormData, shouldClose?: boolean) => void
  isPending?: boolean
}

export const ComplementModal: React.FC<ComplementModalProps> = ({
  open,
  onOpenChange,
  product,
  onSave,
  isPending = false
}) => {
  const isEditMode = !!product
  const { data: unitsData } = useUnitsControllerFetch()
  const units: Unit[] = unitsData?.units ?? []

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors }
  } = useForm<ComplementFormData>({
    resolver: zodResolver(complementSchema),
    defaultValues: {
      name: '',
      barcode: '',
      price: 0,
      costPrice: 0,
      active: true,
      labelId: undefined,
      unitId: '',
      description: '',
      methodOfPreparation: '',
      minStock: 0,
      kitchenId: null,
      isKitchenItem: false,
      useMobileComanda: true,
      useDigitalMenu: true
    }
  })

  // Efeito para carregar dados ou resetar
  React.useEffect(() => {
    if (open) {
      if (product) {
        reset({
          name: product.name,
          price: Number(product.price),
          costPrice: product.costPrice ? Number(product.costPrice) : 0,
          active: product.active,
          labelId: product.labelId,
          unitId: product.unitId,
          barcode: product.barcode || '',
          description: product.description || '',
          methodOfPreparation: product.methodOfPreparation || '',
          minStock: product.minStock || 0,
          kitchenId: product.kitchenId,
          isKitchenItem: product.isKitchenItem,
          useMobileComanda: product.useMobileComanda,
          useDigitalMenu: product.useDigitalMenu
        })
      } else {
        reset({
          name: '',
          barcode: '',
          price: 0,
          costPrice: 0,
          active: true,
          labelId: undefined,
          unitId: '',
          description: '',
          methodOfPreparation: '',
          minStock: 0,
          kitchenId: null,
          isKitchenItem: false,
          useMobileComanda: true,
          useDigitalMenu: true
        })

        // Tentar definir unidade UN como padrão se não houver produto selecionado
        if (units.length > 0) {
          const unUnit = units.find((u) => u.initials === 'UN')
          if (unUnit) {
            setValue('unitId', unUnit.id)
          }
        }
      }
    }
  }, [open, product, reset, units, setValue])

  const onFormSubmit = (data: ComplementFormData, shouldClose = true) => {
    onSave(data, shouldClose)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-slate-900/40 backdrop-blur-sm" />
        <Dialog.Content
          className="h-[80dvh] w-[70dvw] max-w-none p-0 overflow-hidden bg-slate-50 flex flex-col"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          {/* Header */}
          <div className="bg-white border-b border-slate-200 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-xl ring-4 ring-orange-500/5">
                  <PlusCircle size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {isEditMode ? 'Editar Complemento' : 'Novo Complemento'}
                  </h2>
                  <p className="text-slate-500 text-sm font-medium">
                    Preencha os dados básicos do acompanhamento
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="text-[10px] uppercase font-black tracking-widest border-slate-200 text-slate-500"
              >
                {isEditMode ? 'Edição' : 'Novo registro'}
              </Badge>
            </div>
          </div>

          {/* Form Content */}
          <div className="px-8 py-8 flex-1">
            <form
              id="complement-form"
              onSubmit={handleSubmit((d) => onFormSubmit(d, true))}
              className="space-y-6"
            >
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-8">
                  <Input.Wrapper className="space-y-2">
                    <Input.Label htmlFor="name">
                      Nome do Complemento
                    </Input.Label>
                    <Input.Root error={!!errors.name}>
                      <Input.Control
                        id="name"
                        placeholder="Ex: Queijo Extra, Bacon, etc."
                        {...register('name')}
                        className="text-lg font-semibold"
                      />
                    </Input.Root>
                    {errors.name && (
                      <Input.Message>{errors.name.message}</Input.Message>
                    )}
                  </Input.Wrapper>
                </div>

                <div className="col-span-12 md:col-span-4">
                  <label className="flex items-center gap-3 cursor-pointer select-none bg-white border border-slate-200 h-[50px] mt-[28px] px-4 rounded-lg w-full shadow-sm hover:border-orange-200 transition-colors">
                    <input
                      type="checkbox"
                      {...register('active')}
                      className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500 border-slate-300"
                    />
                    <span className="font-semibold text-slate-700">Ativo</span>
                  </label>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <Input.Wrapper className="space-y-2">
                    <Input.Label htmlFor="barcode">
                      Cód. Personalizado (Opcional)
                    </Input.Label>
                    <Input.Root error={!!errors.barcode}>
                      <Input.Control
                        id="barcode"
                        placeholder="Ex: COMP-001"
                        {...register('barcode')}
                      />
                    </Input.Root>
                  </Input.Wrapper>
                </div>

                <div className="col-span-12">
                  <Controller
                    name="unitId"
                    control={control}
                    render={({ field }) => (
                      <RadioGroupSimple
                        label="Unidade de Medida"
                        error={errors.unitId?.message}
                        value={field.value}
                        onValueChange={field.onChange}
                        options={units.map((unit) => ({
                          value: unit.id,
                          label: unit.initials,
                          description:
                            unit.initials === 'UN'
                              ? 'Unidade'
                              : unit.initials === 'KG'
                                ? 'Quilos'
                                : unit.initials === 'L'
                                  ? 'Litros'
                                  : (unit.description ?? undefined)
                        }))}
                      />
                    )}
                  />
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Input.Wrapper className="space-y-2">
                    <Input.Label htmlFor="costPrice">
                      Preço Custo (R$)
                    </Input.Label>
                    <Input.Root error={!!errors.costPrice}>
                      <Input.Control
                        id="costPrice"
                        type="number"
                        step="0.01"
                        {...register('costPrice', { valueAsNumber: true })}
                      />
                    </Input.Root>
                  </Input.Wrapper>
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Input.Wrapper className="space-y-2">
                    <Input.Label htmlFor="price">Preço Venda (R$)</Input.Label>
                    <Input.Root error={!!errors.price}>
                      <Input.Control
                        id="price"
                        type="number"
                        step="0.01"
                        {...register('price', { valueAsNumber: true })}
                      />
                    </Input.Root>
                    {errors.price && (
                      <Input.Message>{errors.price.message}</Input.Message>
                    )}
                  </Input.Wrapper>
                </div>
              </div>
            </form>
          </div>

          {/* Footer */}
          <ModalActionFooter
            onCancel={() => onOpenChange(false)}
            onSaveAndClose={handleSubmit((data) => onFormSubmit(data, true))}
            onSaveOnly={handleSubmit((data) => onFormSubmit(data, false))}
            isPending={isPending}
            saveLabel="Apenas Salvar"
            saveAndCloseLabel={
              isEditMode ? 'Salvar Alterações' : 'Salvar e Sair'
            }
          />

          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
