import type { Meta, StoryObj } from '@storybook/react'

import CollaboratorsPage from './CollaboratorsPage'

const meta: Meta<typeof CollaboratorsPage> = {
  component: CollaboratorsPage,
}

export default meta

type Story = StoryObj<typeof CollaboratorsPage>

export const Primary: Story = {}
