import { Button } from '@aoponto/ui-kit'
import { Pencil, Printer, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  useKitchensControllerDeleteOne,
  useKitchensControllerFetch
} from '../api/generated/kitchens/kitchens'
import { FetchKitchensResponseDtoKitchensItem as Kitchen } from '../api/generated/model/fetchKitchensResponseDtoKitchensItem'
import { CatalogTableLayout } from '../components/catalog/CatalogTableLayout'
import { KitchenModal } from '../components/products/KitchenModal'

function KitchenRow({
  kitchen,
  onEdit,
  onDelete
}: {
  kitchen: Kitchen
  onEdit: (k: Kitchen) => void
  onDelete: (id: string) => void
}) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-50 text-orange-600 rounded-lg group-hover:bg-orange-100 transition-colors">
            <Printer size={16} />
          </div>
          <span className="font-bold text-slate-700">
            {kitchen.description}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-600">
            {kitchen.ip}
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
            Porta: {kitchen.port}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 text-slate-400 hover:text-orange-600 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 transition-all shadow-sm"
            onClick={() => onEdit(kitchen)}
          >
            <Pencil size={15} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition-all shadow-sm"
            onClick={() => onDelete(kitchen.id)}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      </td>
    </tr>
  )
}

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
    (kitchen) =>
      kitchen.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kitchen.ip.includes(searchTerm)
  )

  const tableHeaders = ['Cozinha', 'IP / Endereço', 'Ações']

  return (
    <CatalogTableLayout.Root
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      isLoading={isLoading}
    >
      <CatalogTableLayout.Header
        title="Cozinhas"
        description="Gerencie os locais de produção e impressoras do restaurante."
        totalCount={kitchens.length}
        newButtonLabel="Nova Cozinha"
        onNewClick={handleCreate}
      />

      <CatalogTableLayout.Table
        headers={tableHeaders}
        isEmpty={filteredKitchens.length === 0}
        emptyState={
          <CatalogTableLayout.EmptyState
            icon={Printer}
            title="Nenhuma cozinha encontrada"
            description="Adicione impressoras e locais de produção para direcionar os preparos."
            buttonLabel="Adicionar primeira cozinha"
            onButtonClick={handleCreate}
          />
        }
      >
        {filteredKitchens.map((kitchen) => (
          <KitchenRow
            key={kitchen.id}
            kitchen={kitchen}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </CatalogTableLayout.Table>

      <KitchenModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        kitchen={selectedKitchen}
        onSuccess={() => refetch()}
      />
    </CatalogTableLayout.Root>
  )
}
