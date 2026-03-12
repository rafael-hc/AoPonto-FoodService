import { Badge, Button, Dialog, Input } from '@aoponto/ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ClipboardList,
  Lock,
  Mail,
  Shield,
  User as UserIcon,
  UserPlus
} from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { RegisterUserDtoRole } from '../../api/generated/model/registerUserDtoRole'
import {
  useRegisterUserControllerHandle,
  useUpdateUserControllerHandle
} from '../../api/generated/users/users'

const userRegistrationSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(1, { error: 'Nome é obrigatório' }),
    email: z.email({ error: 'E-mail inválido' }),
    document: z.string().min(14, { error: 'CPF deve ter 11 dígitos' }),
    login: z
      .string()
      .min(3, { error: 'Login deve ter no mínimo 3 caracteres' }),
    password: z.string().optional(),
    role: z.enum(RegisterUserDtoRole)
  })
  .superRefine((data, ctx) => {
    const isEdit = !!data.id

    if (!isEdit && (!data.password || data.password.length < 6)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Senha deve ter no mínimo 6 caracteres para novos usuários',
        path: ['password']
      })
    }

    if (
      isEdit &&
      data.password &&
      data.password.length > 0 &&
      data.password.length < 6
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'A nova senha deve ter no mínimo 6 caracteres',
        path: ['password']
      })
    }
  })

type UserRegistrationData = z.infer<typeof userRegistrationSchema>

interface UserRegistrationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user?: any // Opcional: Usuário para edição
  onSuccess?: () => undefined | Promise<any>
}

export const UserRegistrationModal: React.FC<UserRegistrationModalProps> = ({
  open,
  onOpenChange,
  user,
  onSuccess
}) => {
  const isEditMode = !!user

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
      role: RegisterUserDtoRole.ADMIN,
      id: undefined
    }
  })

  // Sincronizar formulário com o usuário selecionado
  React.useEffect(() => {
    if (open) {
      if (user) {
        // Função simples para formatar CPF (000.000.000-00)
        const formatCPF = (val: string) => {
          const digits = val.replace(/\D/g, '')
          return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
        }

        reset({
          id: user.id,
          name: user.name,
          email: user.email,
          document: user.document ? formatCPF(user.document) : '',
          login: user.login,
          password: '',
          role: user.role as RegisterUserDtoRole
        })
      } else {
        reset({
          id: undefined,
          name: '',
          email: '',
          document: '',
          login: '',
          password: '',
          role: RegisterUserDtoRole.ADMIN
        })
      }
    }
  }, [open, user, reset])

  const { mutate: registerUser, isPending: isRegistering } =
    useRegisterUserControllerHandle({
      mutation: {
        onSuccess: () => {
          onOpenChange(false)
          reset()
          onSuccess?.()
        },
        onError: (err) => {
          console.error('Erro ao cadastrar usuário:', err)
          alert(
            'Erro ao cadastrar usuário. Verifique os dados e tente novamente.'
          )
        }
      }
    })

  const { mutate: updateUser, isPending: isUpdating } =
    useUpdateUserControllerHandle({
      mutation: {
        onSuccess: () => {
          onOpenChange(false)
          reset()
          onSuccess?.()
        },
        onError: (err) => {
          console.error('Erro ao atualizar usuário:', err)
          alert(
            'Erro ao atualizar usuário. Verifique os dados e tente novamente.'
          )
        }
      }
    })

  const isPending = isRegistering || isUpdating

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
    const cleanDocument = data.document.replace(/\D/g, '')

    if (isEditMode) {
      updateUser({
        id: user.id,
        data: {
          ...data,
          document: cleanDocument,
          password: data.password || undefined // Só envia se preenchido
        }
      })
    } else {
      registerUser({
        data: {
          name: data.name,
          email: data.email,
          document: cleanDocument,
          login: data.login,
          password: data.password!, // Garantido pelo Zod para novos usuários
          role: data.role
        }
      })
    }
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
                {isEditMode ? 'Editar Colaborador' : 'Novo Colaborador'}
              </Badge>
            </div>
            <Dialog.Title className="text-2xl">
              {isEditMode ? 'Alterar Dados' : 'Cadastrar Colaborador'}
            </Dialog.Title>
            <Dialog.Description>
              {isEditMode
                ? `Editando as informações de ${user?.name}.`
                : 'Crie um novo acesso para a sua equipe. Defina o nível de permissão e dados básicos.'}
            </Dialog.Description>
          </Dialog.Header>

          <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="space-y-6 py-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input.Wrapper className="space-y-2">
                <Input.Label htmlFor="full-name">
                  <UserIcon size={12} /> Nome Completo
                </Input.Label>
                <Input.Root error={!!errors.name}>
                  <Input.Control
                    id="full-name"
                    placeholder="Ex: João Silva"
                    {...register('name')}
                  />
                </Input.Root>
                {errors.name && (
                  <Input.Message>{errors.name.message}</Input.Message>
                )}
              </Input.Wrapper>
              <Input.Wrapper className="space-y-2">
                <Input.Label htmlFor="email">
                  <Mail size={12} /> E-mail Profissional
                </Input.Label>
                <Input.Root error={!!errors.email}>
                  <Input.Control
                    id="email"
                    type="email"
                    placeholder="joao@aoponto.com"
                    {...register('email')}
                  />
                </Input.Root>
                {errors.email && (
                  <Input.Message>{errors.email.message}</Input.Message>
                )}
              </Input.Wrapper>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input.Wrapper className="space-y-2">
                <Input.Label htmlFor="document">
                  <ClipboardList size={12} /> CPF
                </Input.Label>
                <Input.Root error={!!errors.document}>
                  <Input.Control
                    id="document"
                    placeholder="000.000.000-00"
                    value={documentValue}
                    onChange={handleDocumentChange}
                  />
                </Input.Root>
                {errors.document && (
                  <Input.Message>{errors.document.message}</Input.Message>
                )}
              </Input.Wrapper>
              <Input.Wrapper className="space-y-2">
                <Input.Label htmlFor="login">
                  <UserIcon size={12} /> Usuário (Login)
                </Input.Label>
                <Input.Root error={!!errors.login}>
                  <Input.Control
                    id="login"
                    placeholder="Ex: joao.silva"
                    {...register('login')}
                  />
                </Input.Root>
                {errors.login && (
                  <Input.Message>{errors.login.message}</Input.Message>
                )}
              </Input.Wrapper>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input.Wrapper className="space-y-2">
                <Input.Label htmlFor="password">
                  <Lock size={12} />{' '}
                  {isEditMode ? 'Nova Senha (Opcional)' : 'Senha Temporária'}
                </Input.Label>
                <Input.Root error={!!errors.password}>
                  <Input.Control
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register('password')}
                  />
                </Input.Root>
                {errors.password && (
                  <Input.Message>{errors.password.message}</Input.Message>
                )}
              </Input.Wrapper>
              <Input.Wrapper className="space-y-2">
                <Input.Label htmlFor="role">
                  <Shield size={12} /> Cargo / Função
                </Input.Label>
                <select
                  id="role"
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
                  <Input.Message>{errors.role.message}</Input.Message>
                )}
              </Input.Wrapper>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[11px] text-slate-500 leading-relaxed italic">
                {isEditMode
                  ? '* Ao alterar a senha, o colaborador será deslogado de todas as sessões.'
                  : '* O colaborador receberá um e-mail com as instruções de primeiro acesso e definição de senha temporária.'}
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
                {isPending
                  ? isEditMode
                    ? 'Salvando...'
                    : 'Cadastrando...'
                  : isEditMode
                    ? 'Salvar Alterações'
                    : 'Finalizar Cadastro'}
              </Button>
            </Dialog.Footer>
          </form>

          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
