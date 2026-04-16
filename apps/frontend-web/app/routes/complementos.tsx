import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import {
  useComplementsControllerCreate,
  useComplementsControllerEdit,
  useComplementsControllerList
} from '../api/generated/complements/complements'
import type { SingleProductResponseDto } from '../api/generated/model/singleProductResponseDto'
import { useUnitsControllerFetch } from '../api/generated/units/units'
import { CatalogTableLayout } from '../components/catalog/CatalogTableLayout'
import { CatalogTableRow } from '../components/catalog/CatalogTableRow'
import {
  ComplementFormData,
  ComplementModal
} from '../components/products/ComplementModal'

export default function ComplementosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const { data, isLoading, refetch } = useComplementsControllerList()
  const { data: unitsData } = useUnitsControllerFetch()

  const { mutate: createComplement, isPending: isRegistering } =
    useComplementsControllerCreate()

  const { mutate: editComplement, isPending: isEditing } =
    useComplementsControllerEdit()

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente arquivar este complemento?')) {
      alert('Endpoint de deleção em desenvolvimento.')
    }
  }

  const handleEdit = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedProduct(null)
    setIsModalOpen(true)
  }

  const handleSave = (formData: ComplementFormData, shouldClose = true) => {
    const options = {
      onSuccess: (response: SingleProductResponseDto) => {
        if (shouldClose) {
          setIsModalOpen(false)
          setSelectedProduct(null)
        } else {
          // Mantém o modal aberto e sincroniza o item para habilitar as abas extras
          setSelectedProduct(response.product)
        }
        refetch()
      }
    }

    if (selectedProduct) {
      editComplement(
        {
          id: selectedProduct.id,
          data: formData
        },
        options
      )
    } else {
      createComplement(
        {
          data: formData
        },
        options
      )
    }
  }

  const handleToggleStatus = (id: string, active: boolean) => {
    editComplement({
      id,
      data: { active }
    })
  }

  const units = unitsData?.units ?? []
  const complementos = data?.products ?? []

  const filteredComplementos = complementos.filter((product) => {
    const searchTermLowercase = searchTerm.toLowerCase()
    return (
      product.name.toLowerCase().includes(searchTermLowercase) ||
      String(product.code).includes(searchTermLowercase) ||
      product.barcode?.toLowerCase().includes(searchTermLowercase)
    )
  })

  const tableHeaders = [
    'Nome do Item',
    'Unidade',
    'Preço Venda',
    'Preço Custo',
    'Cód. Busca',
    'Cód. PDV',
    'Status',
    'Ações'
  ]

  return (
    <CatalogTableLayout.Root
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      isLoading={isLoading}
    >
      <CatalogTableLayout.Header
        title="Complementos"
        description="Gerencie acompanhamentos e adicionais para seus produtos"
        totalCount={complementos.length}
        newButtonLabel="Novo Complemento"
        onNewClick={handleCreate}
      />

      <CatalogTableLayout.Table
        headers={tableHeaders}
        isEmpty={filteredComplementos.length === 0}
        emptyState={
          <CatalogTableLayout.EmptyState
            icon={PlusCircle}
            title="Nenhum complemento encontrado"
            description="Você ainda não cadastrou nenhum complemento para seus produtos."
            buttonLabel="Criar meu primeiro complemento"
            onButtonClick={handleCreate}
          />
        }
      >
        {filteredComplementos.map((complement) => (
          <CatalogTableRow
            key={complement.id}
            item={{ ...complement, active: complement.active ?? true }}
            variant="complement"
            icon={PlusCircle}
            unitInitials={
              units.find((u) => u.id === complement.unitId)?.initials
            }
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </CatalogTableLayout.Table>

      <ComplementModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        product={selectedProduct}
        onSave={handleSave}
        isPending={isRegistering || isEditing}
      />
    </CatalogTableLayout.Root>
  )
}
