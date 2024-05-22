import type { Prisma, Instance } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.InstanceCreateArgs>({
  instance: {
    one: { data: { name: 'String', domain: 'String' } },
    two: { data: { name: 'String', domain: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Instance, 'instance'>
