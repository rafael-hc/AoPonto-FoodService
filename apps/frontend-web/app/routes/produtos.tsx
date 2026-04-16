import { Package } from 'lucide-react'
import { useState } from 'react'
import { useLabelsControllerFetch } from '../api/generated/labels/labels'
import { FetchProductsResponseDtoProductsItem as Product } from '../api/generated/model/fetchProductsResponseDtoProductsItem'
import type { SingleProductResponseDto } from '../api/generated/model/singleProductResponseDto'
import {
  useProductsControllerCreate,
  useProductsControllerEdit,
  useProductsControllerList
} from '../api/generated/products/products'
import { CatalogTableLayout } from '../components/catalog/CatalogTableLayout'
import { CatalogTableRow } from '../components/catalog/CatalogTableRow'
import {
  ProductFormData,
  ProductModal
} from '../components/products/ProductModal'

export default function ProdutosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const { data, isLoading, refetch } = useProductsControllerList()
  const { data: labelsData } = useLabelsControllerFetch()

  const { mutate: createProduct, isPending: isRegistering } =
    useProductsControllerCreate()

  const { mutate: editProduct, isPending: isEditing } =
    useProductsControllerEdit()

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente arquivar este produto?')) {
      alert('Endpoint de deleção em desenvolvimento.')
    }
  }

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedProduct(null)
    setIsModalOpen(true)
  }

  const handleSave = (formData: ProductFormData, shouldClose = true) => {
    const options = {
      onSuccess: (response: SingleProductResponseDto) => {
        if (shouldClose) {
          setIsModalOpen(false)
          setSelectedProduct(null)
        } else {
          // Mantém o modal aberto e sincroniza o item para habilitar abas como o Wizard
          setSelectedProduct(response.product as Product)
        }
        refetch()
      }
    }

    if (selectedProduct) {
      editProduct(
        {
          id: selectedProduct.id,
          data: formData
        },
        options
      )
    } else {
      createProduct(
        {
          data: formData
        },
        options
      )
    }
  }

  const handleToggleStatus = (id: string, active: boolean) => {
    editProduct({
      id,
      data: { active }
    })
  }

  const labels = labelsData?.labels ?? []
  const products = data?.products ?? []

  const filteredProducts = products.filter((product) => {
    const categoryName =
      labels.find((label) => label.id === product.labelId)?.description || ''
    const searchTermLowercase = searchTerm.toLowerCase()

    return (
      product.name.toLowerCase().includes(searchTermLowercase) ||
      String(product.code).includes(searchTermLowercase) ||
      product.barcode?.toLowerCase().includes(searchTermLowercase) ||
      categoryName.toLowerCase().includes(searchTermLowercase)
    )
  })

  const tableHeaders = [
    'Nome do Item',
    'Categoria',
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
        title="Catálogo de Produtos"
        description="Gerencie itens, preços, estoque e configurações de PDV"
        totalCount={products.length}
        newButtonLabel="Novo Produto"
        onNewClick={handleCreate}
      />

      <CatalogTableLayout.Table
        headers={tableHeaders}
        isEmpty={filteredProducts.length === 0}
        emptyState={
          <CatalogTableLayout.EmptyState
            icon={Package}
            title="Nenhum produto encontrado"
            description="Você ainda não cadastrou nenhum produto ou nenhum item corresponde à sua busca atual."
            buttonLabel="Criar meu primeiro produto"
            onButtonClick={handleCreate}
          />
        }
      >
        {filteredProducts.map((product) => (
          <CatalogTableRow
            key={product.id}
            item={{ ...product, active: product.active ?? true }}
            variant="product"
            icon={Package}
            categoryName={
              labels.find((l) => l.id === product.labelId)?.description
            }
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </CatalogTableLayout.Table>

      <ProductModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        product={selectedProduct}
        onSave={handleSave}
        isPending={isRegistering || isEditing}
      />
    </CatalogTableLayout.Root>
  )
}
