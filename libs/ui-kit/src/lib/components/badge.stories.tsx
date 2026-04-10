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
        'primary',
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

export const Primary: Story = {
  args: {
    children: 'Destaque',
    variant: 'primary'
  }
}

export const Info: Story = {
  args: {
    children: 'Informação',
    variant: 'info'
  }
}

export const Warning: Story = {
  args: {
    children: 'Atenção',
    variant: 'warning'
  }
}

export const Success: Story = {
  args: {
    children: 'Sucesso',
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
    children: 'Outline',
    variant: 'outline'
  }
}
