import type { Meta, StoryObj } from '@storybook/react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './accordion'

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  title: 'Components/Accordion',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['single', 'multiple'],
      control: { type: 'select' }
    }
  }
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  render: (args) => (
    <div className="w-[400px]">
      <Accordion {...args} type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Como funciona o Delivery?</AccordionTrigger>
          <AccordionContent>
            Nosso delivery funciona das 11h às 23h, cobrindo um raio de 10km da nossa sede.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Quais as formas de pagamento?</AccordionTrigger>
          <AccordionContent>
            Aceitamos todos os cartões de crédito, débito, PIX e vales-refeição principais.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Posso cancelar um pedido?</AccordionTrigger>
          <AccordionContent>
            Sim, desde que o pedido ainda não tenha entrado em produção na nossa cozinha.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export const Multiple: Story = {
  render: (args) => (
    <div className="w-[400px]">
      <Accordion {...args} type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Configurações de Impressão</AccordionTrigger>
          <AccordionContent>
            Configure aqui os setores de impressão para cozinha e bar.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Ajustes de Estoque</AccordionTrigger>
          <AccordionContent>
            Defina alertas de estoque baixo e controle de entradas automáticas.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
