import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Components/Input',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Digite algo...'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Apenas leitura...',
    value: 'Inalterável'
  }
}

export const WithPasswordType: Story = {
  args: {
    type: 'password',
    defaultValue: 'senhasecreta'
  }
}
