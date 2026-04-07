import { Badge, Button, Card } from '@aoponto/ui-kit'
import {
  LayoutGrid,
  List,
  Pencil,
  Plus,
  PlusCircle,
  Search,
  Trash2
} from 'lucide-react'
import { useState } from 'react'
import {
  useComplementsControllerCreate,
  useComplementsControllerEdit,
  useComplementsControllerList
} from '../api/generated/complements/complements'
import { useLabelsControllerFetch } from '../api/generated/labels/labels'
import { FetchLabelsResponseDtoLabelsItem as Label } from '../api/generated/model/fetchLabelsResponseDtoLabelsItem'
import { FetchProductsResponseDtoProductsItem as Product } from '../api/generated/model/fetchProductsResponseDtoProductsItem'
import {
  ProductFormData,
  ProductModal
} from '../components/products/ProductModal'

interface ProductRowProps {
  product: Product
  labels: Label[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string, active: boolean) => void
}

function ProductRow({
  product,
  labels,
  onEdit,
  onDelete,
  onToggleStatus
}: ProductRowProps) {
  const categoryDescription =
    labels.find((label) => label.id === product.labelId)?.description ||
    'S/ Categoria'

  return (
    <tr className="hover:bg-slate-50/50 transition-colors group border-b border-slate-50 last:border-0 text-sm">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-50 text-orange-600 rounded-lg group-hover:bg-orange-100 transition-colors">
            <PlusCircle size={16} />
          </div>
          <span className="font-bold text-slate-900 truncate max-w-[200px]">
            {product.name}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <Badge
          variant="outline"
          className="font-bold text-[10px] uppercase border-slate-100 bg-slate-50 text-slate-500 py-0.5 px-2"
        >
          {categoryDescription}
        </Badge>
      </td>
      <td className="px-6 py-4 font-mono font-bold text-slate-700">
        R$ {Number(product.price).toFixed(2).replace('.', ',')}
      </td>
      <td className="px-6 py-4 font-mono text-slate-400">
        R${' '}
        {product.costPrice
          ? Number(product.costPrice).toFixed(2).replace('.', ',')
          : '0,00'}
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 w-fit">
            {product.barcode || '0'}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="font-mono text-[11px] font-black text-slate-500 bg-slate-100 px-1.5 py-1 rounded w-fit">
          #{String(product.code).padStart(4, '0')}
        </span>
      </td>
      <td className="px-6 py-4">
        <label className="flex items-center gap-2 cursor-pointer group/toggle">
          <input
            type="checkbox"
            checked={product.active}
            onChange={(e) => onToggleStatus(product.id, e.target.checked)}
            className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500 border-slate-300"
          />
          <span
            className={`text-[10px] font-black uppercase tracking-wider ${product.active ? 'text-emerald-500' : 'text-slate-400'}`}
          >
            {product.active ? 'Ativo' : 'Inativo'}
          </span>
        </label>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 text-slate-400 hover:text-orange-600 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 transition-all shadow-sm"
            title="Editar Complemento"
            onClick={() => onEdit(product)}
          >
            <Pencil size={15} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition-all shadow-sm"
            title="Arquivar Complemento"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      </td>
    </tr>
  )
}

const LOADING_SKELETON_COUNT = [1, 2, 3, 4, 5, 6]

export default function ComplementosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const { data, isLoading, refetch } = useComplementsControllerList()
  const { data: labelsData } = useLabelsControllerFetch()

  const { mutate: createComplement, isPending: isRegistering } =
    useComplementsControllerCreate({
      mutation: {
        onSuccess: () => {
          setIsModalOpen(false)
          refetch()
        }
      }
    })

  const { mutate: editComplement, isPending: isEditing } =
    useComplementsControllerEdit({
      mutation: {
        onSuccess: () => {
          setIsModalOpen(false)
          refetch()
        }
      }
    })

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente arquivar este complemento?')) {
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

  const handleSave = (formData: ProductFormData) => {
    if (selectedProduct) {
      editComplement({
        id: selectedProduct.id,
        data: formData
      })
    } else {
      createComplement({
        data: formData
      })
    }
  }

  const handleToggleStatus = (id: string, active: boolean) => {
    editComplement({
      id,
      data: { active }
    })
  }

  const labels = labelsData?.labels ?? []
  const complementos = data?.products ?? []

  const filteredComplementos = complementos.filter((product) => {
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

  return (
    <div className="flex flex-col h-full bg-slate-50/50 p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Complementos
            </h1>
            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
              {isLoading ? '...' : `${complementos.length} itens`}
            </Badge>
          </div>
          <p className="text-slate-500 font-medium">
            Gerencie acompanhamentos e adicionais para seus produtos
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
              placeholder="Buscar por nome, código ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all w-full md:w-80 shadow-sm"
            />
          </div>

          <Button
            onClick={handleCreate}
            className="h-[46px] px-6 gap-2 shadow-xl shadow-orange-500/20 active:scale-95 transition-all text-sm font-bold"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Novo Complemento</span>
          </Button>
        </div>
      </div>

      {/* Main Content Card */}
      <Card.Root className="overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/40 rounded-2xl bg-white">
        <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-3 flex items-center justify-between">
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-slate-600 bg-slate-200/50 hover:bg-slate-200 gap-2 border-transparent shadow-none"
            >
              <List size={14} /> Tabela
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-slate-400 hover:text-slate-600 gap-2 border-transparent shadow-none hover:bg-slate-100/50"
            >
              <LayoutGrid size={14} /> Cards
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap min-w-[200px]">
                  Nome do Item
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                  Categoria
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                  Preço Venda
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                  Preço Custo
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                  Cód. Busca
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                  Cód. PDV
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-32">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-32">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading
                ? LOADING_SKELETON_COUNT.map((skeletonKey) => (
                    <tr
                      key={skeletonKey}
                      className="animate-pulse bg-white border-b border-slate-50"
                    >
                      <td className="px-6 py-5">
                        <div className="flex gap-3 items-center">
                          <div className="h-8 w-8 bg-slate-100 rounded-lg" />
                          <div className="h-4 w-40 bg-slate-100 rounded" />
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="h-4 w-24 bg-slate-50 rounded" />
                      </td>
                      <td className="px-6 py-5">
                        <div className="h-4 w-16 bg-slate-50 rounded" />
                      </td>
                      <td className="px-6 py-5">
                        <div className="h-4 w-16 bg-slate-50 rounded" />
                      </td>
                      <td className="px-6 py-5">
                        <div className="h-6 w-12 bg-slate-50 rounded" />
                      </td>
                      <td className="px-6 py-5">
                        <div className="h-6 w-10 bg-slate-50 rounded font-mono" />
                      </td>
                      <td className="px-6 py-5">
                        <div className="h-4 w-12 bg-slate-100 rounded" />
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <div className="h-8 w-8 bg-slate-100 rounded-lg" />
                          <div className="h-8 w-8 bg-slate-100 rounded-lg" />
                        </div>
                      </td>
                    </tr>
                  ))
                : filteredComplementos.length > 0
                  ? filteredComplementos.map((product: Product) => (
                      <ProductRow
                        key={product.id}
                        product={product}
                        labels={labels}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggleStatus={handleToggleStatus}
                      />
                    ))
                  : null}
            </tbody>
          </table>
        </div>

        {!isLoading && filteredComplementos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
            <div className="w-20 h-20 bg-orange-50 text-orange-200 rounded-4xl flex items-center justify-center mb-6 transform rotate-6 scale-110 shadow-inner">
              <PlusCircle size={40} className="transform -rotate-6" />
            </div>
            <h3 className="text-slate-900 font-extrabold text-xl tracking-tight">
              Nenhum complemento encontrado
            </h3>
            <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto leading-relaxed">
              Você ainda não cadastrou nenhum complemento para seus produtos.
            </p>
            <Button
              variant="outline"
              onClick={handleCreate}
              className="mt-8 border-slate-200 text-slate-700 hover:bg-slate-50 font-bold"
            >
              Criar meu primeiro complemento
            </Button>
          </div>
        )}
      </Card.Root>

      <ProductModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        product={selectedProduct}
        onSave={handleSave}
        isPending={isRegistering || isEditing}
      />
    </div>
  )
}
