export const schema = gql`
  type Sector {
    id: Int!
    name: String!
    initials: String!
    description: String
    type: SectorType!
    phone: String!
    extension: String!
    isActive: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    inativatedAt: DateTime
    parentId: Int
    parent: Sector
    children: [Sector]
    instanceId: Int!
    instance: Instance!
  }

  enum SectorType {
    SECTOR
    CABINET
    WORK_GROUP
  }

  type SectorsRootList {
    id: Int!
    name: String!
    initials: String!
    parentId: Int
    hasChildren: Boolean!
    countUsers: Int!
  }

  type Query {
    sectors: [Sector!]! @requireAuth
    getRootSectors: [SectorsRootList!]! @requireAuth
    getChildrenSectorsByParent(parentId: Int!): [SectorsRootList!]! @requireAuth
    sector(id: Int!): Sector @requireAuth
  }

  input CreateSectorInput {
    name: String!
    initials: String!
    description: String
    type: SectorType!
    phone: String!
    extension: String!
    inativatedAt: DateTime
    parentId: Int
  }

  input UpdateSectorInput {
    name: String
    initials: String
    description: String
    type: SectorType
    phone: String
    extension: String
    isActive: Boolean
    inativatedAt: DateTime
    parentId: Int
    instanceId: Int
  }

  type Mutation {
    createSector(input: CreateSectorInput!): Sector! @requireAuth
    updateSector(id: Int!, input: UpdateSectorInput!): Sector! @requireAuth
    deleteSector(id: Int!): Sector! @requireAuth
  }
`
