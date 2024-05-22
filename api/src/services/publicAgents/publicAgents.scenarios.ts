import type { Prisma, PublicAgent } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PublicAgentCreateArgs>({
  publicAgent: {
    one: {
      data: {
        displayName: 'String',
        institutionalEmail: 'String',
        instance: { create: { name: 'String', domain: 'String' } },
        user: {
          create: {
            email: 'String492276',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        displayName: 'String',
        institutionalEmail: 'String',
        instance: { create: { name: 'String', domain: 'String' } },
        user: {
          create: {
            email: 'String163624',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<PublicAgent, 'publicAgent'>
