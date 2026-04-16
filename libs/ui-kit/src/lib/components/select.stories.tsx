import type { Meta, StoryObj } from '@storybook/react'
import { Select, SelectItem, SelectSimple } from './select'

const meta: Meta<typeof SelectSimple> = {
  component: SelectSimple,
  title: 'Components/Select',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text'
    },
    label: {
      control: 'text'
    },
    error: {
      control: 'text'
    },
    disabled: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof SelectSimple>

export const Simple: Story = {
  args: {
    label: 'Categoria do Produto',
    placeholder: 'Selecione uma categoria...',
    children: [
      <SelectItem key="1" value="bebidas">
        Bebidas
      </SelectItem>,
      <SelectItem key="2" value="lanches">
        Lanches
      </SelectItem>,
      <SelectItem key="3" value="sobremesas">
        Sobremesas
      </SelectItem>
    ]
  }
}

export const WithError: Story = {
  args: {
    label: 'Entregador',
    placeholder: 'Escolha um...',
    error: 'Selecione um entregador válido',
    children: [
      <SelectItem key="1" value="joao">
        João da Silva
      </SelectItem>,
      <SelectItem key="2" value="maria">
        Maria Oliveira
      </SelectItem>
    ]
  }
}

export const CompoundPattern: StoryObj<typeof Select> = {
  render: () => (
    <div className="w-[300px]">
      <Select defaultValue="blue">
        <Select.Trigger className="w-full">
          <Select.Value placeholder="Escolha uma cor..." />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Cores Primárias</Select.Label>
            <SelectItem value="red">Vermelho</SelectItem>
            <SelectItem value="blue">Azul</SelectItem>
            <SelectItem value="green">Verde</SelectItem>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Cores Secundárias</Select.Label>
            <SelectItem value="yellow">Amarelo</SelectItem>
            <SelectItem value="purple">Roxo</SelectItem>
          </Select.Group>
        </Select.Content>
      </Select>
    </div>
  )
}

export const Disabled: Story = {
  args: {
    label: 'Configuração Travada',
    disabled: true,
    placeholder: 'Não editável...',
    children: [
      <SelectItem key="1" value="opt1">
        Opção 1
      </SelectItem>
    ]
  }
}
