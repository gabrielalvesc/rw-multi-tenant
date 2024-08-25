import type { Meta, StoryObj } from '@storybook/react'

import InstancesPage from './InstancesPage'

const meta: Meta<typeof InstancesPage> = {
  component: InstancesPage,
}

export default meta

type Story = StoryObj<typeof InstancesPage>

export const Primary: Story = {}
