import { Badge, Button, Dialog, Input } from '@aoponto/ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import { Monitor, Network, Printer } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  useKitchensControllerEdit,
  useKitchensControllerRegister
} from '../../api/generated/kitchens/kitchens'
import { FetchKitchensResponseDtoKitchensItem as Kitchen } from '../../api/generated/model/fetchKitchensResponseDtoKitchensItem'

const kitchenSchema = z.object({
  description: z.string().min(1, { error: 'Descrição é obrigatória' }),
  ip: z.ipv4({ error: 'IP inválido' }),
  port: z.string().min(1, { error: 'Porta obrigatória' }),
  printer: z.string().optional()
})

type KitchenFormData = z.infer<typeof kitchenSchema>

interface KitchenModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  kitchen?: Kitchen | null
  onSuccess?: () => void
}

export const KitchenModal: React.FC<KitchenModalProps> = ({
  open,
  onOpenChange,
  kitchen,
  onSuccess
}) => {
  const isEditMode = !!kitchen

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<KitchenFormData>({
    resolver: zodResolver(kitchenSchema),
    defaultValues: {
      description: '',
      ip: '',
      port: '9100',
      printer: ''
    }
  })

  React.useEffect(() => {
    if (open) {
      if (kitchen) {
        reset({
          description: kitchen.description,
          ip: kitchen.ip,
          port: kitchen.port,
          printer: kitchen.printer || ''
        })
      } else {
        reset({
          description: '',
          ip: '',
          port: '9100',
          printer: ''
        })
      }
    }
  }, [open, kitchen, reset])

  const { mutate: registerKitchen, isPending: isRegistering } =
    useKitchensControllerRegister({
      mutation: {
        onSuccess: () => {
          onOpenChange(false)
          reset()
          onSuccess?.()
        },
        onError: (err: unknown) => {
          console.error(`Erro ao cadastrar cozinha: ${err}`)
          alert('Erro ao cadastrar cozinha. Verifique os dados.')
        }
      }
    })

  const { mutate: editKitchen, isPending: isEditing } =
    useKitchensControllerEdit({
      mutation: {
        onSuccess: () => {
          onOpenChange(false)
          reset()
          onSuccess?.()
        },
        onError: (err: unknown) => {
          console.error(`Erro ao editar cozinha: ${err}`)
          alert('Erro ao editar cozinha. Verifique os dados.')
        }
      }
    })

  const isPending = isRegistering || isEditing

  const onFormSubmit = (data: KitchenFormData) => {
    if (isEditMode && kitchen) {
      editKitchen({
        id: kitchen.id,
        data: {
          description: data.description,
          ip: data.ip,
          port: data.port,
          printer: data.printer
        }
      })
    } else {
      registerKitchen({
        data: {
          description: data.description,
          ip: data.ip,
          port: data.port,
          printer: data.printer || ''
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
                <Printer size={24} />
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
                {isEditMode ? 'Alterar Cozinha' : 'Cadastrar Cozinha'}
              </Dialog.Title>
              <Dialog.Description className="text-slate-500 font-medium">
                {isEditMode
                  ? `Atualize as configurações técnicas da ${kitchen?.description}.`
                  : 'Configure uma nova estação de produção ou expedição.'}
              </Dialog.Description>
            </div>
          </Dialog.Header>

          <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="space-y-6 py-4"
          >
            <div className="grid grid-cols-1 gap-4">
              <Input.Wrapper className="space-y-2">
                <Input.Label htmlFor="description">
                  <Monitor size={12} /> Descrição / Nome
                </Input.Label>
                <Input.Root error={!!errors.description}>
                  <Input.Control
                    id="description"
                    placeholder="Ex: Cozinha Principal"
                    {...register('description')}
                  />
                </Input.Root>
                {errors.description && (
                  <Input.Message>{errors.description.message}</Input.Message>
                )}
              </Input.Wrapper>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input.Wrapper className="space-y-2">
                <Input.Label htmlFor="ip">
                  <Network size={12} /> Endereço IP
                </Input.Label>
                <Input.Root error={!!errors.ip}>
                  <Input.Control
                    id="ip"
                    placeholder="Ex: 192.168.1.100"
                    {...register('ip')}
                  />
                </Input.Root>
                {errors.ip && (
                  <Input.Message>{errors.ip.message}</Input.Message>
                )}
              </Input.Wrapper>

              <Input.Wrapper className="space-y-2">
                <Input.Label htmlFor="port">Porta</Input.Label>
                <Input.Root error={!!errors.port}>
                  <Input.Control
                    id="port"
                    placeholder="Ex: 9100"
                    {...register('port')}
                  />
                </Input.Root>
                {errors.port && (
                  <Input.Message>{errors.port.message}</Input.Message>
                )}
              </Input.Wrapper>
            </div>

            <Input.Wrapper className="space-y-2">
              <Input.Label htmlFor="printer">
                <Printer size={12} /> Modelo / Nome da Impressora (Opcional)
              </Input.Label>
              <Input.Root error={!!errors.printer}>
                <Input.Control
                  id="printer"
                  placeholder="Ex: Bematech MP-4200"
                  {...register('printer')}
                />
              </Input.Root>
              {errors.printer && (
                <Input.Message>{errors.printer.message}</Input.Message>
              )}
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
