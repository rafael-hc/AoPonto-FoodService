import { Badge, Button, Dialog, Input, SelectSimple, SelectItem } from '@aoponto/ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import { Package, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useKitchensControllerFetch } from '../../api/generated/kitchens/kitchens'
import { useLabelsControllerFetch } from '../../api/generated/labels/labels'
import { FetchKitchensResponseDtoKitchensItem as Kitchen } from '../../api/generated/model/fetchKitchensResponseDtoKitchensItem'
import { FetchLabelsResponseDtoLabelsItem as Label } from '../../api/generated/model/fetchLabelsResponseDtoLabelsItem'
import { FetchProductsResponseDtoProductsItem as Product } from '../../api/generated/model/fetchProductsResponseDtoProductsItem'
import { FetchUnitsResponseDtoUnitsItem as Unit } from '../../api/generated/model/fetchUnitsResponseDtoUnitsItem'
import { useUnitsControllerFetch } from '../../api/generated/units/units'
import LabelModal from './LabelModal'
import { WizardLinker } from '../wizard/WizardLinker'

// Removido o productTypeId já que agora é tratado pelo backend em rotas separadas
const productSchema = z.object({
  name: z.string().min(1, { error: 'O nome é obrigatório' }),
  barcode: z.string().optional(),
  description: z.string().optional(),
  methodOfPreparation: z.string().optional(),
  price: z.number().min(0, { error: 'O preço mínimo é 0' }),
  costPrice: z.number().optional(),
  minStock: z.number().int().optional(),
  active: z.boolean(),
  labelId: z.uuid({ error: 'Categoria inválida' }),
  unitId: z.uuid({ error: 'Unidade inválida' }),
  kitchenId: z.uuid().optional().nullable(),
  isKitchenItem: z.boolean(),
  useMobileComanda: z.boolean(),
  useDigitalMenu: z.boolean()
})

export type ProductFormData = z.infer<typeof productSchema>

interface ProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product | null
  onSuccess?: () => void
  onSave: (data: ProductFormData) => void // Função de salvamento injetada pela página
  isPending?: boolean // Estado de carregamento injetado
}

export const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onOpenChange,
  product,
  onSave,
  isPending = false
}) => {
  const isEditMode = !!product
  const [activeTab, setActiveTab] = useState<'more' | 'config' | 'wizard'>('more')
  const [isLabelModalOpen, setIsLabelModalOpen] = useState(false)

  // Fetches para selects
  const { data: labelsData, refetch: refetchLabels } =
    useLabelsControllerFetch()
  const { data: unitsData } = useUnitsControllerFetch()
  const { data: kitchensData } = useKitchensControllerFetch()

  const labels: Label[] = labelsData?.labels ?? []
  const units: Unit[] = unitsData?.units ?? []
  const kitchens: Kitchen[] = kitchensData?.kitchens ?? []

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors }
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      barcode: '',
      description: '',
      methodOfPreparation: '',
      price: 0,
      costPrice: 0,
      minStock: 0,
      active: true,
      labelId: '',
      unitId: '',
      kitchenId: null,
      isKitchenItem: false,
      useMobileComanda: true,
      useDigitalMenu: true
    }
  })

  // Assistindo isKitchenItem para habilitar kitchenId
  const isKitchenItemActive = watch('isKitchenItem')

  React.useEffect(() => {
    if (open) {
      if (product) {
        reset({
          name: product.name,
          description: product.description || '',
          methodOfPreparation: product.methodOfPreparation || '',
          price: Number(product.price),
          costPrice: product.costPrice ? Number(product.costPrice) : 0,
          minStock: product.minStock || 0,
          active: product.active,
          labelId: product.labelId,
          unitId: product.unitId,
          kitchenId: product.kitchenId,
          barcode: product.barcode || '',
          isKitchenItem: product.isKitchenItem,
          useMobileComanda: product.useMobileComanda,
          useDigitalMenu: product.useDigitalMenu
        })
      } else {
        reset({
          name: '',
          barcode: '',
          description: '',
          methodOfPreparation: '',
          price: 0,
          costPrice: 0,
          minStock: 0,
          active: true,
          labelId: '',
          unitId: '',
          kitchenId: null,
          isKitchenItem: false,
          useMobileComanda: true,
          useDigitalMenu: true
        })
      }
      setActiveTab('more')
    }
  }, [open, product, reset])

  const onFormSubmit = (data: ProductFormData) => {
    // Garante que kitchenId é nulo se isKitchenItem for false
    const finalData = {
      ...data,
      kitchenId: data.isKitchenItem ? data.kitchenId : null
    }
    onSave(finalData)
  }


  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-slate-900/40 backdrop-blur-sm" />
        <Dialog.Content 
          className="h-[80dvh] w-[70dvw] max-w-none p-0 overflow-hidden bg-slate-50 flex flex-col"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          {/* Header estático Premium */}
          <div className="bg-white border-b border-slate-200 px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-xl ring-4 ring-orange-500/5">
                  <Package size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {isEditMode ? 'Editar Item' : 'Novo Registro'}
                  </h2>
                  <p className="text-slate-500 text-sm font-medium">
                    Preencha os dados básicos do item
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

          {/* Form Content scrollable */}
          <div className="overflow-y-auto flex-1 px-8 py-6">
            <form id="product-form" onSubmit={handleSubmit(onFormSubmit)}>
              <div className="grid grid-cols-12 gap-6 mb-8">
                <div className="col-span-12 md:col-span-8">
                  <Input.Wrapper className="space-y-2">
                    <Input.Label htmlFor="name">Nome do Item</Input.Label>
                    <Input.Root error={!!errors.name}>
                      <Input.Control
                        id="name"
                        placeholder="Ex: Hambúrguer Artesanal Smash"
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
                  <Input.Wrapper className="space-y-2">
                    <Input.Label htmlFor="barcode">
                      Cód. Personalizado (Opcional)
                    </Input.Label>
                    <Input.Root error={!!errors.barcode}>
                      <Input.Control
                        id="barcode"
                        placeholder="Ex: PROD-001"
                        {...register('barcode')}
                      />
                    </Input.Root>
                  </Input.Wrapper>
                </div>

                <div className="col-span-12 md:col-span-4 flex items-end">
                  <label className="flex items-center gap-3 cursor-pointer select-none bg-white border border-slate-200 p-3 rounded-lg w-full shadow-sm hover:border-orange-200 transition-colors">
                    <input
                      type="checkbox"
                      {...register('active')}
                      className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500 border-slate-300"
                    />
                    <span className="font-semibold text-slate-700">Ativo</span>
                  </label>
                </div>

                <div className="col-span-12 md:col-span-4">
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Controller
                        name="labelId"
                        control={control}
                        render={({ field }) => (
                          <SelectSimple
                            label="Categoria"
                            placeholder="Selecione..."
                            error={errors.labelId?.message}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            {labels.map((label) => (
                              <SelectItem key={label.id} value={label.id}>
                                {label.description}
                              </SelectItem>
                            ))}
                          </SelectSimple>
                        )}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsLabelModalOpen(true)}
                      className="h-10 w-10 p-0 border-slate-300 hover:border-orange-500 hover:bg-orange-50 text-slate-400 hover:text-orange-600 transition-all shadow-sm"
                      title="Nova Categoria"
                    >
                      <Plus size={20} />
                    </Button>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-2">
                  <Controller
                    name="unitId"
                    control={control}
                    render={({ field }) => (
                      <SelectSimple
                        label="Medida/UN"
                        placeholder="..."
                        error={errors.unitId?.message}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        {units.map((unit) => (
                          <SelectItem key={unit.id} value={unit.id}>
                            {unit.initials}
                          </SelectItem>
                        ))}
                      </SelectSimple>
                    )}
                  />
                </div>

                <div className="col-span-12 md:col-span-3">
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

                <div className="col-span-12 md:col-span-3">
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
              </div>

              {/* TABS E SECTION INFERIOR */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="flex border-b border-slate-200 bg-slate-50/50 px-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('more')}
                    className={`px-6 py-3 font-semibold text-sm rounded-t-lg transition-colors pb-[10px] border-b-2 ${
                      activeTab === 'more'
                        ? 'bg-white text-orange-600 border-orange-500 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]'
                        : 'text-slate-500 border-transparent hover:text-slate-700'
                    }`}
                  >
                    Mais Detalhes
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('config')}
                    className={`px-6 py-3 font-semibold text-sm rounded-t-lg transition-colors pb-[10px] border-b-2 ${
                      activeTab === 'config'
                        ? 'bg-white text-orange-600 border-orange-500 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]'
                        : 'text-slate-500 border-transparent hover:text-slate-700'
                    }`}
                  >
                    Estoque & Configurações
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('wizard')}
                    className={`px-6 py-3 font-semibold text-sm rounded-t-lg transition-colors pb-[10px] border-b-2 ${
                      activeTab === 'wizard'
                        ? 'bg-white text-orange-600 border-orange-500 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]'
                        : 'text-slate-500 border-transparent hover:text-slate-700'
                    }`}
                  >
                    Wizard de Perguntas
                  </button>
                </div>

                <div className="p-6">
                  {activeTab === 'more' && (
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-6 col-span-2">
                        <Input.Wrapper className="space-y-2">
                          <Input.Label htmlFor="description">
                            Descrição para o Cardápio
                          </Input.Label>
                          <div
                            className={`flex w-full rounded-md border bg-white p-3 transition-all shadow-sm focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 ${errors.description ? 'border-red-500' : 'border-slate-300'}`}
                          >
                            <textarea
                              id="description"
                              rows={2}
                              className="flex-1 w-full bg-transparent text-sm placeholder:text-slate-400 focus:outline-none resize-none"
                              placeholder="..."
                              {...register('description')}
                            />
                          </div>
                        </Input.Wrapper>

                        <Input.Wrapper className="space-y-2">
                          <Input.Label htmlFor="methodOfPreparation">
                            Método de Preparo
                          </Input.Label>
                          <div
                            className={`flex w-full rounded-md border bg-white p-3 transition-all shadow-sm focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 ${errors.methodOfPreparation ? 'border-red-500' : 'border-slate-300'}`}
                          >
                            <textarea
                              id="methodOfPreparation"
                              rows={3}
                              className="flex-1 w-full bg-transparent text-sm placeholder:text-slate-400 focus:outline-none resize-none"
                              placeholder="..."
                              {...register('methodOfPreparation')}
                            />
                          </div>
                        </Input.Wrapper>
                      </div>
                    </div>
                  )}

                  {activeTab === 'config' && (
                    <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                      <div className="space-y-6">
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              {...register('isKitchenItem')}
                              className="w-5 h-5 mt-0.5 text-orange-600 rounded focus:ring-orange-500 border-slate-300"
                            />
                            <div>
                              <p className="font-semibold text-slate-700">
                                Item para Cozinha
                              </p>
                            </div>
                          </label>

                          <div
                            className={`transition-all overflow-hidden ${isKitchenItemActive ? 'max-h-24 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}
                          >
                            <Controller
                              name="kitchenId"
                              control={control}
                              render={({ field }) => (
                                <SelectSimple
                                  label="Setor de impressão"
                                  placeholder="Nenhum/Padrão"
                                  value={field.value || ''}
                                  onValueChange={field.onChange}
                                >
                                  {kitchens.map((kitchen) => (
                                    <SelectItem
                                      key={kitchen.id}
                                      value={kitchen.id}
                                    >
                                      {kitchen.description}
                                    </SelectItem>
                                  ))}
                                </SelectSimple>
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <Input.Wrapper className="space-y-2">
                          <Input.Label htmlFor="minStock">
                            Estoque Mínimo
                          </Input.Label>
                          <Input.Root error={!!errors.minStock}>
                            <Input.Control
                              id="minStock"
                              type="number"
                              {...register('minStock', { valueAsNumber: true })}
                            />
                          </Input.Root>
                        </Input.Wrapper>

                        <div className="space-y-3">
                          <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                            <span className="font-semibold text-slate-700 text-sm">
                              Comanda Mobile
                            </span>
                            <input
                              type="checkbox"
                              {...register('useMobileComanda')}
                              className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500 border-slate-300"
                            />
                          </label>

                          <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                            <span className="font-semibold text-slate-700 text-sm">
                              Cardápio Digital
                            </span>
                            <input
                              type="checkbox"
                              {...register('useDigitalMenu')}
                              className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500 border-slate-300"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'wizard' && (
                    <div className="h-[430px]">
                      {isEditMode && product?.id ? (
                        <WizardLinker productId={product.id} />
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                          <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                            <Plus size={32} className="text-slate-300" />
                          </div>
                          <h4 className="text-lg font-bold text-slate-800 mb-2">Configure o Wizard após salvar</h4>
                          <p className="text-sm text-slate-500 max-w-[300px]">
                            Para vincular perguntas de personalização, salve este item primeiro para gerar um código de registro.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="bg-slate-100 border-t border-slate-200 px-8 py-4 flex items-center justify-between shrink-0">
            <Button
              type="button"
              variant="outline"
              className="bg-white"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              form="product-form"
              disabled={isPending}
              className="px-8 shadow-lg shadow-orange-500/20 text-md"
            >
              {isPending ? 'Processando...' : 'Salvar Alterações'}
            </Button>
          </div>

          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>

      <LabelModal
        open={isLabelModalOpen}
        onOpenChange={setIsLabelModalOpen}
        onSuccess={() => refetchLabels()}
      />
    </Dialog.Root>
  )
}
