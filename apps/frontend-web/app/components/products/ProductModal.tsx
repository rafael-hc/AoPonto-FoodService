import { Badge, Button, Dialog, Input } from '@aoponto/ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import { Package, Plus } from 'lucide-react'
import LabelModal from './LabelModal'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  useProductsControllerCreate,
  useProductsControllerEdit
} from '../../api/generated/products/products'
import { useProductTypesControllerFetch } from '../../api/generated/product-types/product-types'
import { useLabelsControllerFetch } from '../../api/generated/labels/labels'
import { useKitchensControllerFetch } from '../../api/generated/kitchens/kitchens'
import { useUnitsControllerFetch } from '../../api/generated/units/units'
import { FetchProductsResponseDtoProductsItem as Product } from '../../api/generated/model/fetchProductsResponseDtoProductsItem'
import { FetchLabelsResponseDtoLabelsItem as Label } from '../../api/generated/model/fetchLabelsResponseDtoLabelsItem'
import { FetchProductTypesResponseDtoProductTypesItem as ProductType } from '../../api/generated/model/fetchProductTypesResponseDtoProductTypesItem'
import { FetchUnitsResponseDtoUnitsItem as Unit } from '../../api/generated/model/fetchUnitsResponseDtoUnitsItem'
import { FetchKitchensResponseDtoKitchensItem as Kitchen } from '../../api/generated/model/fetchKitchensResponseDtoKitchensItem'

const productSchema = z.object({
  name: z.string().min(1, { error: 'O nome é obrigatório' }),
  barcode: z.string().optional(),
  description: z.string().optional(),
  methodOfPreparation: z.string().optional(),
  price: z.number().min(0, { error: 'O preço mínimo é 0' }),
  costPrice: z.number().optional(),
  minStock: z.number().int().optional(),
  active: z.boolean(),
  labelId: z.string().uuid({ error: 'Categoria inválida' }),
  productTypeId: z.string().uuid({ error: 'Tipo inválido' }),
  unitId: z.string().uuid({ error: 'Unidade inválida' }),
  kitchenId: z.string().uuid().optional().nullable(),
  isKitchenItem: z.boolean(),
  useMobileComanda: z.boolean(),
  useDigitalMenu: z.boolean()
})

type ProductFormData = z.infer<typeof productSchema>

interface ProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product | null
  onSuccess?: () => void
}

export const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onOpenChange,
  product,
  onSuccess
}) => {
  const isEditMode = !!product
  const [activeTab, setActiveTab] = useState<'more' | 'config'>('more')
  const [isLabelModalOpen, setIsLabelModalOpen] = useState(false)

  // Fetches for selects
  const { data: labelsData, refetch: refetchLabels } = useLabelsControllerFetch()
  const { data: typesData } = useProductTypesControllerFetch()
  const { data: unitsData } = useUnitsControllerFetch()
  const { data: kitchensData } = useKitchensControllerFetch()

  const labels: Label[] = labelsData?.labels ?? []
  const types: ProductType[] = typesData?.productTypes ?? []
  const units: Unit[] = unitsData?.units ?? []
  const kitchens: Kitchen[] = kitchensData?.kitchens ?? []

  const {
    register,
    handleSubmit,
    reset,
    watch,
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
      productTypeId: '',
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
          productTypeId: product.productTypeId,
          unitId: product.unitId,
          kitchenId: product.kitchenId,
          barcode: product.barcode || '',
          isKitchenItem: product.isKitchenItem,
          useMobileComanda: product.useMobileComanda,
          useDigitalMenu: product.useDigitalMenu
        })
      } else {
        reset()
      }
      setActiveTab('more')
    }
  }, [open, product, reset])

  const { mutate: createProduct, isPending: isRegistering } =
    useProductsControllerCreate({
      mutation: {
        onSuccess: () => {
          onOpenChange(false)
          reset()
          onSuccess?.()
        },
        onError: (err) => {
          console.error(err)
          alert('Erro ao cadastrar.')
        }
      }
    })

  const { mutate: editProduct, isPending: isEditing } =
    useProductsControllerEdit({
      mutation: {
        onSuccess: () => {
          onOpenChange(false)
          reset()
          onSuccess?.()
        },
        onError: (err) => {
          console.error(err)
          alert('Erro ao editar.')
        }
      }
    })

  const isPending = isRegistering || isEditing

  const onFormSubmit = (data: ProductFormData) => {
    // Garante que kitchenId é nulo se isKitchenItem for false
    const finalData = {
      ...data,
      kitchenId: data.isKitchenItem ? data.kitchenId : null
    }

    if (isEditMode && product) {
      editProduct({
        id: product.id,
        data: finalData
      })
    } else {
      createProduct({
        data: finalData
      })
    }
  }

  interface SelectPlaceholderProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    children: React.ReactNode
    id: string
    error?: string
    label: string
  }

  // Helper para custom nativo select estilizado (já que o ui-kit não tem select).
  const SelectPlaceholder = ({ children, id, error, label, ...props }: SelectPlaceholderProps) => (
    <Input.Wrapper className="space-y-2">
      <Input.Label htmlFor={id}>{label}</Input.Label>
      <div
        className={`flex w-full items-center rounded-md border bg-white px-3 h-10 transition-all shadow-sm focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 overflow-hidden ${error ? 'border-red-500' : 'border-slate-300'}`}
      >
        <select
          id={id}
          className="flex-1 h-full w-full bg-transparent text-sm text-slate-700 focus:outline-none disabled:cursor-not-allowed appearance-none"
          {...props}
        >
          {children}
        </select>
      </div>
      {error && <Input.Message>{error}</Input.Message>}
    </Input.Wrapper>
  )

  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
      onPointerDownOutside={(e) => e.preventDefault()}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-slate-900/40 backdrop-blur-sm" />
        {/* Usando painel bem largo estilo ERP */}
        <Dialog.Content className="max-w-[1200px] p-0 overflow-hidden bg-slate-50 flex flex-col max-h-[90vh]">
          {/* Header estático Premium */}
          <div className="bg-white border-b border-slate-200 px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-xl ring-4 ring-orange-500/5">
                  <Package size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {isEditMode ? 'Editar Produto' : 'Novo Produto'}
                  </h2>
                  <p className="text-slate-500 text-sm font-medium">
                    Preencha os dados do item
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
              
              {/* TOP FIXO SECTION (Nome, Preço, Categoria, Unidade) */}
              <div className="grid grid-cols-12 gap-6 mb-8">
                {/* O input Name ocupa bastante espaço para ser o foco, tipo na ref. */}
                <div className="col-span-12 md:col-span-8">
                  <Input.Wrapper className="space-y-2">
                    <Input.Label htmlFor="name">Nome do Produto</Input.Label>
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
                    <Input.Label htmlFor="barcode">Cód. Personalizado (Opcional)</Input.Label>
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
                      <span className="font-semibold text-slate-700">Produto Ativo</span>
                    </label>
                </div>

                <div className="col-span-12 md:col-span-4">
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <SelectPlaceholder
                        id="labelId"
                        label="Categoria"
                        error={errors.labelId?.message}
                        {...register('labelId')}
                      >
                        <option value="">Selecione...</option>
                        {labels.map((label) => (
                          <option key={label.id} value={label.id}>{label.description}</option>
                        ))}
                      </SelectPlaceholder>
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
                  <SelectPlaceholder
                    id="unitId"
                    label="Medida/UN"
                    error={errors.unitId?.message}
                    {...register('unitId')}
                  >
                    <option value="">...</option>
                    {units.map((unit) => (
                      <option key={unit.id} value={unit.id}>{unit.initials}</option>
                    ))}
                  </SelectPlaceholder>
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
                    <Input.Label htmlFor="costPrice">Preço Custo (R$)</Input.Label>
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
                {/* Tabs Header */}
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
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'more' && (
                    <div className="grid grid-cols-2 gap-8">
                       <div className="space-y-6 col-span-2">
                          <Input.Wrapper className="space-y-2">
                            <Input.Label htmlFor="description">Descrição para o Cardápio (Dica aos Clientes)</Input.Label>
                            <div className={`flex w-full rounded-md border bg-white p-3 transition-all shadow-sm focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 ${errors.description ? 'border-red-500' : 'border-slate-300'}`}>
                              <textarea
                                id="description"
                                rows={2}
                                className="flex-1 w-full bg-transparent text-sm placeholder:text-slate-400 focus:outline-none resize-none"
                                placeholder="Exemplo: Saboroso hambúrguer de picanha na brasa, com uma fina fatia de queijo derretido e nossa famosa maionese caseira..."
                                {...register('description')}
                              />
                            </div>
                          </Input.Wrapper>

                          <Input.Wrapper className="space-y-2">
                            <Input.Label htmlFor="methodOfPreparation">Método de Preparo / Orientações</Input.Label>
                            <div className={`flex w-full rounded-md border bg-white p-3 transition-all shadow-sm focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 ${errors.methodOfPreparation ? 'border-red-500' : 'border-slate-300'}`}>
                              <textarea
                                id="methodOfPreparation"
                                rows={3}
                                className="flex-1 w-full bg-transparent text-sm placeholder:text-slate-400 focus:outline-none resize-none"
                                placeholder="Orientações internas de como preparar este prato."
                                {...register('methodOfPreparation')}
                              />
                            </div>
                          </Input.Wrapper>
                       </div>
                    </div>
                  )}

                  {activeTab === 'config' && (
                    <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                      {/* Lado Esquerdo */}
                      <div className="space-y-6">
                        <Input.Wrapper className="space-y-2">
                          <Input.Label htmlFor="productTypeId">Tipo/Natureza do Produto</Input.Label>
                          <div className={`flex w-full items-center rounded-md border bg-white px-3 h-10 transition-all shadow-sm focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 overflow-hidden ${errors.productTypeId ? 'border-red-500' : 'border-slate-300'}`}>
                            <select
                              id="productTypeId"
                              className="flex-1 h-full w-full bg-transparent text-sm text-slate-700 focus:outline-none disabled:cursor-not-allowed appearance-none"
                              {...register('productTypeId')}
                            >
                              <option value="">Selecione o tipo do produto...</option>
                              {types.map((productType) => (
                                <option key={productType.id} value={productType.id}>{productType.description}</option>
                              ))}
                            </select>
                          </div>
                          {errors.productTypeId && <Input.Message>{errors.productTypeId.message}</Input.Message>}
                        </Input.Wrapper>

                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input 
                              type="checkbox" 
                              {...register('isKitchenItem')}
                              className="w-5 h-5 mt-0.5 text-orange-600 rounded focus:ring-orange-500 border-slate-300"
                            />
                            <div>
                              <p className="font-semibold text-slate-700">Item para Cozinha</p>
                              <p className="text-xs text-slate-500">Imprimir este item no cupom de produção (cozinha)</p>
                            </div>
                          </label>

                          <div className={`transition-all overflow-hidden ${isKitchenItemActive ? 'max-h-24 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                            <SelectPlaceholder
                              id="kitchenId"
                              label="Selecione o setor de impressão (Cozinha/Bar)"
                              {...register('kitchenId')}
                            >
                              <option value="">Nenhum/Padrão</option>
                              {kitchens.map((kitchen) => (
                                <option key={kitchen.id} value={kitchen.id}>{kitchen.description}</option>
                              ))}
                            </SelectPlaceholder>
                          </div>
                        </div>

                      </div>

                      {/* Lado Direito */}
                      <div className="space-y-6">
                        <Input.Wrapper className="space-y-2">
                          <Input.Label htmlFor="minStock">Estoque Mínimo de Alerta</Input.Label>
                          <Input.Root error={!!errors.minStock}>
                            <Input.Control
                              id="minStock"
                              type="number"
                              {...register('minStock', { valueAsNumber: true })}
                            />
                          </Input.Root>
                        </Input.Wrapper>

                        <div className="space-y-3">
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Disponibilidade do Item (Exibição)</p>
                            <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                              <span className="font-semibold text-slate-700 text-sm">Comanda Mobile (Garçom)</span>
                              <input 
                                type="checkbox" 
                                {...register('useMobileComanda')}
                                className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500 border-slate-300"
                              />
                            </label>
                            
                            <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                              <span className="font-semibold text-slate-700 text-sm">Cardápio Digital / Dino</span>
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
                </div>
              </div>

            </form>
          </div>

          {/* Footer FIXO inferior */}
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
              <Button type="submit" form="product-form" disabled={isPending} className="px-8 shadow-lg shadow-orange-500/20 text-md">
                {isPending
                  ? 'Processando...'
                  : isEditMode
                    ? 'Salvar Alterações (F2)'
                    : 'Cadastrar (F2)'}
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
