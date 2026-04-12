import { Badge, Button, Dialog, Input } from '@aoponto/ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import type { AxiosError } from 'axios'
import {
  AlertCircle,
  HelpCircle,
  Layers,
  Package,
  PlusCircle,
  Search,
  Settings2,
  Trash2
} from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useComplementsControllerList } from '../../api/generated/complements/complements'
import type { FetchProductsResponseDtoProductsItem as Product } from '../../api/generated/model/fetchProductsResponseDtoProductsItem'
import type { FetchWizardQuestionsResponseDtoWizardQuestionsItem as WizardQuestion } from '../../api/generated/model/fetchWizardQuestionsResponseDtoWizardQuestionsItem'
import type { ZodValidationErrorDto } from '../../api/generated/model/zodValidationErrorDto'
import { useProductsControllerList } from '../../api/generated/products/products'
import { useWizardQuestionsControllerSync } from '../../api/generated/wizard-questions-global-bank/wizard-questions-global-bank'

const COMPLEMENTO_TYPE_ID = 'b0dff670-38ad-4917-8952-1314a6e0d7cb'

// Schema de Validação
const wizardQuestionSchema = z
  .object({
    id: z.uuid().optional(),
    description: z.string().min(1, 'A descrição é obrigatória'),
    context: z.enum(['PRODUCT', 'COMBO']),
    minResponses: z.number().min(0, 'Mínimo de respostas é 0'),
    maxResponses: z.number().min(0, 'Máximo de respostas é 0'),
    minItems: z.number().min(0, 'Mínimo de itens é 0'),
    maxItems: z.number().min(0, 'Máximo de itens é 0'),
    options: z
      .array(
        z.object({
          productId: z.uuid('ID do produto inválido'),
          productName: z.string(), // Apenas para exibição
          promoPrice: z.number().min(0, 'Preço mínimo é 0').optional(),
          maxQuantity: z.number().min(0, 'Qtd mínima é 0').optional()
        })
      )
      .min(1, 'Adicione pelo menos uma opção')
  })
  .refine((data) => data.maxResponses >= data.minResponses, {
    message: 'Máximo de respostas não pode ser menor que o mínimo',
    path: ['maxResponses']
  })
  .refine((data) => data.maxItems >= data.minItems, {
    message: 'Máximo de itens não pode ser menor que o mínimo',
    path: ['maxItems']
  })

type WizardQuestionFormData = z.infer<typeof wizardQuestionSchema>

interface WizardQuestionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  question?: WizardQuestion | null
  onSuccess?: () => void
}

export const WizardQuestionModal: React.FC<WizardQuestionModalProps> = ({
  open,
  onOpenChange,
  question,
  onSuccess
}) => {
  const isEditMode = !!question
  const [productSearch, setProductSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Hook de Sincronização
  const { mutate: syncQuestion, isPending } = useWizardQuestionsControllerSync<
    AxiosError<ZodValidationErrorDto>
  >({
    mutation: {
      onSuccess: () => {
        onSuccess?.()
        onOpenChange(false)
      },
      onError: (error) => {
        const message =
          error?.response?.data?.message ||
          'Erro ao salvar pergunta. Verifique os dados e tente novamente.'
        setErrorMessage(message)
      }
    }
  })

  // Hook de Busca de Produtos para opções (Backend separa Produtos de Complementos em endpoints distintos)
  const { data: productsData, isLoading: isLoadingProducts } =
    useProductsControllerList()
  const { data: complementsData, isLoading: isLoadingComplements } =
    useComplementsControllerList()

  const isLoadingData = isLoadingProducts || isLoadingComplements

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors }
  } = useForm<WizardQuestionFormData>({
    resolver: zodResolver(wizardQuestionSchema),
    defaultValues: {
      description: '',
      context: 'PRODUCT',
      minResponses: 1,
      maxResponses: 1,
      minItems: 1,
      maxItems: 1,
      options: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options'
  })

  // Sincronizar dados ao abrir para edição
  React.useEffect(() => {
    if (open) {
      if (question) {
        reset({
          id: question.id,
          description: question.description,
          context: question.context || 'PRODUCT',
          minResponses: question.minResponses,
          maxResponses: question.maxResponses,
          minItems: question.minItems,
          maxItems: question.maxItems,
          options:
            question.options?.map((opt) => ({
              productId: opt.productId || '',
              productName: opt.description,
              promoPrice: opt.promoPrice ? Number(opt.promoPrice) : undefined,
              maxQuantity: opt.maxQty || undefined
            })) || []
        })
      } else {
        reset({
          description: '',
          context: 'PRODUCT',
          minResponses: 1,
          maxResponses: 1,
          minItems: 1,
          maxItems: 1,
          options: []
        })
      }
      setProductSearch('')
      setErrorMessage(null)
    }
  }, [open, question, reset])

  const onFormSubmit = (data: WizardQuestionFormData) => {
    syncQuestion({
      data: {
        id: data.id,
        description: data.description,
        context: data.context,
        minResponses: data.minResponses,
        maxResponses: data.maxResponses,
        minItems: data.minItems,
        maxItems: data.maxItems,
        options: data.options.map((opt) => ({
          productId: opt.productId,
          description: opt.productName,
          promoPrice: opt.promoPrice,
          maxQty: opt.maxQuantity || 0
        }))
      }
    })
  }

  const handleAddProduct = (product: Product) => {
    // Evita duplicados
    if (fields.some((f) => f.productId === product.id)) return

    append({
      productId: product.id,
      productName: product.name,
      promoPrice: undefined,
      maxQuantity: undefined
    })
    setProductSearch('')
  }

  const currentContext = watch('context') || 'PRODUCT'

  const availableProducts = useMemo(() => {
    const allProducts = [
      ...(productsData?.products || []),
      ...(complementsData?.products || [])
    ]
    return allProducts.filter((p) => {
      // Filtro de Busca por Texto e já adicionados
      const matchesSearch = p.name
        .toLowerCase()
        .includes(productSearch.toLowerCase())
      const notAdded = !fields.some((f) => f.productId === p.id)

      if (!matchesSearch || !notAdded) return false

      // Lógica de Contexto
      if (currentContext === 'PRODUCT') {
        return p.productTypeId === COMPLEMENTO_TYPE_ID
      }

      return p.productTypeId !== COMPLEMENTO_TYPE_ID
    })
  }, [productsData, complementsData, fields, productSearch, currentContext])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-slate-900/40 backdrop-blur-sm" />
        <Dialog.Content
          className="h-[90dvh] w-[85dvw] max-w-5xl p-0 overflow-hidden bg-slate-50 flex flex-col"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          {/* Header Premium */}
          <div className="bg-white border-b border-slate-200 px-8 py-6 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-xl ring-4 ring-orange-500/5">
                  <HelpCircle size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {isEditMode ? 'Editar Pergunta' : 'Nova Pergunta Global'}
                  </h2>
                  <p className="text-slate-500 text-sm font-medium">
                    Configure as regras de seleção e os itens disponíveis.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isEditMode && (
                  <span className="text-[10px] font-mono font-black text-slate-400 bg-slate-100 px-2 py-1 rounded">
                    ID: {question?.id.split('-')[0]}
                  </span>
                )}
                <Badge
                  variant="outline"
                  className="uppercase font-black text-[10px] tracking-widest border-orange-200 text-orange-600"
                >
                  Wizard
                </Badge>
              </div>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="bg-red-50 border-b border-red-100 px-8 py-3 flex items-center gap-3 animate-in fade-in slide-in-from-top-1">
              <AlertCircle size={16} className="text-red-500" />
              <span className="text-[10px] font-black uppercase tracking-wider text-red-600">
                {typeof errorMessage === 'string'
                  ? errorMessage
                  : 'Falha na comunicação com o servidor'}
              </span>
              <button
                type="button"
                onClick={() => setErrorMessage(null)}
                className="ml-auto p-1 hover:bg-red-100 rounded-lg transition-colors"
                title="Fechar alerta"
              >
                <PlusCircle size={14} className="text-red-400 rotate-45" />
              </button>
            </div>
          )}

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
            <form
              id="wizard-question-form"
              onSubmit={handleSubmit(onFormSubmit)}
              className="space-y-8"
            >
              {/* Definições Báscias */}
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-8">
                  <Input.Wrapper className="space-y-2">
                    <Input.Label>
                      Descrição da Pergunta (Ex: Ponto da Carne?)
                    </Input.Label>
                    <Input.Root error={!!errors.description}>
                      <Input.Control
                        placeholder="..."
                        {...register('description')}
                        className="text-lg font-bold"
                      />
                    </Input.Root>
                    {errors.description && (
                      <Input.Message>
                        {errors.description.message}
                      </Input.Message>
                    )}
                  </Input.Wrapper>
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Input.Wrapper className="space-y-2">
                    <Input.Label>Contexto da Pergunta</Input.Label>
                    <Controller
                      name="context"
                      control={control}
                      render={({ field }) => (
                        <div className="flex bg-slate-100 p-1 rounded-xl gap-1 border border-slate-200">
                          <button
                            type="button"
                            onClick={() => field.onChange('PRODUCT')}
                            className={`flex-1 py-2 px-3 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all ${
                              field.value === 'PRODUCT'
                                ? 'bg-white text-orange-600 shadow-sm border border-slate-200'
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                          >
                            Produto (Complementos)
                          </button>
                          <button
                            type="button"
                            onClick={() => field.onChange('COMBO')}
                            className={`flex-1 py-2 px-3 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all ${
                              field.value === 'COMBO'
                                ? 'bg-white text-blue-600 shadow-sm border border-slate-200'
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                          >
                            Combo (Produtos Base)
                          </button>
                        </div>
                      )}
                    />
                  </Input.Wrapper>
                </div>

                <div className="col-span-12">
                  <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex items-center gap-3 w-full">
                    <AlertCircle className="text-blue-500 shrink-0" size={18} />
                    <p className="text-[11px] font-medium text-blue-700 leading-tight">
                      Estas regras definem quantos itens o cliente DEVE e PODE
                      selecionar, e se a busca deve retornar adicionais ou
                      produtos base.
                    </p>
                  </div>
                </div>

                {/* Grid de Regras Numericas */}
                <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Input.Wrapper className="space-y-1.5 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Settings2 size={14} className="text-orange-500" />
                      <Input.Label className="uppercase text-[10px] tracking-wider font-black text-slate-400">
                        Mín. Respostas
                      </Input.Label>
                    </div>
                    <Input.Root error={!!errors.minResponses}>
                      <Input.Control
                        type="number"
                        {...register('minResponses', { valueAsNumber: true })}
                      />
                    </Input.Root>
                  </Input.Wrapper>

                  <Input.Wrapper className="space-y-1.5 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Settings2 size={14} className="text-orange-500" />
                      <Input.Label className="uppercase text-[10px] tracking-wider font-black text-slate-400">
                        Máx. Respostas
                      </Input.Label>
                    </div>
                    <Input.Root error={!!errors.maxResponses}>
                      <Input.Control
                        type="number"
                        {...register('maxResponses', { valueAsNumber: true })}
                      />
                    </Input.Root>
                    {errors.maxResponses && (
                      <Input.Message>
                        {errors.maxResponses.message}
                      </Input.Message>
                    )}
                  </Input.Wrapper>

                  <Input.Wrapper className="space-y-1.5 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Layers size={14} className="text-blue-500" />
                      <Input.Label className="uppercase text-[10px] tracking-wider font-black text-slate-400">
                        Mín. Itens p/ Resposta
                      </Input.Label>
                    </div>
                    <Input.Root error={!!errors.minItems}>
                      <Input.Control
                        type="number"
                        {...register('minItems', { valueAsNumber: true })}
                      />
                    </Input.Root>
                  </Input.Wrapper>

                  <Input.Wrapper className="space-y-1.5 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Layers size={14} className="text-blue-500" />
                      <Input.Label className="uppercase text-[10px] tracking-wider font-black text-slate-400">
                        Máx. Itens p/ Resposta
                      </Input.Label>
                    </div>
                    <Input.Root error={!!errors.maxItems}>
                      <Input.Control
                        type="number"
                        {...register('maxItems', { valueAsNumber: true })}
                      />
                    </Input.Root>
                    {errors.maxItems && (
                      <Input.Message>{errors.maxItems.message}</Input.Message>
                    )}
                  </Input.Wrapper>
                </div>
              </div>

              {/* Seção de Opções */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PlusCircle className="text-orange-600" size={20} />
                    <h3 className="text-lg font-bold text-slate-900">
                      Itens / Opções da Pergunta
                    </h3>
                    <Badge className="bg-slate-100 text-slate-600 border-slate-200 ml-2 font-black text-[10px]">
                      {fields.length} {fields.length === 1 ? 'ITEM' : 'ITENS'}
                    </Badge>
                  </div>

                  {/* Busca de Produtos para Adicionar */}
                  <div className="relative w-72">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Buscar produto para adicionar..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm"
                    />

                    {/* Dropdown de Resultados da Busca */}
                    {productSearch.length >= 2 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden max-h-60 overflow-y-auto">
                        {isLoadingData ? (
                          <div className="p-4 text-xs text-slate-400 animate-pulse font-bold">
                            Buscando no catálogo...
                          </div>
                        ) : availableProducts.length > 0 ? (
                          availableProducts.map((p) => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => handleAddProduct(p)}
                              className="w-full flex items-center justify-between p-3 hover:bg-orange-50 text-left border-b border-slate-50 last:border-0 transition-colors group"
                            >
                              <div className="flex items-center gap-3">
                                <Package
                                  size={14}
                                  className="text-slate-400 group-hover:text-orange-500"
                                />
                                <span className="text-xs font-bold text-slate-700 truncate max-w-[180px]">
                                  {p.name}
                                </span>
                              </div>
                              <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                R$ {Number(p.price).toFixed(2)}
                              </span>
                            </button>
                          ))
                        ) : (
                          <div className="p-4 text-xs text-slate-400 font-bold">
                            Nenhum produto disponível.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Listagem de Opções Adicionadas */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        <th className="px-6 py-3">Produto</th>
                        <th className="px-6 py-3 w-40">Preço Promo (R$)</th>
                        <th className="px-6 py-3 w-40">Qtd Máx p/ Pedido</th>
                        <th className="px-6 py-3 w-20 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {fields.map((field, index) => (
                        <tr
                          key={field.id}
                          className="hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                                <Package size={14} />
                              </div>
                              <span className="text-sm font-bold text-slate-800">
                                {field.productName}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Input.Root className="h-9">
                              <Input.Control
                                type="number"
                                step="0.01"
                                placeholder="Padrão"
                                className="text-xs font-bold"
                                {...register(`options.${index}.promoPrice`, {
                                  valueAsNumber: true
                                })}
                              />
                            </Input.Root>
                          </td>
                          <td className="px-6 py-4">
                            <Input.Root className="h-9">
                              <Input.Control
                                type="number"
                                placeholder="Ilimitado"
                                className="text-xs font-bold"
                                {...register(`options.${index}.maxQuantity`, {
                                  valueAsNumber: true
                                })}
                              />
                            </Input.Root>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center">
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {fields.length === 0 && (
                    <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
                      <Search size={32} strokeWidth={1.5} />
                      <p className="text-xs font-bold uppercase tracking-widest">
                        Nenhuma opção adicionada
                      </p>
                      <p className="text-[10px] font-medium max-w-[200px] text-center">
                        Use a busca acima para adicionar itens do catálogo a
                        esta pergunta.
                      </p>
                    </div>
                  )}
                </div>
                {errors.options && (
                  <p className="text-xs font-bold text-red-500 ml-1">
                    {errors.options.message}
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Footer fixo Estático */}
          <div className="bg-white border-t border-slate-200 px-8 py-4 flex items-center justify-between shrink-0">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              className="font-bold text-slate-600 border-slate-200 hover:bg-slate-50"
            >
              Descartar Alterações
            </Button>
            <Button
              type="submit"
              form="wizard-question-form"
              disabled={isPending}
              className="px-8 shadow-xl shadow-orange-500/20 active:scale-95 transition-all font-black text-sm"
            >
              {isPending
                ? 'Sincronizando...'
                : isEditMode
                  ? 'Salvar Mudanças'
                  : 'Criar Pergunta Global'}
            </Button>
          </div>

          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
