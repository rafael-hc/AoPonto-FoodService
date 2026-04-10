import type { Meta, StoryObj } from '@storybook/react'
import { Plus } from 'lucide-react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'outline', 'ghost', 'link'],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'md', 'lg', 'icon'],
      control: { type: 'select' }
    },
    disabled: {
      control: 'boolean'
    },
    asChild: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Button Primary',
    variant: 'primary',
    size: 'md'
  }
}

export const Secondary: Story = {
  args: {
    children: 'Button Secondary',
    variant: 'secondary',
    size: 'md'
  }
}

export const Outline: Story = {
  args: {
    children: 'Button Outline',
    variant: 'outline',
    size: 'md'
  }
}

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost'
  }
}

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link'
  }
}

export const Icon: Story = {
  args: {
    variant: 'outline',
    size: 'icon',
    children: <Plus size={18} />
  }
}

export const Small: Story = {
  args: {
    children: 'Small Button',
    variant: 'primary',
    size: 'sm'
  }
}

export const Large: Story = {
  args: {
    children: 'Large Button',
    variant: 'primary',
    size: 'lg'
  }
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'primary',
    disabled: true
  }
}
