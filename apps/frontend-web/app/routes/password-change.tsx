import { Badge, Button, Input } from '@aoponto/ui-kit'
import { AlertCircle, Lock, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useUpdateUserControllerHandle } from '../api/generated/users/users'
import { useAuthStore } from '../store/auth-store'

export default function PasswordChangePage() {
  const { user, signOut } = useAuthStore()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const updateMutation = useUpdateUserControllerHandle({
    mutation: {
      onSuccess: () => {
        // Após trocar a senha, o ideal é deslogar para forçar um novo login seguro
        // ou redirecionar para a home se a store já estiver atualizada.
        // No nosso caso, o backend já limpa a flag passwordChangeRequired.
        window.location.href = '/' // Refresh total para garantir estado limpo
      },
      onError: (err: any) => {
        setError(
          err.response?.data?.message ||
            'Erro ao atualizar senha. Tente novamente.'
        )
      }
    }
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.')
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas não conferem.')
      return
    }

    if (!user?.id) return

    updateMutation.mutate({
      id: user.id,
      data: { password }
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="bg-orange-600 p-8 text-white text-center relative overflow-hidden">
          {/* Decorativo */}
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -left-4 -bottom-4 w-32 h-32 bg-orange-400/20 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md border border-white/30">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-2xl font-bold">Segurança da Conta</h1>
            <p className="text-orange-100 text-sm mt-1 opacity-90">
              Troca de senha obrigatória no primeiro acesso
            </p>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl flex gap-3">
            <AlertCircle className="text-orange-600 shrink-0" size={20} />
            <p className="text-xs text-orange-800 leading-relaxed">
              Para sua segurança, pedimos que altere sua senha temporária. Sua
              nova senha deve conter{' '}
              <strong>
                letras (maius/minus), números e caracteres especiais
              </strong>
              .
            </p>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input.Wrapper className="space-y-1.5">
              <Input.Label htmlFor="password">Nova Senha</Input.Label>
              <Input.Root>
                <div className="pl-3 py-2 text-slate-400">
                  <Lock size={16} />
                </div>
                <Input.Control
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </Input.Root>
            </Input.Wrapper>

            <Input.Wrapper className="space-y-1.5">
              <Input.Label htmlFor="confirmPassword">
                Confirmar Nova Senha
              </Input.Label>
              <Input.Root>
                <div className="pl-3 py-2 text-slate-400">
                  <Lock size={16} />
                </div>
                <Input.Control
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </Input.Root>
            </Input.Wrapper>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-600/20 py-6"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending
                  ? 'Salvando...'
                  : 'Atualizar e Acessar'}
              </Button>

              <button
                type="button"
                onClick={() => signOut()}
                className="w-full mt-4 text-sm text-slate-400 hover:text-slate-600 transition-colors"
              >
                Sair do sistema
              </button>
            </div>
          </form>
        </div>

        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-center">
          <Badge
            variant="outline"
            className="text-[10px] text-slate-400 uppercase tracking-widest border-slate-200"
          >
            AoPonto FoodService v1.0
          </Badge>
        </div>
      </div>
    </div>
  )
}
