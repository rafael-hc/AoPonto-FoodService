import { Badge, Button, Dialog, Input } from '@aoponto/ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import { ExternalLink, Layers, ListOrdered, Tag, Type } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  useLabelsControllerEdit,
  useLabelsControllerRegister
} from '../../api/generated/labels/labels'
import { FetchLabelsResponseDtoLabelsItem as Category } from '../../api/generated/model/fetchLabelsResponseDtoLabelsItem'

const categorySchema = z.object({
  description: z.string().min(1, { error: 'Descrição é obrigatória' }),
  order: z.number().min(0, { error: 'A ordem deve ser um número positivo' }),
  type: z.string().min(1, { error: 'Tipo é obrigatório' }),
  externalId: z.string().min(1, { error: 'ID Externo/GUID é obrigatório' })
})

type CategoryFormData = z.infer<typeof categorySchema>

interface LabelModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  label?: Category
  onSuccess?: () => void
}

export default function LabelModal({
  open,
  onOpenChange,
  label: category,
  onSuccess
}: LabelModalProps) {
  const isEditMode = !!category

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      description: '',
      order: 0,
      type: 'GERAL',
      externalId: ''
    }
  })

  React.useEffect(() => {
    if (open) {
      if (category) {
        reset({
          description: category.description,
          order: category.order as number,
          type: category.type,
          externalId: category.externalId
        })
      } else {
        reset({
          description: '',
          order: 0,
          type: 'GERAL',
          externalId: crypto.randomUUID()
        })
      }
    }
  }, [open, category, reset])

  const { mutate: registerCategory, isPending: isRegistering } =
    useLabelsControllerRegister({
      mutation: {
        onSuccess: () => {
          onOpenChange(false)
          reset()
          onSuccess?.()
        },
        onError: (err: unknown) => {
          console.error(`Erro ao cadastrar categoria: ${err}`)
        }
      }
    })

  const { mutate: editCategory, isPending: isEditing } =
    useLabelsControllerEdit({
      mutation: {
        onSuccess: () => {
          onOpenChange(false)
          reset()
          onSuccess?.()
        },
        onError: (err: unknown) => {
          console.error(`Erro ao editar categoria: ${err}`)
        }
      }
    })

  const isPending = isRegistering || isEditing

  const onFormSubmit = (data: CategoryFormData) => {
    if (isEditMode && category) {
      editCategory({
        id: category.id,
        data: {
          description: data.description,
          order: data.order,
          type: data.type
        }
      })
    } else {
      registerCategory({
        data: {
          description: data.description,
          order: data.order,
          type: data.type,
          externalId: data.externalId
        }
      })
    }
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-slate-900/40 backdrop-blur-sm" />
        <Dialog.Content 
          className="h-[80dvh] w-[70dvw] max-w-none border-none shadow-2xl p-0 overflow-hidden bg-slate-50 flex flex-col"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <div className="bg-white border-b border-slate-100 px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl ring-8 ring-orange-500/5">
                <Layers size={24} />
              </div>
              <Badge
                variant="outline"
                className="text-[10px] uppercase font-black tracking-[0.2em] border-slate-200 text-slate-400 px-3 py-1 bg-slate-50/50"
              >
                {isEditMode ? 'Edição' : 'Novo registro'}
              </Badge>
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {isEditMode ? 'Alterar Categoria' : 'Cadastrar Categoria'}
              </h2>
              <p className="text-slate-500 font-medium text-base">
                Organize seu catálogo dividindo os produtos em categorias
                específicas.
              </p>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 px-8 py-6">
            <form
              id="category-form"
              onSubmit={handleSubmit(onFormSubmit)}
              className="space-y-6"
            >
            <div className="space-y-6">
              <Input.Wrapper className="space-y-2">
                <Input.Label
                  htmlFor="description"
                  className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"
                >
                  <Tag size={14} className="text-orange-500" /> Descrição da
                  Categoria
                </Input.Label>
                <Input.Root
                  error={!!errors.description}
                  className="h-12 bg-slate-50/50 border-2"
                >
                  <Input.Control
                    id="description"
                    placeholder="Ex: Bebidas, Sobremesas, Pratos Principais..."
                    className="font-bold text-slate-900 placeholder:text-slate-300 placeholder:font-medium"
                    {...register('description')}
                  />
                </Input.Root>
                {errors.description && (
                  <Input.Message className="font-bold text-red-500">
                    {errors.description.message}
                  </Input.Message>
                )}
              </Input.Wrapper>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input.Wrapper className="space-y-2">
                  <Input.Label
                    htmlFor="type"
                    className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"
                  >
                    <Type size={14} className="text-orange-500" /> Tipo
                  </Input.Label>
                  <Input.Root
                    error={!!errors.type}
                    className="h-12 bg-slate-50/50 border-2"
                  >
                    <Input.Control
                      id="type"
                      placeholder="Ex: GERAL"
                      className="font-bold text-slate-900 placeholder:text-slate-300 placeholder:font-medium"
                      {...register('type')}
                    />
                  </Input.Root>
                </Input.Wrapper>

                <Input.Wrapper className="space-y-2">
                  <Input.Label
                    htmlFor="order"
                    className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"
                  >
                    <ListOrdered size={14} className="text-orange-500" /> Ordem
                    de Exibição
                  </Input.Label>
                  <Input.Root
                    error={!!errors.order}
                    className="h-12 bg-slate-50/50 border-2"
                  >
                    <Input.Control
                      id="order"
                      type="number"
                      className="font-bold text-slate-900"
                      {...register('order', { valueAsNumber: true })}
                    />
                  </Input.Root>
                </Input.Wrapper>
              </div>

              <Input.Wrapper className="space-y-2">
                <Input.Label
                  htmlFor="externalId"
                  className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"
                >
                  <ExternalLink size={14} className="text-orange-500" /> ID
                  Externo (GUID)
                </Input.Label>
                <Input.Root
                  error={!!errors.externalId}
                  className={`h-12 border-2 ${isEditMode ? 'bg-slate-100/50' : 'bg-slate-50/50'}`}
                >
                  <Input.Control
                    id="externalId"
                    readOnly={isEditMode}
                    className={`font-mono text-xs ${isEditMode ? 'cursor-not-allowed opacity-60' : 'font-bold'}`}
                    {...register('externalId')}
                  />
                </Input.Root>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                  Identificador único para integração com sistemas externos.
                </p>
              </Input.Wrapper>
            </div>

            </form>
          </div>

          <div className="bg-slate-100 border-t border-slate-100 px-8 py-4 flex items-center justify-end gap-3 shrink-0">
            <Button
              type="button"
              variant="outline"
              className="h-12 px-6 font-bold border-2 bg-white hover:bg-slate-50"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Voltar
            </Button>
            <Button
              type="submit"
              form="category-form"
              className="h-12 px-8 font-extrabold shadow-xl shadow-orange-500/20 active:scale-95 transition-transform"
              disabled={isPending}
            >
              {isPending
                ? 'Processando...'
                : isEditMode
                  ? 'Salvar Alterações'
                  : 'Finalizar Cadastro'}
            </Button>
          </div>
          <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 hover:bg-slate-100 transition-colors" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
