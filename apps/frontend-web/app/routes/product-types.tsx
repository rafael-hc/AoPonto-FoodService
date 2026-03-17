import { Button, Card } from '@aoponto/ui-kit'
import { Pencil, Plus, Ruler, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  useProductTypesControllerDeleteOne,
  useProductTypesControllerFetch
} from '../api/generated/product-types/product-types'
import { ProductTypeModal } from '../components/products/ProductTypeModal'

interface ProductType {
  id: string
  description: string
}

interface ProductTypeRowProps {
  type: ProductType
  onEdit: (type: ProductType) => void
  onDelete: (id: string) => void
}

function ProductTypeRow({ type, onEdit, onDelete }: ProductTypeRowProps) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 text-slate-600 rounded-lg group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">
            <Ruler size={16} />
          </div>
          <span className="font-semibold text-slate-700">
            {type.description}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 text-slate-400 hover:text-orange-600 hover:bg-orange-50 border-none shadow-none transition-all"
            onClick={() => onEdit(type)}
          >
            <Pencil size={16} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50 border-none shadow-none transition-all"
            onClick={() => onDelete(type.id)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </td>
    </tr>
  )
}

const SKELETONS = [
  'skeleton-1',
  'skeleton-2',
  'skeleton-3',
  'skeleton-4',
  'skeleton-5'
]

export default function ProductTypesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data, isLoading, refetch } = useProductTypesControllerFetch()
  const deleteMutation = useProductTypesControllerDeleteOne({
    mutation: {
      onSuccess: () => {
        refetch()
      }
    }
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<ProductType | null>(null)

  const handleCreate = () => {
    setSelectedType(null)
    setIsModalOpen(true)
  }

  const handleEdit = (productType: ProductType) => {
    setSelectedType(productType)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente excluir este tipo de produto?')) {
      deleteMutation.mutate({ id })
    }
  }

  const productTypes = (data as any)?.productTypes ?? []
  const filteredTypes = productTypes.filter((t: ProductType) =>
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full bg-slate-50/30 p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Tipos de Produto
          </h1>
          <p className="text-slate-500 font-medium">
            Gerencie as categorias técnicas dos seus produtos no catálogo
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar por descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all w-full md:w-80 shadow-sm"
            />
          </div>

          <Button
            onClick={handleCreate}
            className="h-[46px] px-6 gap-2 shadow-xl shadow-orange-500/20 active:scale-95 transition-all"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Novo Tipo</span>
          </Button>
        </div>
      </div>

      {/* Main Content Card */}
      <Card.Root className="overflow-hidden border-none shadow-xl shadow-slate-200/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Descrição do Tipo
                </th>
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">
                  Ações de Gestão
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading
                ? SKELETONS.map((key) => (
                    <tr key={key} className="animate-pulse">
                      <td className="px-6 py-6">
                        <div className="flex gap-3">
                          <div className="h-10 w-10 bg-slate-100 rounded-lg" />
                          <div className="h-6 w-48 bg-slate-100 rounded mt-2" />
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex justify-end gap-2">
                          <div className="h-8 w-8 bg-slate-100 rounded" />
                          <div className="h-8 w-8 bg-slate-100 rounded" />
                        </div>
                      </td>
                    </tr>
                  ))
                : filteredTypes.length > 0
                  ? filteredTypes.map((type: ProductType) => (
                      <ProductTypeRow
                        key={type.id}
                        type={type}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))
                  : null}
            </tbody>
          </table>
        </div>

        {!isLoading && filteredTypes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
            <div className="w-20 h-20 bg-orange-50 text-orange-200 rounded-3xl flex items-center justify-center mb-6 transform rotate-12">
              <Ruler size={40} />
            </div>
            <h3 className="text-slate-900 font-extrabold text-xl tracking-tight">
              Nenhum tipo encontrado
            </h3>
            <p className="text-slate-500 text-base mt-2 max-w-xs mx-auto">
              Defina os tipos técnicos para organizar melhor o catálogo de
              produtos.
            </p>
            <Button
              variant="outline"
              onClick={handleCreate}
              className="mt-8 border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Criar primeiro tipo
            </Button>
          </div>
        )}
      </Card.Root>

      <ProductTypeModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        productType={selectedType ?? undefined}
        onSuccess={() => {
          refetch()
        }}
      />
    </div>
  )
}
