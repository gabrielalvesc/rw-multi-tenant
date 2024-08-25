import type { Meta, StoryObj } from '@storybook/react'

import OrganizationPage from './OrganizationPage'

const meta: Meta<typeof OrganizationPage> = {
  component: OrganizationPage,
}

export default meta

type Story = StoryObj<typeof OrganizationPage>

export const Primary: Story = {}
