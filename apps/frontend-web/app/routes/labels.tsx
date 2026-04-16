import { Badge, Button } from '@aoponto/ui-kit'
import { Layers, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  useLabelsControllerDeleteOne,
  useLabelsControllerFetch
} from '../api/generated/labels/labels'
import { FetchLabelsResponseDtoLabelsItem as Category } from '../api/generated/model/fetchLabelsResponseDtoLabelsItem'
import { CatalogTableLayout } from '../components/catalog/CatalogTableLayout'
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

  const tableHeaders = ['Descrição', 'Tipo', 'Ordem', 'Ações']

  return (
    <CatalogTableLayout.Root
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      isLoading={isLoading}
    >
      <CatalogTableLayout.Header
        title="Categorias"
        description="Gerencie as categorias para organizar seu catálogo de produtos."
        totalCount={categories.length}
        newButtonLabel="Nova Categoria"
        onNewClick={handleCreate}
      />

      <CatalogTableLayout.Table
        headers={tableHeaders}
        isEmpty={filteredCategories.length === 0}
        emptyState={
          <CatalogTableLayout.EmptyState
            icon={Layers}
            title="Nenhuma categoria encontrada"
            description="Organize seus produtos criando categorias claras e objetivas."
            buttonLabel="Adicionar primeira categoria"
            onButtonClick={handleCreate}
          />
        }
      >
        {filteredCategories.map((category: Category) => (
          <CategoryRow
            key={category.id}
            category={category}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </CatalogTableLayout.Table>

      <LabelModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        label={selectedCategory ?? undefined}
        onSuccess={() => refetch()}
      />
    </CatalogTableLayout.Root>
  )
}
