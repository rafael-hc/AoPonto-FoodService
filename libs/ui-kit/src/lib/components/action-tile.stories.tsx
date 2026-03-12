import type { Meta, StoryObj } from '@storybook/react'
import { ActionTile } from './action-tile'
import { ShoppingCart, Settings, Users } from 'lucide-react'

const meta: Meta<typeof ActionTile.Root> = {
  component: ActionTile.Root,
  title: 'Components/ActionTile',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    active: {
      control: 'boolean',
      description:
        'Ativa ou desativa o estado visual (background, font weight, cores) usando Context API.'
    },
    onClick: { action: 'clicked' }
  }
}

export default meta
type Story = StoryObj<typeof ActionTile.Root>

export const Default: Story = {
  args: {
    active: false
  },
  render: (args) => (
    <ActionTile.Root {...args}>
      <ActionTile.Icon>
        <ShoppingCart size={22} strokeWidth={args.active ? 2.5 : 2} />
      </ActionTile.Icon>
      <ActionTile.LabelGroup>
        <ActionTile.Label>Pedidos</ActionTile.Label>
      </ActionTile.LabelGroup>
    </ActionTile.Root>
  )
}

export const ActiveState: Story = {
  args: {
    active: true
  },
  render: (args) => (
    <ActionTile.Root {...args}>
      <ActionTile.Icon>
        <Settings size={22} strokeWidth={args.active ? 2.5 : 2} />
      </ActionTile.Icon>
      <ActionTile.LabelGroup>
        <ActionTile.Label>Configurações</ActionTile.Label>
      </ActionTile.LabelGroup>
    </ActionTile.Root>
  )
}

export const WithShortcut: Story = {
  args: {
    active: false
  },
  render: (args) => (
    <ActionTile.Root {...args}>
      <ActionTile.Icon>
        <Users size={22} strokeWidth={args.active ? 2.5 : 2} />
      </ActionTile.Icon>
      <ActionTile.LabelGroup>
        <ActionTile.Label>Equipe</ActionTile.Label>
        <ActionTile.Shortcut>F3</ActionTile.Shortcut>
      </ActionTile.LabelGroup>
    </ActionTile.Root>
  )
}
