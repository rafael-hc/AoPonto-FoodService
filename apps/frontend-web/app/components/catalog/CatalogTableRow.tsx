import { Badge, Button } from '@aoponto/ui-kit'
import { Pencil, Trash2 } from 'lucide-react'
import React from 'react'

interface CatalogItem {
  id: string
  name: string
  active: boolean
  price: number | string
  costPrice?: number | string | null
  barcode?: string | null
  code: number | string
  labelId?: string | null
  unitId?: string | null
}

interface CatalogTableRowProps {
  item: CatalogItem
  variant: 'product' | 'complement'
  categoryName?: string
  unitInitials?: string
  icon: React.ElementType
  onEdit: (item: any) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string, active: boolean) => void
}

export const CatalogTableRow: React.FC<CatalogTableRowProps> = ({
  item,
  variant,
  categoryName = 'S/ Categoria',
  unitInitials,
  icon: Icon,
  onEdit,
  onDelete,
  onToggleStatus
}) => {
  const formatPrice = (value: number | string | undefined | null) => {
    if (value === undefined || value === null) return '0,00'
    return Number(value).toFixed(2).replace('.', ',')
  }

  return (
    <tr className="hover:bg-slate-50/50 transition-colors group border-b border-slate-50 last:border-0 text-sm">
      {/* Nome do Item */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-50 text-orange-600 rounded-lg group-hover:bg-orange-100 transition-colors">
            <Icon size={16} />
          </div>
          <span className="font-bold text-slate-900 truncate max-w-[200px]">
            {item.name}
          </span>
        </div>
      </td>

      {/* Categoria (Opcional para complementos conforme pedido do usuário, mas mantido se fornecido) */}
      {variant === 'product' && (
        <td className="px-6 py-4">
          <Badge
            variant="outline"
            className="font-bold text-[10px] uppercase border-slate-100 bg-slate-50 text-slate-500 py-0.5 px-2"
          >
            {categoryName}
          </Badge>
        </td>
      )}

      {/* Unidade (Específico para complementos conforme pedido) */}
      {variant === 'complement' && (
        <td className="px-6 py-4">
          <Badge
            variant="outline"
            className="font-bold text-[10px] uppercase border-blue-100 bg-blue-50 text-blue-600 py-0.5 px-2"
          >
            {unitInitials || 'UN'}
          </Badge>
        </td>
      )}

      {/* Preço Venda */}
      <td className="px-6 py-4 font-mono font-bold text-slate-700">
        R$ {formatPrice(item.price)}
      </td>

      {/* Preço Custo */}
      <td className="px-6 py-4 font-mono text-slate-400">
        R$ {formatPrice(item.costPrice)}
      </td>

      {/* Código de Busca (Barcode) */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 w-fit">
            {item.barcode || '0'}
          </span>
        </div>
      </td>

      {/* Código PDV (Opcional/Menor destaque em complementos?) */}
      <td className="px-6 py-4">
        <span className="font-mono text-[11px] font-black text-slate-500 bg-slate-100 px-1.5 py-1 rounded w-fit">
          #{String(item.code).padStart(4, '0')}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <label className="flex items-center gap-2 cursor-pointer group/toggle">
          <input
            type="checkbox"
            checked={item.active}
            onChange={(e) => onToggleStatus(item.id, e.target.checked)}
            className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500 border-slate-300"
          />
          <span
            className={`text-[10px] font-black uppercase tracking-wider ${item.active ? 'text-emerald-500' : 'text-slate-400'}`}
          >
            {item.active ? 'Ativo' : 'Inativo'}
          </span>
        </label>
      </td>

      {/* Ações */}
      <td className="px-6 py-4">
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 text-slate-400 hover:text-orange-600 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 transition-all shadow-sm"
            title={`Editar ${variant === 'product' ? 'Produto' : 'Complemento'}`}
            onClick={() => onEdit(item)}
          >
            <Pencil size={15} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition-all shadow-sm"
            title={`Arquivar ${variant === 'product' ? 'Produto' : 'Complemento'}`}
            onClick={() => onDelete(item.id)}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      </td>
    </tr>
  )
}
