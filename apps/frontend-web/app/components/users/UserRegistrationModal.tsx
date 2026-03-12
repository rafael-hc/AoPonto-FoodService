import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, Button, Input, Badge } from '@aoponto/ui-kit'
import {
  UserPlus,
  Shield,
  Mail,
  User as UserIcon,
  Lock,
  ClipboardList
} from 'lucide-react'
import { useRegisterUserControllerHandle } from '../../api/generated/users/users'
import { RegisterUserDtoRole } from '../../api/generated/model/registerUserDtoRole'

const userRegistrationSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  document: z.string().min(14, 'CPF deve ter 11 dígitos'),
  login: z.string().min(3, 'Login deve ter no mínimo 3 caracteres'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  role: z.nativeEnum(RegisterUserDtoRole)
})

type UserRegistrationData = z.infer<typeof userRegistrationSchema>

interface UserRegistrationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const UserRegistrationModal: React.FC<UserRegistrationModalProps> = ({
  open,
  onOpenChange
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<UserRegistrationData>({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: {
      name: '',
      email: '',
      document: '',
      login: '',
      password: '',
      role: RegisterUserDtoRole.CASHIER
    }
  })

  const { mutate: registerUser, isPending } = useRegisterUserControllerHandle({
    mutation: {
      onSuccess: () => {
        onOpenChange(false)
        reset()
      },
      onError: (err) => {
        console.error('Erro ao cadastrar usuário:', err)
        alert(
          'Erro ao cadastrar usuário. Verifique os dados e tente novamente.'
        )
      }
    }
  })

  const maskCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  const documentValue = watch('document')

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskCPF(e.target.value)
    setValue('document', masked, { shouldValidate: true })
  }

  const onFormSubmit = (data: UserRegistrationData) => {
    // Limpar máscara do CPF antes de enviar
    const cleanDocument = data.document.replace(/\D/g, '')

    registerUser({
      data: {
        ...data,
        document: cleanDocument
      }
    })
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
      // REGRA: Static Backdrop - Não fechar ao clicar fora
      onPointerDownOutside={(e: PointerEvent) => e.preventDefault()}
    >
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="max-w-2xl">
          <Dialog.Header>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                <UserPlus size={20} />
              </div>
              <Badge
                variant="outline"
                className="text-[10px] uppercase tracking-wider"
              >
                Novo Colaborador
              </Badge>
            </div>
            <Dialog.Title className="text-2xl">
              Cadastrar Colaborador
            </Dialog.Title>
            <Dialog.Description>
              Crie um novo acesso para a sua equipe. Defina o nível de permissão
              e dados básicos.
            </Dialog.Description>
          </Dialog.Header>

          <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="space-y-6 py-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2">
                  <UserIcon size={12} /> Nome Completo
                </label>
                <Input
                  placeholder="Ex: João Silva"
                  {...register('name')}
                  error={errors.name?.message}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2">
                  <Mail size={12} /> E-mail Profissional
                </label>
                <Input
                  type="email"
                  placeholder="joao@aoponto.com"
                  {...register('email')}
                  error={errors.email?.message}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2">
                  <ClipboardList size={12} /> CPF
                </label>
                <Input
                  placeholder="000.000.000-00"
                  value={documentValue}
                  onChange={handleDocumentChange}
                  error={errors.document?.message}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2">
                  <UserIcon size={12} /> Usuário (Login)
                </label>
                <Input
                  placeholder="Ex: joao.silva"
                  {...register('login')}
                  error={errors.login?.message}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2">
                  <Lock size={12} /> Senha Temporária
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...register('password')}
                  error={errors.password?.message}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2">
                  <Shield size={12} /> Cargo / Função
                </label>
                <select
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer shadow-sm"
                  {...register('role')}
                >
                  <option value={RegisterUserDtoRole.CASHIER}>
                    Caixa / Atendente
                  </option>
                  <option value={RegisterUserDtoRole.KITCHEN}>
                    Cozinha / Produção
                  </option>
                  <option value={RegisterUserDtoRole.ADMIN}>
                    Administrador / Gerente
                  </option>
                </select>
                {errors.role?.message && (
                  <p className="text-[10px] font-medium text-red-500 mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[11px] text-slate-500 leading-relaxed italic">
                * O colaborador receberá um e-mail com as instruções de primeiro
                acesso e definição de senha temporária.
              </p>
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
                {isPending ? 'Cadastrando...' : 'Finalizar Cadastro'}
              </Button>
            </Dialog.Footer>
          </form>

          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
