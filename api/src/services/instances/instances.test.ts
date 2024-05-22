import type { Instance } from '@prisma/client'

import {
  instances,
  instance,
  createInstance,
  updateInstance,
  deleteInstance,
} from './instances'
import type { StandardScenario } from './instances.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('instances', () => {
  scenario('returns all instances', async (scenario: StandardScenario) => {
    const result = await instances()

    expect(result.length).toEqual(Object.keys(scenario.instance).length)
  })

  scenario('returns a single instance', async (scenario: StandardScenario) => {
    const result = await instance({ id: scenario.instance.one.id })

    expect(result).toEqual(scenario.instance.one)
  })

  scenario('creates a instance', async () => {
    const result = await createInstance({
      input: { name: 'String', domain: 'String' },
    })

    expect(result.name).toEqual('String')
    expect(result.domain).toEqual('String')
  })

  scenario('updates a instance', async (scenario: StandardScenario) => {
    const original = (await instance({
      id: scenario.instance.one.id,
    })) as Instance
    const result = await updateInstance({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a instance', async (scenario: StandardScenario) => {
    const original = (await deleteInstance({
      id: scenario.instance.one.id,
    })) as Instance
    const result = await instance({ id: original.id })

    expect(result).toEqual(null)
  })
})
