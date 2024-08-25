import type { Prisma, Sector } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.SectorCreateArgs>({
  sector: {
    one: {
      data: {
        name: 'String',
        initials: 'String',
        type: 'SECTOR',
        phone: 'String',
        extension: 'String',
        instance: { create: { name: 'String', domain: 'String3586226' } },
      },
    },
    two: {
      data: {
        name: 'String',
        initials: 'String',
        type: 'SECTOR',
        phone: 'String',
        extension: 'String',
        instance: { create: { name: 'String', domain: 'String9388630' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Sector, 'sector'>
