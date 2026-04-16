import React from 'react'
import { Button } from './button'
import { Dialog } from './dialog'
import { cn } from '../utils/cn'

interface ModalActionFooterProps {
  onCancel: () => void
  onSaveAndClose?: () => void
  onSaveOnly?: () => void // Quando fornecido, habilita o duplo salvamento
  isPending?: boolean
  saveLabel?: string
  saveAndCloseLabel?: string
  cancelLabel?: string
  className?: string
}

export const ModalActionFooter: React.FC<ModalActionFooterProps> = ({
  onCancel,
  onSaveAndClose,
  onSaveOnly,
  isPending = false,
  saveLabel = 'Salvar',
  saveAndCloseLabel = 'Salvar Alterações',
  cancelLabel = 'Cancelar',
  className
}) => {
  return (
    <Dialog.Footer className={cn('bg-slate-100 border-t border-slate-200 px-8 py-4 flex flex-row items-center justify-between shrink-0', className)}>
      <Button
        type="button"
        variant="outline"
        className="bg-white border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 font-bold"
        onClick={onCancel}
        disabled={isPending}
      >
        {cancelLabel}
      </Button>

      <div className="flex items-center gap-3">
        {onSaveOnly && (
          <Button
            type="button"
            variant="outline"
            className="bg-white border-slate-300 text-slate-700 hover:border-orange-500 hover:text-orange-600 font-bold shadow-sm"
            onClick={onSaveOnly}
            disabled={isPending}
          >
            {isPending ? '...' : saveLabel}
          </Button>
        )}
        
        {onSaveAndClose && (
          <Button
            type="submit" // Geralmente o "Salvar e Sair" é o trigger padrão do formulário
            onClick={onSaveAndClose}
            disabled={isPending}
            className="px-8 shadow-lg shadow-orange-500/20 text-md font-bold bg-orange-500 hover:bg-orange-600"
          >
            {isPending ? 'Processando...' : saveAndCloseLabel}
          </Button>
        )}
      </div>
    </Dialog.Footer>
  )
}
