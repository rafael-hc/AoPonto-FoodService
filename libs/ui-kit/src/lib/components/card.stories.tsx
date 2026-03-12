import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './card'
import { Button } from './button'

const meta: Meta<typeof Card.Root> = {
  component: Card.Root,
  title: 'Components/Card',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Card.Root>

export const Default: Story = {
  render: () => (
    <Card.Root className="w-[350px]">
      <Card.Header>
        <Card.Title>Visão Geral</Card.Title>
        <Card.Description>Métricas de vendas de hoje</Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Pedidos Totais</span>
            <span className="font-medium">124</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Faturamento</span>
            <span className="font-medium">R$ 4.230,00</span>
          </div>
        </div>
      </Card.Content>
      <Card.Footer className="flex justify-end gap-2">
        <Button variant="outline" size="sm">
          Exportar
        </Button>
        <Button size="sm">Atualizar</Button>
      </Card.Footer>
    </Card.Root>
  )
}

export const ImageCard: Story = {
  render: () => (
    <Card.Root className="w-[300px] overflow-hidden">
      <div className="aspect-video w-full bg-gray-100 relative">
        <img
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
          alt="Salada Saudável"
          className="object-cover w-full h-full"
        />
      </div>
      <Card.Header>
        <Card.Title>Salada Fit</Card.Title>
        <Card.Description>
          Mix de folhas verdes com tomate cereja
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-2xl font-bold">R$ 24,90</p>
      </Card.Content>
      <Card.Footer>
        <Button className="w-full">Adicionar ao Carrinho</Button>
      </Card.Footer>
    </Card.Root>
  )
}
