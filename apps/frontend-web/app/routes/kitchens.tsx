import { Button } from '@aoponto/ui-kit'
import { Pencil, Plus, Printer, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  useKitchensControllerDeleteOne,
  useKitchensControllerFetch
} from '../api/generated/kitchens/kitchens'
import { FetchKitchensResponseDtoKitchensItem as Kitchen } from '../api/generated/model/fetchKitchensResponseDtoKitchensItem'
import { KitchenModal } from '../components/products/KitchenModal'

export default function KitchensPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data, isLoading, refetch } = useKitchensControllerFetch()
  const deleteMutation = useKitchensControllerDeleteOne({
    mutation: {
      onSuccess: () => {
        refetch()
      }
    }
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedKitchen, setSelectedKitchen] = useState<Kitchen | null>(null)

  const handleCreate = () => {
    setSelectedKitchen(null)
    setIsModalOpen(true)
  }

  const handleEdit = (kitchen: Kitchen) => {
    setSelectedKitchen(kitchen)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente excluir esta cozinha?')) {
      deleteMutation.mutate({ id })
    }
  }

  const kitchens = data?.kitchens ?? []
  const filteredKitchens = kitchens.filter(
    (k) =>
      k.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.ip.includes(searchTerm)
  )

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center justify-between px-6 pt-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Cozinhas</h1>
          <p className="text-sm text-slate-500">
            Gerencie os locais de produção e impressoras
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
              placeholder="Buscar cozinha..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all w-64 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col mx-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Cozinha
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  IP / Endereço
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
                    colSpan={3}
                    className="px-6 py-12 text-center text-slate-400"
                  >
                    Carregando cozinhas...
                  </td>
                </tr>
              ) : (
                filteredKitchens.map((kitchen) => (
                  <tr
                    key={kitchen.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 text-slate-600 rounded-lg group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">
                          <Printer size={16} />
                        </div>
                        <span className="font-semibold text-slate-700">
                          {kitchen.description}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-slate-600">
                          {kitchen.ip}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Porta: {kitchen.port}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-slate-400 hover:text-orange-600 hover:bg-orange-50 border-none shadow-none"
                          onClick={() => handleEdit(kitchen)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50 border-none shadow-none"
                          onClick={() => handleDelete(kitchen.id)}
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

        {!isLoading && filteredKitchens.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
              <Printer size={32} />
            </div>
            <h3 className="text-slate-600 font-semibold uppercase tracking-widest text-xs">
              Nenhuma cozinha encontrada
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Adicione sua primeira cozinha para começar.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end px-6 pb-6">
        <Button
          onClick={handleCreate}
          className="gap-2 shadow-lg shadow-orange-500/20"
        >
          <Plus size={18} />
          Nova Cozinha
        </Button>
      </div>

      <KitchenModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        kitchen={selectedKitchen as any}
        onSuccess={() => {
          refetch()
        }}
      />
    </div>
  )
}
