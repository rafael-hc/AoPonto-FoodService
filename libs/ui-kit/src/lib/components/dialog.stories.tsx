import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from './button'
import { Dialog } from './dialog'

const meta: Meta<typeof Dialog.Root> = {
  component: Dialog.Root,
  title: 'Components/Dialog',
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Estado de abertura do modal'
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Função chamada ao alterar o estado de abertura'
    }
  }
}

export default meta
type Story = StoryObj<typeof Dialog.Root>

const DialogDemo = ({
  staticBackdrop = false
}: {
  staticBackdrop?: boolean
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-10 flex justify-center">
      <Button onClick={() => setOpen(true)}>
        {staticBackdrop ? 'Abrir Modal (Static Backdrop)' : 'Abrir Modal'}
      </Button>
      <Dialog.Root
        open={open}
        onOpenChange={setOpen}
        onPointerDownOutside={
          staticBackdrop ? (e) => e.preventDefault() : undefined
        }
      >
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {staticBackdrop ? 'Modal Obrigatório' : 'Cadastro de Usuário'}
              </Dialog.Title>
              <Dialog.Description>
                {staticBackdrop
                  ? 'Este modal não fecha se você clicar no fundo escuro. Você precisa usar os botões internos.'
                  : 'Preencha os dados abaixo para criar um novo usuário no sistema.'}
              </Dialog.Description>
            </Dialog.Header>

            <div className="py-6">
              {staticBackdrop ? (
                <div className="py-8 bg-slate-50 rounded-lg border border-dashed border-slate-200 flex items-center justify-center">
                  <p className="text-slate-400 text-xs italic">
                    Tente clicar fora...
                  </p>
                </div>
              ) : (
                <p className="text-sm text-slate-600">
                  Corpo do formulário aqui...
                </p>
              )}
            </div>

            <Dialog.Footer>
              <Button variant="outline" onClick={() => setOpen(false)}>
                {staticBackdrop ? 'Entendi, Fechar agora' : 'Cancelar'}
              </Button>
              {!staticBackdrop && (
                <Button onClick={() => setOpen(false)}>Salvar Usuário</Button>
              )}
            </Dialog.Footer>
            <Dialog.Close />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export const Default: Story = {
  render: () => <DialogDemo />
}

export const StaticBackdrop: Story = {
  args: {
    open: false
  },

  render: () => <DialogDemo staticBackdrop />
}
