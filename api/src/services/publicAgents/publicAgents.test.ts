import type { PublicAgent } from '@prisma/client'

import {
  publicAgents,
  publicAgent,
  createPublicAgent,
  updatePublicAgent,
  deletePublicAgent,
} from './publicAgents'
import type { StandardScenario } from './publicAgents.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('publicAgents', () => {
  scenario('returns all publicAgents', async (scenario: StandardScenario) => {
    const result = await publicAgents()

    expect(result.length).toEqual(Object.keys(scenario.publicAgent).length)
  })

  scenario(
    'returns a single publicAgent',
    async (scenario: StandardScenario) => {
      const result = await publicAgent({ id: scenario.publicAgent.one.id })

      expect(result).toEqual(scenario.publicAgent.one)
    }
  )

  scenario('creates a publicAgent', async (scenario: StandardScenario) => {
    const result = await createPublicAgent({
      input: {
        displayName: 'String',
        institutionalEmail: 'String',
        instanceId: scenario.publicAgent.two.instanceId,
        userId: scenario.publicAgent.two.userId,
      },
    })

    expect(result.displayName).toEqual('String')
    expect(result.institutionalEmail).toEqual('String')
    expect(result.instanceId).toEqual(scenario.publicAgent.two.instanceId)
    expect(result.userId).toEqual(scenario.publicAgent.two.userId)
  })

  scenario('updates a publicAgent', async (scenario: StandardScenario) => {
    const original = (await publicAgent({
      id: scenario.publicAgent.one.id,
    })) as PublicAgent
    const result = await updatePublicAgent({
      id: original.id,
      input: { displayName: 'String2' },
    })

    expect(result.displayName).toEqual('String2')
  })

  scenario('deletes a publicAgent', async (scenario: StandardScenario) => {
    const original = (await deletePublicAgent({
      id: scenario.publicAgent.one.id,
    })) as PublicAgent
    const result = await publicAgent({ id: original.id })

    expect(result).toEqual(null)
  })
})
