import type { Sector } from '@prisma/client'

import {
  sectors,
  sector,
  createSector,
  updateSector,
  deleteSector,
} from './sectors'
import type { StandardScenario } from './sectors.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('sectors', () => {
  scenario('returns all sectors', async (scenario: StandardScenario) => {
    const result = await sectors()

    expect(result.length).toEqual(Object.keys(scenario.sector).length)
  })

  scenario('returns a single sector', async (scenario: StandardScenario) => {
    const result = await sector({ id: scenario.sector.one.id })

    expect(result).toEqual(scenario.sector.one)
  })

  scenario('creates a sector', async (scenario: StandardScenario) => {
    const result = await createSector({
      input: {
        name: 'String',
        initials: 'String',
        type: 'SECTOR',
        phone: 'String',
        extension: 'String',
        instanceId: scenario.sector.two.instanceId,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.initials).toEqual('String')
    expect(result.type).toEqual('SECTOR')
    expect(result.phone).toEqual('String')
    expect(result.extension).toEqual('String')
    expect(result.instanceId).toEqual(scenario.sector.two.instanceId)
  })

  scenario('updates a sector', async (scenario: StandardScenario) => {
    const original = (await sector({ id: scenario.sector.one.id })) as Sector
    const result = await updateSector({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a sector', async (scenario: StandardScenario) => {
    const original = (await deleteSector({
      id: scenario.sector.one.id,
    })) as Sector
    const result = await sector({ id: original.id })

    expect(result).toEqual(null)
  })
})
