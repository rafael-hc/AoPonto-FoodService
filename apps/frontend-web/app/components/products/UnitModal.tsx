import { Badge, Button, Dialog, Input } from '@aoponto/ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileText, Scale, Type } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  useUnitsControllerEdit,
  useUnitsControllerRegister
} from '../../api/generated/units/units'

interface Unit {
  id: string
  initials: string
  description?: string | null
}

const unitSchema = z.object({
  initials: z
    .string()
    .min(1, { error: 'Sigla é obrigatória' })
    .max(10, { error: 'Sigla muito longa' }),
  description: z.string().optional()
})

type UnitFormData = z.infer<typeof unitSchema>

interface UnitModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  unit?: Unit
  onSuccess?: () => void
}

export const UnitModal: React.FC<UnitModalProps> = ({
  open,
  onOpenChange,
  unit,
  onSuccess
}) => {
  const isEditMode = !!unit

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UnitFormData>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      initials: '',
      description: ''
    }
  })

  React.useEffect(() => {
    if (open) {
      if (unit) {
        reset({
          initials: unit.initials,
          description: unit.description || ''
        })
      } else {
        reset({
          initials: '',
          description: ''
        })
      }
    }
  }, [open, unit, reset])

  const { mutate: registerUnit, isPending: isRegistering } =
    useUnitsControllerRegister({
      mutation: {
        onSuccess: () => {
          onOpenChange(false)
          reset()
          onSuccess?.()
        },
        onError: (err: unknown) => {
          console.error(`Erro ao cadastrar unidade: ${err}`)
          alert('Erro ao cadastrar unidade.')
        }
      }
    })

  const { mutate: editUnit, isPending: isEditing } = useUnitsControllerEdit({
    mutation: {
      onSuccess: () => {
        onOpenChange(false)
        reset()
        onSuccess?.()
      },
      onError: (err: unknown) => {
        console.error(`Erro ao editar unidade: ${err}`)
        alert('Erro ao editar unidade.')
      }
    }
  })

  const isPending = isRegistering || isEditing

  const onFormSubmit = (data: UnitFormData) => {
    if (isEditMode && unit) {
      editUnit({
        id: unit.id,
        data: {
          initials: data.initials,
          description: data.description
        }
      })
    } else {
      registerUnit({
        data: {
          initials: data.initials,
          description: data.description
        }
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
                <Scale size={24} />
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
                {isEditMode ? 'Alterar Unidade' : 'Cadastrar Unidade'}
              </Dialog.Title>
              <Dialog.Description className="text-slate-500 font-medium">
                Defina as unidades de medida para venda e estoque (Ex: UN, KG,
                LT).
              </Dialog.Description>
            </div>
          </Dialog.Header>

          <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="space-y-6 py-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input.Wrapper className="col-span-3 space-y-2">
                <Input.Label htmlFor="initials">
                  <Type size={12} /> Sigla
                </Input.Label>
                <Input.Root error={!!errors.initials}>
                  <Input.Control
                    id="initials"
                    placeholder="Ex: UN"
                    {...register('initials')}
                  />
                </Input.Root>
                {errors.initials && (
                  <Input.Message>{errors.initials.message}</Input.Message>
                )}
              </Input.Wrapper>
            </div>

            <Input.Wrapper className="space-y-2">
              <Input.Label htmlFor="description">
                <FileText size={12} /> Descrição (Opcional)
              </Input.Label>
              <Input.Root error={!!errors.description}>
                <Input.Control
                  id="description"
                  placeholder="Ex: Unidade"
                  {...register('description')}
                />
              </Input.Root>
            </Input.Wrapper>

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
