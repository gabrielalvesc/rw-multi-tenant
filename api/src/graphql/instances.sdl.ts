export const schema = gql`
  type Instance {
    id: Int!
    uuid: String!
    name: String!
    domain: String!
    logo: String!
    colorScheme: String!
    publicAgents: [PublicAgent]!
    coatOfArms: String
  }

  type Query {
    instances: [Instance!]! @requireAuth
    instance(id: Int!): Instance @requireAuth
    getInstanceByDomain(domain: String): Instance @skipAuth
  }

  input CreateInstanceInput {
    uuid: String!
    name: String!
    domain: String!
  }

  input UpdateInstanceInput {
    uuid: String
    name: String
    domain: String
  }

  type Mutation {
    createInstance(input: CreateInstanceInput!): Instance! @requireAuth
    updateInstance(id: Int!, input: UpdateInstanceInput!): Instance!
      @requireAuth
    deleteInstance(id: Int!): Instance! @requireAuth
  }
`
