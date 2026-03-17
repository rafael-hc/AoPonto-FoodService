import { Badge, Button, Card } from '@aoponto/ui-kit'
import { Layers, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  useLabelsControllerDeleteOne,
  useLabelsControllerFetch
} from '../api/generated/labels/labels'
import { FetchLabelsResponseDtoLabelsItem as Category } from '../api/generated/model/fetchLabelsResponseDtoLabelsItem'
import LabelModal from '../components/products/LabelModal'

interface CategoryRowProps {
  category: Category
  onEdit: (category: Category) => void
  onDelete: (id: string) => void
}

function CategoryRow({ category, onEdit, onDelete }: CategoryRowProps) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl group-hover:scale-110 transition-transform duration-200">
            <Layers size={18} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 tracking-tight">
              {category.description}
            </span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              ID: {category.id.slice(0, 8)}...
            </span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className="bg-white border-slate-200 text-slate-600 font-bold px-3"
          >
            {category.type}
          </Badge>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-center">
          <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
            #{category.order}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
          <Button
            size="sm"
            variant="outline"
            className="h-9 w-9 p-0 text-slate-400 hover:text-orange-600 hover:bg-orange-50 border-none shadow-none"
            onClick={() => onEdit(category)}
          >
            <Pencil size={18} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-9 w-9 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50 border-none shadow-none"
            onClick={() => onDelete(category.id)}
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </td>
    </tr>
  )
}

const SKELETONS = [
  'category-skeleton-1',
  'category-skeleton-2',
  'category-skeleton-3',
  'category-skeleton-4',
  'category-skeleton-5'
]

export default function LabelsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data, isLoading, refetch } = useLabelsControllerFetch()
  const deleteMutation = useLabelsControllerDeleteOne({
    mutation: {
      onSuccess: () => {
        refetch()
      }
    }
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  )

  const handleCreate = () => {
    setSelectedCategory(null)
    setIsModalOpen(true)
  }

  const handleEdit = (category: Category) => {
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente excluir esta categoria?')) {
      deleteMutation.mutate({ id })
    }
  }

  const categories = data?.labels ?? []
  const filteredCategories = categories.filter((c: Category) =>
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full space-y-8 p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Categorias
          </h1>
          <p className="text-slate-500 font-medium">
            Gerencie as categorias para organizar seu catálogo de produtos.
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
              placeholder="Buscar categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all w-full md:w-80 shadow-sm shadow-slate-200/50"
            />
          </div>

          <Button
            onClick={handleCreate}
            className="gap-2 shadow-xl shadow-orange-500/25 h-11 px-6 font-bold"
          >
            <Plus size={20} />
            Nova Categoria
          </Button>
        </div>
      </div>

      <Card.Root className="flex-1 overflow-hidden flex flex-col border-2 border-slate-50 shadow-2xl shadow-slate-200/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100/50">
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Descrição
                </th>
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">
                  Tipo
                </th>
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">
                  Ordem
                </th>
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/50">
              {isLoading
                ? SKELETONS.map((key) => (
                    <tr key={key} className="animate-pulse">
                      <td colSpan={4} className="px-6 py-6">
                        <div className="h-10 bg-slate-50 rounded-lg w-full" />
                      </td>
                    </tr>
                  ))
                : filteredCategories.map((category: Category) => (
                    <CategoryRow
                      key={category.id}
                      category={category}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
            </tbody>
          </table>
        </div>

        {!isLoading && filteredCategories.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-24 px-8 text-center bg-slate-50/30">
            <div className="w-24 h-24 bg-white rounded-3xl shadow-xl shadow-slate-200/50 flex items-center justify-center text-slate-200 mb-6 border border-slate-50">
              <Layers size={48} />
            </div>
            <h3 className="text-slate-900 font-extrabold text-xl tracking-tight">
              Nenhuma categoria encontrada
            </h3>
            <p className="text-slate-500 font-medium mt-2 max-w-xs mx-auto">
              Organize seus produtos criando categorias claras e objetivas.
            </p>
            <Button
              variant="outline"
              onClick={handleCreate}
              className="mt-8 border-2"
            >
              Criar primeira categoria
            </Button>
          </div>
        )}
      </Card.Root>

      <LabelModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        label={selectedCategory ?? undefined}
        onSuccess={() => {
          refetch()
        }}
      />
    </div>
  )
}
