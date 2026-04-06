import { Badge, Button } from '@aoponto/ui-kit'
import { Pencil, Plus, Search, Shield, Trash2, UsersRound } from 'lucide-react'
import { useState } from 'react'
import { FetchUsersResponseDtoUsersItem as User } from '../api/generated/model/fetchUsersResponseDtoUsersItem'
import { FetchUsersResponseDtoUsersItemRole } from '../api/generated/model/fetchUsersResponseDtoUsersItemRole'
import {
  useDeleteUserControllerHandle,
  useFetchUsersControllerHandle
} from '../api/generated/users/users'
import { UserRegistrationModal } from '../components/users/UserRegistrationModal'

export default function ColaboradoresPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data, isLoading, refetch } = useFetchUsersControllerHandle()
  const deleteMutation = useDeleteUserControllerHandle({
    mutation: {
      onSuccess: () => {
        refetch()
      }
    }
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleCreate = () => {
    setSelectedUser(null)
    setIsModalOpen(true)
  }

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleDelete = (userId: string) => {
    if (confirm('Deseja realmente excluir este colaborador?')) {
      deleteMutation.mutate({ id: userId })
    }
  }

  const users = data?.users ?? []
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.login.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleLabel = (role: FetchUsersResponseDtoUsersItemRole) => {
    switch (role) {
      case FetchUsersResponseDtoUsersItemRole.ADMIN:
        return 'Administrador'
      case FetchUsersResponseDtoUsersItemRole.CASHIER:
        return 'Caixa / Atendente'
      case FetchUsersResponseDtoUsersItemRole.KITCHEN:
        return 'Cozinha / Produção'
      default:
        return role as string
    }
  }

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header com busca e título */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Colaboradores</h1>
          <p className="text-sm text-slate-500">
            Gerencie os acessos e permissões da sua equipe
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Buscar colaborador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all w-64 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Listagem / Tabela */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Colaborador
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Cargo / Função
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-slate-400"
                  >
                    Carregando colaboradores...
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200 uppercase">
                          {user.name?.charAt(0) ?? '?'}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-700">
                            {user.name || 'Sem nome'}
                          </span>
                          <span className="text-xs text-slate-400">
                            {user.email || 'Sem e-mail'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Shield size={14} className="text-slate-400" />
                        <span className="text-sm">
                          {getRoleLabel(user.role)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <Badge
                          variant={user.active ? 'success' : 'destructive'}
                          className="min-w-[80px] justify-center"
                        >
                          {user.active ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-slate-400 hover:text-orange-600 hover:bg-orange-50 border-none shadow-none"
                          onClick={() => handleEdit(user)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50 border-none shadow-none"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Empty state fallback (se não houver resultados) */}
        {!isLoading && filteredUsers.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
              <UsersRound size={32} />
            </div>
            <h3 className="text-slate-600 font-semibold uppercase tracking-widest text-xs">
              Nenhum colaborador encontrado
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Tente ajustar sua busca ou adicione um novo colaborador.
            </p>
          </div>
        )}
      </div>

      {/* Rodapé com botão de criar */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleCreate}
          className="gap-2 shadow-lg shadow-orange-500/20"
        >
          <Plus size={18} />
          Novo Colaborador
        </Button>
      </div>

      <UserRegistrationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        user={selectedUser ?? undefined}
        onSuccess={() => {
          refetch()
        }}
      />
    </div>
  )
}
