import { Badge, Button, Dialog, Input } from '@aoponto/ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import { Layout, Ruler } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FetchProductTypesResponseDtoProductTypesItem as ProductType } from '../../api/generated/model/fetchProductTypesResponseDtoProductTypesItem'
import {
  useProductTypesControllerEdit,
  useProductTypesControllerRegister
} from '../../api/generated/product-types/product-types'

const productTypeSchema = z.object({
  description: z.string().min(1, { error: 'Descrição é obrigatória' })
})

type ProductTypeFormData = z.infer<typeof productTypeSchema>

interface ProductTypeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productType?: ProductType | null
  onSuccess?: () => void
}

export const ProductTypeModal: React.FC<ProductTypeModalProps> = ({
  open,
  onOpenChange,
  productType,
  onSuccess
}) => {
  const isEditMode = !!productType

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProductTypeFormData>({
    resolver: zodResolver(productTypeSchema),
    defaultValues: {
      description: ''
    }
  })

  React.useEffect(() => {
    if (open) {
      if (productType) {
        reset({
          description: productType.description
        })
      } else {
        reset({
          description: ''
        })
      }
    }
  }, [open, productType, reset])

  const { mutate: registerProductType, isPending: isRegistering } =
    useProductTypesControllerRegister({
      mutation: {
        onSuccess: () => {
          onOpenChange(false)
          reset()
          onSuccess?.()
        },
        onError: (err: unknown) => {
          console.error(`Erro ao cadastrar tipo: ${err}`)
          alert('Erro ao cadastrar tipo de produto.')
        }
      }
    })

  const { mutate: editProductType, isPending: isEditing } =
    useProductTypesControllerEdit({
      mutation: {
        onSuccess: () => {
          onOpenChange(false)
          reset()
          onSuccess?.()
        },
        onError: (err: unknown) => {
          console.error(`Erro ao editar tipo: ${err}`)
          alert('Erro ao editar tipo de produto.')
        }
      }
    })

  const isPending = isRegistering || isEditing

  const onFormSubmit = (data: ProductTypeFormData) => {
    if (isEditMode && productType) {
      editProductType({
        id: productType.id,
        data: {
          description: data.description
        }
      })
    } else {
      registerProductType({
        data
      })
    }
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
      onPointerDownOutside={(e) => e.preventDefault()}
    >
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="max-w-xl">
          <Dialog.Header className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl ring-4 ring-orange-500/5">
                <Ruler size={24} />
              </div>
              <Badge
                variant="outline"
                className="text-[10px] uppercase font-black tracking-widest border-slate-200 text-slate-500 px-3 py-1"
              >
                {isEditMode ? 'Edição' : 'Novo registro'}
              </Badge>
            </div>

            <div className="space-y-1">
              <Dialog.Title className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {isEditMode
                  ? 'Alterar Tipo de Produto'
                  : 'Cadastrar Tipo de Produto'}
              </Dialog.Title>
              <Dialog.Description className="text-slate-500 font-medium">
                Classifique seus produtos por categorias técnicas para melhor
                organização do catálogo.
              </Dialog.Description>
            </div>
          </Dialog.Header>

          <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="space-y-6 py-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input.Wrapper className="col-span-3 space-y-2">
                <Input.Label htmlFor="description">
                  <Layout size={12} /> Descrição
                </Input.Label>
                <Input.Root error={!!errors.description}>
                  <Input.Control
                    id="description"
                    placeholder="Ex: Pizza Grande"
                    {...register('description')}
                  />
                </Input.Root>
                {errors.description && (
                  <Input.Message>{errors.description.message}</Input.Message>
                )}
              </Input.Wrapper>
            </div>

            <Dialog.Footer className="pt-4 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending
                  ? 'Processando...'
                  : isEditMode
                    ? 'Salvar'
                    : 'Cadastrar'}
              </Button>
            </Dialog.Footer>
          </form>
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
