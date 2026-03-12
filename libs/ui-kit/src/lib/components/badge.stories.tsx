import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Components/Badge',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'default',
        'info',
        'warning',
        'success',
        'destructive',
        'outline'
      ],
      control: { type: 'select' }
    }
  }
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: 'Status Normal',
    variant: 'default'
  }
}

export const Info: Story = {
  args: {
    children: 'Novo Pedido',
    variant: 'info'
  }
}

export const Warning: Story = {
  args: {
    children: 'Preparando',
    variant: 'warning'
  }
}

export const Success: Story = {
  args: {
    children: 'Pronto',
    variant: 'success'
  }
}

export const Destructive: Story = {
  args: {
    children: 'Cancelado',
    variant: 'destructive'
  }
}

export const Outline: Story = {
  args: {
    children: 'Etiqueta',
    variant: 'outline'
  }
}
