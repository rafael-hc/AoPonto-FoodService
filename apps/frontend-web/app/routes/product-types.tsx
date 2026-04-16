import { Button } from '@aoponto/ui-kit'
import { Pencil, Ruler, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { FetchProductTypesResponseDtoProductTypesItem as ProductType } from '../api/generated/model/fetchProductTypesResponseDtoProductTypesItem'
import {
  useProductTypesControllerDeleteOne,
  useProductTypesControllerFetch
} from '../api/generated/product-types/product-types'
import { CatalogTableLayout } from '../components/catalog/CatalogTableLayout'
import { ProductTypeModal } from '../components/products/ProductTypeModal'

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

  const productTypes = data?.productTypes ?? []
  const filteredTypes = productTypes.filter((productType: ProductType) =>
    productType.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const tableHeaders = ['Descrição do Tipo', 'Ações de Gestão']

  return (
    <CatalogTableLayout.Root
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      isLoading={isLoading}
    >
      <CatalogTableLayout.Header
        title="Tipos de Produto"
        description="Gerencie as categorias técnicas dos seus produtos no catálogo"
        totalCount={productTypes.length}
        newButtonLabel="Novo Tipo"
        onNewClick={handleCreate}
      />

      <CatalogTableLayout.Table
        headers={tableHeaders}
        isEmpty={filteredTypes.length === 0}
        emptyState={
          <CatalogTableLayout.EmptyState
            icon={Ruler}
            title="Nenhum tipo encontrado"
            description="Defina os tipos técnicos para organizar melhor o catálogo de produtos."
            buttonLabel="Criar primeiro tipo"
            onButtonClick={handleCreate}
          />
        }
      >
        {filteredTypes.map((type: ProductType) => (
          <ProductTypeRow
            key={type.id}
            type={type}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </CatalogTableLayout.Table>

      <ProductTypeModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        productType={selectedType}
        onSuccess={() => refetch()}
      />
    </CatalogTableLayout.Root>
  )
}
