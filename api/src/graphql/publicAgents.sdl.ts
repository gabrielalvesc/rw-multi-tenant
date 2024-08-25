export const schema = gql`
  type PublicAgent {
    id: Int!
    displayName: String!
    institutionalEmail: String!
    instance: Instance!
    instanceId: Int!
    user: User!
    userId: Int!
  }

  type Query {
    publicAgents: [PublicAgent!]! @requireAuth
    publicAgent(id: Int!): PublicAgent @requireAuth
  }

  input CreatePublicAgentInput {
    displayName: String!
    institutionalEmail: String!
    instanceId: Int!
    userId: Int!
  }

  input UpdatePublicAgentInput {
    displayName: String
    institutionalEmail: String
    instanceId: Int
    userId: Int
    lastSectorAccessed: Int
  }

  type Mutation {
    createPublicAgent(input: CreatePublicAgentInput!): PublicAgent! @requireAuth
    updatePublicAgent(id: Int!, input: UpdatePublicAgentInput!): PublicAgent!
      @requireAuth
    deletePublicAgent(id: Int!): PublicAgent! @requireAuth
  }
`
