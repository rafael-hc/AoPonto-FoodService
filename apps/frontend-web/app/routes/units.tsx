import { Button } from '@aoponto/ui-kit'
import { Pencil, Plus, Scale, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  useUnitsControllerDeleteOne,
  useUnitsControllerFetch
} from '../api/generated/units/units'
import { UnitModal } from '../components/products/UnitModal'

interface Unit {
  id: string
  initials: string
  description?: string | null
}

export default function UnitsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data, isLoading, refetch } = useUnitsControllerFetch()
  const deleteMutation = useUnitsControllerDeleteOne({
    mutation: {
      onSuccess: () => {
        refetch()
      }
    }
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null)

  const handleCreate = () => {
    setSelectedUnit(null)
    setIsModalOpen(true)
  }

  const handleEdit = (unit: Unit) => {
    setSelectedUnit(unit)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente excluir esta unidade?')) {
      deleteMutation.mutate({ id })
    }
  }

  const units = (data as any)?.units ?? []
  const filteredUnits = units.filter(
    (u: { initials: string; description: string }) =>
      u.initials.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center justify-between px-6 pt-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Unidades de Medida
          </h1>
          <p className="text-sm text-slate-500">
            Gerencie as unidades de venda e estoque
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
              placeholder="Buscar unidade..."
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
                  Sigla
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Descrição
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
                    Carregando unidades...
                  </td>
                </tr>
              ) : (
                filteredUnits.map((unit: any) => (
                  <tr
                    key={unit.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 text-slate-600 rounded-lg group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">
                          <Scale size={16} />
                        </div>
                        <span className="font-semibold text-slate-700 uppercase">
                          {unit.initials}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">
                        {unit.description || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-slate-400 hover:text-orange-600 hover:bg-orange-50 border-none shadow-none"
                          onClick={() => handleEdit(unit)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50 border-none shadow-none"
                          onClick={() => handleDelete(unit.id)}
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

        {!isLoading && filteredUnits.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
              <Scale size={32} />
            </div>
            <h3 className="text-slate-600 font-semibold uppercase tracking-widest text-xs">
              Nenhuma unidade encontrada
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Cadastre unidades como UN, KG, LT, etc.
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
          Nova Unidade
        </Button>
      </div>

      <UnitModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        unit={selectedUnit ?? undefined}
        onSuccess={() => {
          refetch()
        }}
      />
    </div>
  )
}
